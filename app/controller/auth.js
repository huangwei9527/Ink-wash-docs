'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	/**
	 * 登录
	 * @returns {Promise<void>}
	 */
	async login() {
		const { ctx } = this;
		ctx.body = 'login';
	}

	/**
	 * 注册
	 * @returns {Promise<void>}
	 */
	async register() {
		const { ctx } = this;
		ctx.body = 'register';
	}


}

module.exports = HomeController;
