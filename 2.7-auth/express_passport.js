// @see https://github.com/passport/express-4.x-local-example

const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db')

// Конфигурация локальной стратегии

/**
 * @param {String} username
 * @param {String} password
 * @param {Function} done
 */
function verify(username, password, done) {
  db.users.findByUsername(username, function (err, user) {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }

    if (!user.verifyPassword(password)) { return done(null, false) }

    // `user` будет сохранен в `req.user`
    return done(null, user)
  })
}

const options = {
  usernameField: '_username_',
  passwordField: '_password_',
  passReqToCallback: false,
}

passport.use('local', new LocalStrategy(verify))

// Конфигурирование Passport для работы с сессией
//
// Самый простой способ — сохранение user ID
passport.serializeUser(function (user, cb) {
  cb(null, user.id)
})

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err) }
    cb(null, user)
  })
})


const app = express()
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('express-session')({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
}))


app.use(passport.initialize())
app.use(passport.session())


app.get('/',
  function (req, res) {
    res.render('home', { user: req.user })
  })

app.get('/login',
  function (req, res) {
    res.render('login')
  })

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  })

app.get('/logout',
  function (req, res) {
    req.logout()
    res.redirect('/')
  })

app.get('/profile',
  function (req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (req.session) {
        req.session.returnTo = req.originalUrl || req.url
      }
      return res.redirect('/login')
    }
    next()
  },
  function (req, res) {
    res.render('profile', { user: req.user })
  })

// start app
app.listen(process.env.NODE_PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.NODE_PORT}`)
})
