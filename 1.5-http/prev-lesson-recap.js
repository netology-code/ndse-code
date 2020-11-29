const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

myEmitter.on('message', () => {
  console.log('on Message')
})

myEmitter.on('message', message => {
  console.log(`Message: ${message}`)
})

myEmitter.on('error', error => console.log(`Error: ${error}`))

myEmitter.emit('message', 'Node.js EventEmitter in action')

