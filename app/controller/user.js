'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async newUser() {
    this.ctx.body = this.ctx.service.user.newUser();
  }
}

module.exports = UserController;