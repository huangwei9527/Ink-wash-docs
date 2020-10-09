'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
	/**
	 * 获取个人信息
	 * @returns {Promise<void>}
	 */
	async getUserInfo() {
		const { ctx } = this;
		ctx.returnBody(true, {})
	}
}

module.exports = UserController;
