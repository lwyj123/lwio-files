
// const path = require('path')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const BaseController = require('./prototype/BaseController')

// TODO: config化
const secret = 'fileportal'

const verifyToken = (token) => {
  if (!token) {
    return 'token not found'
  }
  return 'token error'
}
const generateToken = (appKey) => {
  crypto.createHmac()
  return 'tokentest'
}

const accessPromise = async (targetDir) => {
  return new Promise((resolve, reject) => {
    fs.access(targetDir, function (err) {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}

class UploadController extends BaseController {
  /**
   * 开放给业务方服务器端的接口
   *
   * @param {*} ctx
   * @memberof UploadController
   */
  async getToken (ctx) {
    const {
      appKey
    } = ctx.query
    ctx.body = {
      token: generateToken(appKey)
    }
  }
  // 用于上传分块，
  async upload (ctx) {
    var form = new formidable.IncomingForm()
    form.uploadDir = '/tmp' // 文件保存在系统临时目录
    form.maxFieldsSize = 20 * 1024 * 1024 // 上传文件大小限制为最大20M
    form.keepExtensions = true // 使用文件的原扩展名
    form.encoding = 'utf-8'

    var targetDir = path.join(__dirname, '../../storeroom')

    // 检查目标目录，不存在则创建
    try {
      await accessPromise(targetDir)
    } catch (e) {
      fs.mkdirSync(targetDir)
    }

    try {
      const parsed = await _fileParse(ctx.req)
    } catch (e) {
      console.log(e)
    }

    ctx.status = 204
    ctx.body = {}
    // 文件解析与保存
    function _fileParse (req) {
      return new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
          if (err) throw err
          var filesUrl = []
          var keys = Object.keys(files)
          keys.forEach(function (key) {
            var filePath = files[key].path
            var fileExt = filePath.substring(filePath.lastIndexOf('.'))
            // 以当前时间戳对上传文件进行重命名
            var fileName = new Date().getTime() + fileExt
            var targetFile = path.join(targetDir, fileName)
            // 移动文件
            fs.renameSync(filePath, targetFile)
            // 文件的Url（相对路径）
            filesUrl.push('/root/storeroom/' + fileName)
          })
          resolve({
            files,
            filesUrl
          })
        })
      })
    }
  }

  // start用于开始任务，返回一个taskId
  // 如果考虑到MD5的collision probability，可以考虑加入fileSize生成taskID
  async start (ctx) {
    const token = ctx.request.headers['x-fileportal-token']
    // TODO: token检验
    if (!verifyToken(token)) {
      throw new Error('token error')
    }
    const {
      fileMD5,
      fileSize
    } = ctx.request.body

    // TODO: 校验参数
    const taskId = `${fileMD5}-${fileSize}`
    ctx.redisClient.set(`tasks:${taskId}`, '')
    ctx.body = {
      taskId: taskId
    }
  }

  // commit用来确认一个分块上传完成
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

  /**
   * 获取某个taskId的缺失分块，用于断线重传
   *
   * @param {*} ctx
   * @memberof UploadController
   */
  async getMissBlock (ctx) {

  }
}

module.exports = new UploadController()
