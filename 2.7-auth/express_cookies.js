const express = require('express')
const cookieParser = require('cookie-parser')

// setup express
const app = express()

app.use(cookieParser())

// add route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
 * set cookie
 * @see https://expressjs.com/en/4x/api.html#res.cookie
 */
app.get('/set-cookie', (req, res) => {

  /**
   * res.cookie(name, value [, options])
   *
   * `domain`    {String}    Domain name for the cookie. Defaults to the domain name of the app.
   * `encode`    {Function}  A synchronous function used for cookie value encoding. Defaults to encodeURIComponent.
   * `expires`   {Date}      Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
   * `httpOnly`  {Boolean}  Flags the cookie to be accessible only by the web server.
   * `maxAge`    {Number}    Convenient option for setting the expiry time relative to the current time in milliseconds.
   * `path`      {String}    Path for the cookie. Defaults to “/”.
   * `secure`    {Boolean}  Marks the cookie to be used with HTTPS only.
   * `signed`    {Boolean}  Indicates if the cookie should be signed.
   * `sameSite`  {Boolean|String} Value of the “SameSite” Set-Cookie attribute.
   *
   */

  res.cookie('my-session', '123qwe')
  res.send('GET /set-cookie')
})

/**
 * get cookie
 * @see https://expressjs.com/en/4x/api.html#req.cookies
 */
app.get('/get-cookie', (req, res) => {
  console.log('req.cookies: ', req.cookies)
  // => undefined

  console.log('req.headers: ', req.headers)
  // => 
  // {
  //   host: 'localhost:3000',
  //   connection: 'keep-alive',
  //   pragma: 'no-cache',
  //  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
  //   accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  //   cookie: ТУТ СТРОКА вида 'lang=ru; sid=4b313c082e7ad42aa89e018c242bd538;'
  // }


    res.send('GET /get-cookie')
})

// start app
app.listen(process.env.NODE_PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.NODE_PORT}`)
})
