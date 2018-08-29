const compose = require('koa-compose')
const testRoutes = require('./test')
const uploadRoutes = require('../upload')

const router = compose([
  testRoutes.routes(),
  testRoutes.allowedMethods(),
  uploadRoutes.routes(),
  uploadRoutes.allowedMethods()
])

module.exports = router
