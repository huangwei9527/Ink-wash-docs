'use strict';

const Service = require('egg').Service;

class UserGroupService extends Service {
	/**
	 * 新增用户分组
	 * @param options
	 * @returns {Promise<void>}
	 */
	async createUserGroup(name) {
		const {ctx} = this;
		let userData = await ctx.getUserData()
		return await ctx.model.UserGroup.create({
			name: name,
			author: userData._id
		});
	}

	async updateUserGroup(id, name){
		const {ctx} = this;
		return await ctx.model.UserGroup.findByIdAndUpdate({_id: id}, {
			$set: {
				name: name,
			}
		});
	}

	/**
	 * 获取列表
	 * */
	async getUserGroupList(){
		const {ctx} = this;
		let userData = await ctx.getUserData()
		return await ctx.model.UserGroup.find({
			author: userData._id
		})
			.populate({
			path: 'members',
			model: ctx.model.User,
			select: 'name username _id email avatar '
		}).exec();
	}
	/**
	 * 添加用户到分组
	 * @param groupId
	 * @param usersList
	 * @returns {Promise<void>}
	 */
	async addUsersToUserGroup(groupId, usersList = []){
		const {ctx} = this;
		await ctx.model.UserGroup.findByIdAndUpdate(groupId, {
			$addToSet: { members: { $each: usersList} }
		})
		return await ctx.model.UserGroup.findOne({_id: groupId}).populate({
			path: 'members',
			model: ctx.model.User,
			select: 'name username _id email avatar '
		}).exec();
	}

	/**
	 * 删除用户
	 */
	async delUserFormUserGroup(groupId, userId){
		const {ctx} = this;
		return await ctx.model.UserGroup.updateOne({_id: groupId}, {$pull: {members: userId}}, {
			runValidators: true
		})
	}

	/**
	 * 获取分组下所有用户
	 * @param groupId
	 * @returns {Promise<*>}
	 */
	async foundUserListByGroupId(groupId){
		const {ctx, service} = this;
		let group = await ctx.model.UserGroup.findOne({_id: groupId});
		group = group.toObject()
		return service.user.getUsersByIds(group.members)
	}

	async delUserGroup(id){
		const {ctx} = this;
		return await ctx.model.UserGroup.remove({_id: id});
	}
}

module.exports = UserGroupService;
