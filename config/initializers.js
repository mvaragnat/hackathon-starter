var User = require('../models/User')
var _ = require('lodash')

module.exports = function() {
  User.find({}, function(err, users){
    if (err) {
      console.log(err)
    }
    else {
      _.forEach(users, function(user){
        if((user.status === 'trial' && !user.deadline) || !user.status) {
          user.start_trial()
        }
      })
    }
  })
}
