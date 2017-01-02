
const homeController = require('../controllers/home')
const apiController = require('../controllers/api')
const contactController = require('../controllers/contact')
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: path.join(__dirname, 'uploads') })

module.exports = function (app) {
  app.get('/', homeController.index)
  app.get('/contact', contactController.getContact)
  app.post('/contact', contactController.postContact)

  /**
   * API examples routes.
   */
  app.get('/api/upload', apiController.getFileUpload)
  app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload)
}
