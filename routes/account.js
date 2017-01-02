
const userController = require('../controllers/user')

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('../config/passport')

module.exports = function (app) {
  app.get('/login', userController.getLogin)
  app.post('/login', userController.postLogin)
  app.get('/logout', userController.logout)
  app.get('/forgot', userController.getForgot)
  app.post('/forgot', userController.postForgot)
  app.get('/reset/:token', userController.getReset)
  app.post('/reset/:token', userController.postReset)
  app.get('/signup', userController.getSignup)
  app.post('/signup', userController.postSignup)
  app.get('/account', passportConfig.isAuthenticated, userController.getAccount)
  app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile)
  app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword)
  app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount)
  // app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);
  app.post('/account/subscribe', userController.postAccountSubscribe)
}
