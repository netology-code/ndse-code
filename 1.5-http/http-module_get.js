/**
 * @see https://nodejs.org/docs/latest-v14.x/api/http.html#http_http_get_options_callback
 * @type {module:http}
 */
const http = require('http')

const url = `http://data.fixer.io/api/latest?access_key=1bb9f884de2c22443e0a1c86a0498099&symbols=USD,EUR,RUB`

/**
 * @type {http.ClientRequest}
 */
const request = http.get(url, (response) => {
  const statusCode = response.statusCode

  if (statusCode !== 200) {
    console.error(`Status Code: ${statusCode}`)
    return
  }

  response.setEncoding('utf8')

  let rawData = ''
  response.on('data', (chunk) => rawData += chunk)
  response.on('end', () => {
    let parsedData = JSON.parse(rawData)
    console.log(parsedData)
  })
})

request.on('error', (e) => {
  console.error(`Got error: ${e.message}`)
})

