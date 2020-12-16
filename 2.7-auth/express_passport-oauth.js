// @see http://www.passportjs.org/packages/passport-vkontakte/

const express = require('express')
const passport = require('passport')
const VKontakteStrategy = require('passport-vkontakte').Strategy

const app = express()

app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('express-session')({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

let userProfile = {}

passport.use('vkontakte', new VKontakteStrategy(
  // @see https://vk.com/apps?act=manage
  {
    clientID: process.env.VKONTAKTE_APP_ID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
    clientSecret: process.env.VKONTAKTE_APP_SECRET,
    callbackURL: `http://localhost:${process.env.NODE_PORT}/auth/vkontakte/callback`,
  },
  function myVerifyCallbackFn (accessToken, refreshToken, params, profile, done) {

    // console.log("accessToken: ", accessToken); // eslint-disable-line
    // console.log("refreshToken: ", refreshToken); // eslint-disable-line
    // console.log("profile: ", profile); // eslint-disable-line

    userProfile = profile
    return done(null, userProfile)
  },
))

// User session support for our hypothetical `user` objects.
passport.serializeUser(function (user, done) {
  done(null, userProfile.id)
})

passport.deserializeUser(function (id, done) {
  done(null, userProfile)
})

app.get('/',
  function (req, res) {
    res.send('<a href="/auth/vkontakte">Войти с помощью Вконтакте</a>')
  })

app.get('/auth/vkontakte', passport.authenticate('vkontakte'))

app.get('/auth/vkontakte/callback',
  passport.authenticate('vkontakte', {
    failureRedirect: '/',
  }),
  function (req, res) {
    console.log("req.user: ", req.user)
    res.redirect('/profile')
  }
)

app.get('/profile', function (req, res) {
  //Here you have an access to req.user
  res.json(req.user)
})

// start app
app.listen(process.env.NODE_PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.NODE_PORT}`)
})
