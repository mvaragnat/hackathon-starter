/* eslint-disable brace-style */
/* eslint-disable camelcase */
'use strict'
// const User = require('../models/User')
const Request = require('request')
const crypto = require('../config/crypto')
const escape = require('sanitizer').escape

// new user creation - redirection from Slack
exports.getRegister = (req, res, next) => {
  console.log('================== START TEAM REGISTRATION ==================')
  // temporary authorization code
  let auth_code = req.query.code
  let user = req.user

  if (!auth_code) {
    // user refused auth
    res.redirect('/dashboard')
  }
  else if (!user) {
    // should not happen
    console.log('no user at slack redirect')
    res.sendStatus(403)
  }
  else if (req.query.state !== crypto.generateHashOfDay()) {
    console.log('state is NOT OK')
    req.flash('errors', { msg: 'The page has expired, please retry.' })
  }
  else {
    console.log('New user auth code ' + auth_code)
    perform_auth(auth_code, user, req, res)
  }
}

exports.postEvent = (req, res, next) => {
  // subscription to the Events API
  if (req.body.challenge) {
    res.send(req.body.challenge)
  }
  else {
    console.log('received slack event', req.body)
    res.send(200)
  }
}

// ================= AUTH SEQUENCE ===========================
const perform_auth = (auth_code, user, req, res) => {
  // post code, app ID, and app secret, to get token
  let auth_adresse = 'https://slack.com/api/oauth.access?'
  auth_adresse += 'client_id=' + process.env.SLACK_ID
  auth_adresse += '&client_secret=' + process.env.SLACK_SECRET
  auth_adresse += '&code=' + auth_code
  auth_adresse += '&redirect_uri=' + process.env.SLACK_REDIRECT

  Request.get(auth_adresse, (error, response, body) => {
    if (error) {
      console.log(error)
      res.sendStatus(500)
    }

    else {
      let auth = JSON.parse(body)
      console.log('New user auth')
      // console.log({auth})

      user.slack_champion = {
        access_token_c: crypto.encrypt(auth.access_token)
      }
      user.slack_bot = {
        bot_token_c: crypto.encrypt(auth.bot.bot_access_token),
        user_id: auth.bot.bot_user_id
      }

      register_team(auth, user, req, res)
    }
  })
}

const register_team = (auth, user, req, res) => {
  // first, get authenticating user ID
  let url = 'https://slack.com/api/auth.test?'
  url += 'token=' + auth.access_token

  Request.get(url, function (error, response, body) {
    if (error) {
      console.log(error)
      res.sendStatus(500)
    }
    else {
      try {
        let identity = JSON.parse(body)
        // console.log({identity})

        user.slack_team_id = identity.team_id
        user.slack_team_name = escape(identity.team)
        user.slack_champion.user_id = identity.user_id,
        user.slack_champion.name = identity.user

        get_user_email(user, auth.bot.bot_access_token)

        req.flash('info', { msg: 'Your Slack account has been connected' })
        res.redirect('/account')
      }
      catch (e) {
        console.log(e)
      }
    }
  })
}

const get_user_email = (user, bot_token) => {
  let url = 'https://slack.com/api/users.info?'
  url += 'token=' + bot_token
  url += '&user=' + user.slack_champion.user_id

  console.log(user.slack_team_name + ': Getting user email')

  Request.get(url, function (error, response, body) {
    if (error) {
      console.log(error)
    }
    else {
      try {
        let details = JSON.parse(body)
        // console.log({details})

        if (details.user && details.user.profile) {
          // sanitize, if we have to display it one day
          user.slack_champion.email = escape(details.user.profile.email)
        }

        user.save((err) => {
          if (err) {
            console.log(err)
          }
          else {
            console.log(user.slack_team_name + ': saved', user)
          }
        })
      }

      catch (e) {
        console.log(e)
      }
    }
  })
}

/* eslint-disable brace-style */
/* eslint-disable camelcase */
