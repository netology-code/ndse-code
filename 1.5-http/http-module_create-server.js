const http = require('http')

/**
 * @see https://nodejs.org/docs/latest-v14.x/api/http.html#http_http_createserver_options_requestlistener
 */
http.createServer((request, response) => {
  console.log('Url: ' + request.url)
  console.log('Тип запроса: ' + request.method)
  console.log('User-Agent: ' + request.headers['user-agent'])
  console.log('Все заголовки')
  console.log(request.headers)

  response.end()

}).listen(3000)
