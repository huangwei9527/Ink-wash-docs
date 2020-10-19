'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
	/**
	 * 登录
	 * @returns {Promise<void>}
	 */
	async login() {
		const { ctx, service } = this;
		const { username, password } = ctx.request.body
		// 验证是否存在
		let user = await service.user.getUsersByUsername(username);
		if (!user) {
			ctx.returnBody(false, {}, "用户不存在！");
			return;
		}
		// 校验密码
		const userCurrentPass = await service.user.getUsersPasswordByUsername(username);
		const verifyPass = await ctx.helper.checkPassword(password, userCurrentPass.password)
		if (!verifyPass) {
			ctx.returnBody(false, '', "密码错误，请重试！");
			return;
		}

		user = user.toObject();
		let userDataStr = JSON.parse(JSON.stringify(user));
		// 生成token
		let token =await ctx.getToken(userDataStr);
		ctx.returnBody(true, {access_token: token, userInfo: user}, "登录成功!")
	}

	/**
	 * 注册
	 * @returns {Promise<void>}
	 */
	async register() {
		const { ctx, service } = this;
		const { username, password, email } = ctx.request.body

		// 密码长度拦截
		if (!password) {
			ctx.returnBody(false, {}, "密码不能为空!")
			return;
		}else if(password.length < 6){
			ctx.returnBody(false, {}, "密码长度不能少于6位!")
			return;
		}else if(password.length > 16){
			ctx.returnBody(false, {}, "密码长度不能超过16位!")
			return;
		}

		// 验证是否已注册
		const users = await service.user.getUsersByQuery({ $or: [
				{ username },
				{ email },
			] });

		if (users.length > 0) {
			ctx.returnBody(false, {}, "用户名或邮箱已被注册!")
			return;
		}

		let pass = await ctx.helper.createPassword(password.toString())
		let userData = await ctx.service.user.createUser(username, pass, email);
		userData = userData.toObject();
		let userDataStr = JSON.parse(JSON.stringify(userData));
		// 生成token
		let token =await ctx.getToken(userDataStr);
		ctx.returnBody(true, {access_token: token, userInfo: userData}, "注册成功!")
	}
}

module.exports = AuthController;
