const KoaRouter = require('koa-router')

const uploadController = require('../controllers/upload')

const router = new KoaRouter({ prefix: '/upload' })

router
  .post('/multipart/upload', uploadController.upload)
  .post('/multipart/start', uploadController.start)
  .post('/multipart/commit', uploadController.commit)
  .post('/multipart/complete', uploadController.complete)

module.exports = router
