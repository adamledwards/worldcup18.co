class Push {
  constructor(messaging) {
    this.messaging = messaging
    this.token = window.localStorage.getItem('token') || null

    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then(refreshedToken => {
          console.log('Token refreshed.')
          this.subscribeToTopic(refreshedToken)
        })
        .catch(err => {})
    })
  }

  subscribeToTopic() {
    this.messaging.getToken().then(token => {
      return fetch(
        `https://us-central1-worldcup18-d9408.cloudfunctions.net/subscribe?token=${token}`
      ).then(() => {
        window.localStorage.setItem('token', 'true')
      })
    })
  }

  unsubscribeToTopic() {
    this.messaging.getToken().then(token => {
      if (!token) {
        return null
      }
      return fetch(
        `https://us-central1-worldcup18-d9408.cloudfunctions.net/unsubscribe?token=${token}`
      )
        .then(() => {
          return this.messaging.deleteToken(token)
        })
        .then(() => {
          window.localStorage.removeItem('token')
        })
    })
  }

  hasToken() {
    return JSON.parse(window.localStorage.getItem('token'))
  }

  requestPush() {
    if (this.hasToken()) {
      return this.unsubscribeToTopic()
    }
    return this.messaging
      .requestPermission()
      .then(args => {
        console.log('Notification permission granted really.')
        return this.subscribeToTopic()
        // ...
      })
      .catch(function(err) {
        console.log('Unable to get permission to notify.', err)
      })
  }
}

export default Push
