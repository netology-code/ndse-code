const express = require('express')

// setup express
const app = express()

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
   * `domain`    {String}	  Domain name for the cookie. Defaults to the domain name of the app.
   * `encode`    {Function}	A synchronous function used for cookie value encoding. Defaults to encodeURIComponent.
   * `expires`   {Date}	    Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
   * `httpOnly`  {Boolean}	Flags the cookie to be accessible only by the web server.
   * `maxAge`    {Number}	  Convenient option for setting the expiry time relative to the current time in milliseconds.
   * `path`      {String}	  Path for the cookie. Defaults to “/”.
   * `secure`    {Boolean}	Marks the cookie to be used with HTTPS only.
   * `signed`    {Boolean}	Indicates if the cookie should be signed.
   * `sameSite`  {Boolean|String} Value of the “SameSite” Set-Cookie attribute.
   * 
   */

  res.cookie('my-session', '123qwe')
  res.send('Hello World!')
})

/**
 * get cookie
 * @see https://expressjs.com/en/4x/api.html#req.cookies
 */
app.get('/get-cookie', (req, res) => {
  console.log('req.cookies: ', req.cookies) // eslint-disable-line
  console.log("req.headers: ", req.headers); // eslint-disable-line

  res.send('Hello World!')
})

// start app
app.listen(process.env.NODE_PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.NODE_PORT}`)
})
