/**
 * @see https://nodejs.org/docs/latest-v14.x/api/events.html#events_class_eventemitter
 * @type {EventEmitter}
 */
const EventEmitter = require('events')

/**
 * @see https://nodejs.org/docs/latest-v14.x/api/stream.html
 *
 * MyStream < EventEmitter
 */
class MyStream extends EventEmitter {
  constructor (opts) {
    super(opts)

    this.on('data', data => {
      console.log(`log data: ${JSON.stringify(data)}`)
    })

    this.on('end', () => {
      console.log('end, bye!')
    })
  }
}

const myStream = new MyStream()

myStream.emit('data', { fileName: 'prev-lesson-recap.js' })

// => что будет в консоли?
