'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
	/**
	 * 获取个人信息
	 * @returns {Promise<void>}
	 */
	async getUserInfo() {
		let {ctx} = this;
		ctx.returnBody(true, this.ctx.getUser())
	}

	/**
	 * 根据id获取个人信息
	 * @returns {Promise<void>}
	 */
	async getUserInfoById(){
		const { ctx, service } = this;
		const { userId } = ctx.request.query
		// 验证是否存在
		const user = await service.user.getUserById(userId);
		ctx.returnBody(true, user)
	}
	/**
	 * 更新个人昵称
	 * @returns {Promise<void>}
	 */
	async updateUserName(){
		const { ctx, service } = this;
		const { name } = ctx.request.body
		const user = await service.user.updateUserName(name);
		ctx.returnBody(true, user)
	}
	/**
	 * 更新个人昵称
	 * @returns {Promise<void>}
	 */
	async updateUserPass(){
		const { ctx, service } = this;
		const userData = await ctx.getUserData();
		const { oldPass, newPass } = ctx.request.body;
		// 校验老密码是否正确
		const userCurrentPass = await service.user.getUsersPasswordByUsername(userData.username);
		const verifyPass = await ctx.helper.checkPassword(oldPass, userCurrentPass.password)
		if (!verifyPass) {
			ctx.returnBody(false, '', "原密码错误，请输入正确原密码！");
			return;
		}
		const pass = await ctx.helper.createPassword(newPass)
		const user = await service.user.updateUserPass(pass);
		ctx.returnBody(true, user)
	}

	/**
	 * 更新个人头像
	 * @returns {Promise<void>}
	 */
		async updateUserAvatar(){
			const { ctx, service } = this;
			let userData = await ctx.getUserData()
			let file = ctx.request.files[0]
			let fileResult = await service.file.upload(file, 'avatar/' + userData.username);
			const user = await service.user.updateUserAvatar(fileResult.url);
			ctx.returnBody(true, user)
	}

	/**
	 * 模糊查询用户
	 * @returns {Promise<void>}
	 */
	async getUserList(){
		const { ctx, service } = this;
		const { keywords } = ctx.request.query;
		const users = await service.user.getUserByKeyWords(keywords);
		ctx.returnBody(true, users)
	}

	/**
	 * 根据用户id数组查询用户
	 * @returns {Promise<void>}
	 */
	async getUserByIds(){
		const { ctx, service } = this;
		let { ids } = ctx.request.query;
		ids = ids || ''
		ids = ids.split(',');
		const users = await service.user.getUsersByIds(ids);
		ctx.returnBody(true, users)
	}
}

module.exports = UserController;
