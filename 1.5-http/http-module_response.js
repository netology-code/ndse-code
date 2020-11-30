const http = require('http')

http.createServer(requestListenerWithRedirects).listen(process.env.PORT)

/**
 *
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
function requestListenerWithRouter (request, response) {
  const { url } = request

  response.setHeader('Content-Type', 'text/html; charset=utf-8;')

  if (url === '/home' || url === '/') {
    response.write('<h2>Home</h2>')
  } else if (url === '/about') {
    response.write('<h2>About</h2>')
  } else if (url === '/contact') {
    response.write('<h2>Contacts</h2>')
  } else {
    response.statusCode = 404
    response.write('<h2>Not found</h2>')
  }
  response.end()

}

/**
 *
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
function requestListenerWithRedirects (request, response) {
  response.setHeader('Content-Type', 'text/html; charset=utf-8;')

  if (request.url === '/') {
    response.statusCode = 302
    response.setHeader('Location', '/newpage')
  }
  response.end()

}

/**
 * @param {String} name
 * @param {Number|String, Array<String>} value
 */
function setHeader (name, value) {

}

function write (chunk, encoding = 'utf8', callback = () => {}) {

}
