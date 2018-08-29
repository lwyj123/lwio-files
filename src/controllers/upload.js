
// const path = require('path')
const BaseController = require('./prototype/BaseController')

class UploadController extends BaseController {
  async upload (ctx) {
    ctx.body = {
      'test': 'upload'
    }
  }

  async start (ctx) {
    ctx.body = {
      'test': 'start'
    }
  }

  async commit (ctx) {
    ctx.body = {
      'test': 'commit'
    }
  }

  async complete (ctx) {
    ctx.body = {
      'test': 'complete'
    }
  }
}

module.exports = new UploadController()
