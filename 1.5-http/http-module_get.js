/**
 * @see https://nodejs.org/docs/latest-v14.x/api/http.html#http_http_get_options_callback
 * @type {module:http}
 */
const http = require('http')

const url = `http://data.fixer.io/api/latest?access_key=1bb9f884de2c22443e0a1c86a0498099&symbols=USD,EUR,RUB`

const req = http.get(url, (res) => {
  const statusCode = res.statusCode

  if (statusCode !== 200) {
    console.error(`Status Code: ${statusCode}`)
    return
  }

  res.setEncoding('utf8')

  let rawData = ''
  res.on('data', (chunk) => rawData += chunk)
  res.on('end', () => {
    let parsedData = JSON.parse(rawData)
    console.log(parsedData)
  })
})

req.on('error', (e) => {
  console.error(`Got error: ${e.message}`)
})

