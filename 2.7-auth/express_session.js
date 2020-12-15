const express = require('express')
const session = require('express-session')

const app = express()

app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null,
  },
  name: '2.7-auth-connect.sid',

  secret: process.env.COOKIE_SECRET,

  // @see https://github.com/expressjs/session#resave
  resave: false,

  // @see https://github.com/expressjs/session#saveuninitialized
  saveUninitialized: false
}))

app.get('/', function (req, res, next) {
  console.log("req.sessionID: ", req.sessionID); // eslint-disable-line
  console.log("req.session.id: ", req.session.id); // eslint-disable-line
  console.log("req.session.cookie: ", req.session.cookie); // eslint-disable-line
  
  
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

// 2.7-auth-connect.sid=s%3AyBZ6miPnlsRIApCiTH0rptDo-iFeCxuh.Tfi0kuarGxAv9JnsglYxpB9me%2F1hykoD3vUeBB3K6j8
// req.sessionID:  yBZ6miPnlsRIApCiTH0rptDo-iFeCxuh
// req.session.id:  yBZ6miPnlsRIApCiTH0rptDo-iFeCxuh

// start app
app.listen(process.env.NODE_PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.NODE_PORT}`)
})
