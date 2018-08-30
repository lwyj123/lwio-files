
// const path = require('path')
const BaseController = require('./prototype/BaseController')

class UploadController extends BaseController {
  async upload (ctx) {
    ctx.redisClient.set('upload', 'keke')
    ctx.body = {
      'test': 'upload'
    }
  }

  async start (ctx) {
    ctx.redisClient.set('start', 'keke')
    ctx.body = {
      'test': 'start'
    }
  }

  async commit (ctx) {
    ctx.redisClient.set('commit', 'keke')
    ctx.body = {
      'test': 'commit'
    }
  }

  async complete (ctx) {
    ctx.redisClient.set('complete', 'keke')
    ctx.body = {
      'test': 'complete'
    }
  }
}

module.exports = new UploadController()
