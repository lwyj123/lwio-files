const KoaRouter = require('koa-router')

const uploadController = require('../controllers/upload')

const router = new KoaRouter({ prefix: '/multipart' })

router
  .post('/upload', uploadController.upload)
  .post('/start', uploadController.start)
  .post('/commit', uploadController.commit)
  .post('/complete', uploadController.complete)

module.exports = router
