const slackController = require('../controllers/slack')

module.exports = function (app) {
  app.get('/slack/register', slackController.getRegister)
  app.post('/slack/event', slackController.postEvent)
}
