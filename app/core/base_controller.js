'use strict';

const { Controller } = require('egg');

/**
 * BaseController
 * @class
 * @author ruiyong-lee
 */
class BaseController extends Controller {
  get user() {
    var token = ctx.headers.authorization ? ctx.headers.authorization : '';
    token.substring(7) //把Bearer 截取掉，解析的时候不需要加上Bearer
     // 解析token
     let user = null
     try {
      user = this.app.jwt.verify(token, this.app.config.jwt.secret);
    } catch (err) {
      user = null
    }
    return user;
  }
}

module.exports = BaseController;