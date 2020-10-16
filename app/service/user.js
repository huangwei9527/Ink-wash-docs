'use strict';

const Service = require('egg').Service;

let selectUserKey = {password:0, history_visit_doc: 0};

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
		return ctx.model.User.findOne(query, selectUserKey).exec();
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
		return ctx.model.User.find(query, selectUserKey).exec();
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
		return ctx.model.User.findOne(query, selectUserKey).exec();
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
		return ctx.model.User.findOne(query, selectUserKey).exec();
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
		return ctx.model.User.findOne({ _id: id }, selectUserKey).exec();
	}
	/**
   * 根据用户ID列表，获取一组用户
   * @param {Array} ids 用户ID列表
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
	async getUsersByIds(ids) {
		const {ctx} = this;
		console.log('ids: ', ids);
		return ctx.model.User.find({ _id: { $in: ids } }, selectUserKey).exec();
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
	async getUsersByQuery(query) {
		const {ctx} = this;
		return ctx.model.User.find(query, '', selectUserKey).exec();
	}

	/**
	 * 更新个人头像
	 * @param {*} url
	 */
	async updateUserAvatar(url){
		const {ctx} = this;
		const userData = await ctx.getUserData()
		await ctx.model.User.findByIdAndUpdate(userData._id, {$set: {avatar: url}});
		return ctx.model.User.findOne({ _id: userData._id }, selectUserKey).exec();
	}
	/**
	 * 更新用户昵称
	 * @param {*} name
	 */
	async updateUserName(name){
		const {ctx} = this;
		const userData = await ctx.getUserData()
		await ctx.model.User.findByIdAndUpdate(userData._id, {$set: {name: name}});
		return ctx.model.User.findOne({ _id: userData._id }, selectUserKey).exec();
	}
	/**
	 * 更新个人密码
	 * @param {*} newPass
	 */
	async updateUserPass(newPass){
		const {ctx} = this;
		const userData = await ctx.getUserData()
		await ctx.model.User.findByIdAndUpdate(userData._id, {$set: {password: newPass}});
		return ctx.model.User.findOne({ _id: userData._id }, selectUserKey).exec();
	}

	/**
	 * 添加历史纪录
	 * @param id
	 * @returns {Promise<*>}
	 */
	async addVisitDocumentHistory(id){
		const {ctx} = this;
		let userData = await ctx.getUserData()
		userData = await ctx.model.User.findOne({_id: userData._id})
		userData = userData.toObject();
		if(userData.history_visit_doc.includes(id)){
			userData.history_visit_doc.splice(userData.history_visit_doc.indexOf(id),1);
		}
		let vList = [id, ...userData.history_visit_doc];
		vList = vList.slice(0, 20) // 保留20条纪录
		return await ctx.model.User.updateOne({_id: userData._id}, {$set: {history_visit_doc: vList}}, {
			runValidators: true
		});
	}

	// 关键字模糊查询
	async getUserByKeyWords(keywords){
		const {ctx} = this;
		return  await ctx.model.User.find(
			{
				$or : [ //多条件，数组
					{name : {$regex : keywords}},
					{username : {$regex : keywords}},
					{email : {$regex : keywords}}
				]
			},
			{
				password: 0
			},
			{
				sort : { _id : -1 },
				limit : 20
			}
		)
	}
}

module.exports = UserService;
