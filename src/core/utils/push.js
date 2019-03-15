class Push {
  constructor(messaging) {
    this.messaging = messaging
    this.token = window.localStorage.getItem('token') || null
    this.subscribe = this.subscribe.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
    this.requestPush = this.requestPush.bind(this)
    this.hasToken = this.hasToken.bind(this)
    this.unsubscribeToTopic = this.unsubscribeToTopic.bind(this)

    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then(refreshedToken => {
          this.subscribeToTopic(refreshedToken)
        })
        .catch(() => {
          window.localStorage.setItem('token', 'FAILED')
          this.emit('FAILED')
        })
    })
  }

  subscribe(cb) {
    this.cb = cb
  }

  unsubscribe() {
    this.cb = null
  }

  emit(s) {
    this.cb && this.cb(s)
  }

  subscribeToTopic() {
    this.messaging.getToken().then(token => {
      return fetch(
        `https://us-central1-worldcup18-d9408.cloudfunctions.net/subscribe?token=${token}`
      ).then(() => {
        window.localStorage.setItem('token', 'SUCCESS')
        this.emit('SUCCESS')
      })
    })
  }

  unsubscribeToTopic() {
    this.emit('REMOVING')
    this.messaging.getToken().then(token => {
      if (!token) {
        this.emit('REMOVED')
        window.localStorage.removeItem('token')
        return null
      }
      return fetch(
        `https://us-central1-worldcup18-d9408.cloudfunctions.net/unsubscribe?token=${token}`
      )
        .then(() => {
          this.emit('DELETED')
          return this.messaging.deleteToken(token)
        })
        .then(() => {
          window.localStorage.removeItem('token')
        })
    })
  }

  hasToken() {
    this.emit(window.localStorage.getItem('token'))
  }

  requestPush() {
    this.emit('REQUESTING')
    return this.messaging
      .requestPermission()
      .then(args => {
        return this.subscribeToTopic()
      })
      .catch(err => {
        this.emit('FAILED')
        window.localStorage.setItem('token', 'FAILED')
        console.log('Unable to get permission to notify.', err)
      })
  }
}

export default Push
