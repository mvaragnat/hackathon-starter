'use strict'
const User = require('../models/User')
const Request = require('request')

//new user creation - redirection from Slack
exports.getRegister = (req, res, next) => {
  console.log("================== START TEAM REGISTRATION ==================")
  //temporary authorization code
  let auth_code = req.query.code

  if(!auth_code){
    //user refused auth
    res.redirect('/dashboard')
  }
  else{
    console.log("New user auth code " + auth_code)
    // perform_auth(auth_code, res)
  }
}

exports.postEvent = (req, res, next) => {
  // // subscription to the Events API
  if (req.body.challenge) {
    res.send(req.body.challenge)
  }
}
