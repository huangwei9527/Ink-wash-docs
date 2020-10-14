'use strict';

const Controller = require('egg').Controller;

class UserGroupController extends Controller {
	// 新增用户分组
	async createUserGroup() {
		const {ctx, service} = this;
		const {id, name} = ctx.request.body
		// 验证是否存在
		let group
		if (id) {
			group = await service.userGroup.updateUserGroup(id, name);
		} else {
			group = await service.userGroup.createUserGroup(name);
		}
		ctx.returnBody(true, group)
	}

	// 获取分组列表
	async getUserGroupList() {
		const {ctx, service} = this;
		// 验证是否存在
		let group = await service.userGroup.getUserGroupList();
		ctx.returnBody(true, group)
	}

	// 添加用户到分组
	async addUsersToUserGroup() {
		const {ctx, service} = this;
		const {groupId, userList} = ctx.request.body
		// 验证是否存在
		const group = await service.userGroup.addUsersToUserGroup(groupId, userList);
		ctx.returnBody(true, group)
	}

	// 从组里删除用户
	async delUsersFromUserGroup() {
		const {ctx, service} = this;
		const {groupId, userId} = ctx.request.body
		// 验证是否存在
		const group = await service.userGroup.delUserFormUserGroup(groupId, userId);
		ctx.returnBody(true, group)
	}

	// 根据groupId 获取用户列表
	async getUsersByGroupId() {
		const {ctx, service} = this;
		const {groupId} = ctx.request.query
		const userList = await service.userGroup.foundUserListByGroupId(groupId);
		ctx.returnBody(true, userList)
	}

	// 删除
	async delUserGroup() {
		const {ctx, service} = this;
		const {id} = ctx.request.query
		await service.userGroup.delUserGroup(id);
		ctx.returnBody(true, {})
	}

}

module.exports = UserGroupController;
