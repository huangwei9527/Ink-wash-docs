'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  // 新增用户
  async newUser() {
    const { ctx } = this;
    const result = await ctx.model.User.create({
      userName: 'huruqing',
    });
    return result;
  }
}
module.exports = UserService;
