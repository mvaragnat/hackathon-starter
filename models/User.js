/* eslint-disable brace-style */
/* eslint-disable camelcase */
const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
var strftime = require('strftime')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  // facebook: String,
  // twitter: String,
  // google: String,
  // github: String,
  // instagram: String,
  // linkedin: String,
  // steam: String,
  // tokens: Array,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  },

  // for slack
  slack_team_name: String,
  slack_team_id: String,
  slack_champion: {
    name: String,
    email: String,
    user_id: String,
    access_token_c: String
  },
  slack_bot: {
    user_id: String,
    bot_token_c: String
  },

  // subscription data
  status: {type: String, default: 'trial'}, // possible status : trial, paying, not_paying
  stripe_id: String,
  stripe_subscription_id: String,
  coupon: String,
  deadline: Date
}, { timestamps: true })

/* changes the status to trial, sets the deadline in 2 weeks
  */
userSchema.methods.start_trial = function () {
  var user = this
  user.status = 'trial'
  user.deadline = new Date()

  user.deadline.setDate(user.deadline.getDate() + 15)

  user.save(function (err) {
    if (err) {
      console.log(err)
    }
    else {
      console.log((user.profile.name || user.email) + ': starts trial, deadline ' + strftime('%B %d', user.deadline))
    }
  })
}

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save (next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

/**
 * Helper method for getting user's gravatar.
 */
// userSchema.methods.gravatar = function gravatar (size) {
//   if (!size) {
//     size = 200
//   }
//   if (!this.email) {
//     return `https://gravatar.com/avatar/?s=${size}&d=retro`
//   }
//   const md5 = crypto.createHash('md5').update(this.email).digest('hex')
//   return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
// }

const User = mongoose.model('User', userSchema)

module.exports = User
/* eslint-disable brace-style */
/* eslint-disable camelcase */
