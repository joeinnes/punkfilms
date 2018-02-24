import Feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import authentication from '@feathersjs/authentication-client'
import config from './config'

const socket = io(config.API, {
  transports: ['websocket'],
  forceNew: true
})

const feathers = Feathers()
  .configure(socketio(socket))
  .configure(authentication({ storage: window.localStorage }))

export default feathers