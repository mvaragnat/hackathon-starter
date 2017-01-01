
const homeController = require('./controllers/home')
const apiController = require('./controllers/api')
const contactController = require('./controllers/contact')

module.exports = require(app) {
  app.get('/', homeController.index)
  app.get('/contact', contactController.getContact)
  app.post('/contact', contactController.postContact)

  /**
   * API examples routes.
   */
  app.get('/api/upload', apiController.getFileUpload)
  app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload)

}
