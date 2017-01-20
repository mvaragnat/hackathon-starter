const slackController = require('../controllers/slack')

module.exports = function (app) {
  app.get('/slack/register', passportAuth.isAuthenticated, slackController.getRegister)
  app.post('/slack/event', slackController.postEvent)
}
