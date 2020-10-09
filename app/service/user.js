'use strict';

const Service = require('egg').Service;

let selectUserKey = '_id username name email avatar type roles created updated';

class UserService extends Service {
	/**
	 * 新增用户
	 * @param options
	 * @returns {Promise<void>}
	 */
	async createUser(username, password, email, name) {
		const {ctx} = this;
		await ctx.model.User.create({
			username: username,
			password: password,
			email: email,
			name: name || username,
		});
		const query = {username: {$in: username}};
		return ctx.model.User.findOne(query).select(selectUserKey).exec();
	}

	/**
	 * 根据用户昵称查找用户列表
	 * @param {String} name 用户昵称
	 * @return {Promise[users]} 承载用户列表的 Promise 对象
	 */
	async getUsersByName(name) {
		const {ctx} = this;
		if (name.length === 0) {
			return [];
		}
		const query = {name: {$in: name}};
		return ctx.model.User.find(query).select(selectUserKey).exec();
	}

	/**
	 * 根据用户名查找用户
	 * @param username
	 * @returns {Promise<void>}
	 */
	async getUsersPasswordByUsername(username){
		const {ctx} = this;
		if (username.length === 0) {
			return null;
		}
		const query = {username: {$in: username}};
		return ctx.model.User.findOne(query).select('password').exec();
	}

	/**
	 * 根据用户名查找用户
	 * @param username
	 * @returns {Promise<void>}
	 */
	async getUsersByUsername(username){
		const {ctx} = this;
		if (username.length === 0) {
			return null;
		}
		const query = {username: {$in: username}};
		return ctx.model.User.findOne(query).select(selectUserKey).exec();
	}
	/**
	 * 根据邮箱查找用户
	 * @param email
	 * @returns {Promise<void>}
	 */
	async getUsersByEmail(email){
		const {ctx} = this;
		if (email.length === 0) {
			return null;
		}
		const query = {email: {$in: email}};
		return ctx.model.User.findOne(query).select(selectUserKey).exec();
	}
	/**
   * 根据用户ID，查找用户
   * @param {String} id 用户ID
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
	async getUserById(id) {
		const {ctx} = this;
		if (!id) {
			return null;
		}
		return ctx.model.User.findOne({ _id: id }).select(selectUserKey).exec();
	}
	/**
   * 根据用户ID列表，获取一组用户
   * @param {Array} ids 用户ID列表
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
	getUsersByIds(ids) {
		const {ctx} = this;
		return ctx.model.User.find({ _id: { $in: ids } }).select(selectUserKey).exec();
	}

	/**
   * 根据关键字，获取一组用户
   * Callback:
   * - err, 数据库异常
   * - users, 用户列表
   * @param {String} query 关键字
   * @param {Object} opt 选项
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
	getUsersByQuery(query, opt) {
		const {ctx} = this;
		return ctx.model.User.find(query, '', opt).select(selectUserKey).exec();
	}
}

module.exports = UserService;
