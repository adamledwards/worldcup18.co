import * as functions from 'firebase-functions'
import admin from './admin'

const apiKey = functions.config().push.key

const cors = require('cors')({
  origin: true,
})

type Notification = {
  webpush: {
    notification: {
      title: string
      body: string
      icon: string
    }
  }
  topic: string
}

export default functions.https.onRequest(async (req, res) => {
  return cors(req, res, () => {
    return admin
      .messaging()
      .subscribeToTopic([req.query.token], 'all')
      .then(body => res.send(body))
      .catch(err => {
        res.status(500).send(err.toString())
      })
  })
})

export const unsubscribe = functions.https.onRequest(async (req, res) => {
  return cors(req, res, () => {
    return admin
      .messaging()
      .unsubscribeFromTopic([req.query.token], 'all')
      .then(body => res.send(body))
      .catch(err => res.status(500).send(err.toString()))
  })
})

function sendMessage(notification: Notification): Promise<any> {
  return admin
    .messaging()
    .send(notification)
    .then(r => r)
}

export const testPush = functions.https.onRequest(async (req, res) => {
  const message: Notification = {
    webpush: {
      notification: {
        title: 'TEST TITLE',
        body: 'test body',
        icon: 'https://worldcup18.co/favicon-194x194.png',
      },
    },
    topic: 'all',
  }
  return sendMessage(message)
    .then(body => res.send(body))
    .catch(err => res.status(500).send(err.stack.toString()))
})
