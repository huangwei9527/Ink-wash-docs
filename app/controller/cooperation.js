'use strict';

const Controller = require('egg').Controller;

class CooperationController extends Controller {
	/**
	 * 通过用户组id添加协作人
	 * @returns {Promise<void>}
	 */
	async addCooperationUserByGroup(){
		const {ctx, service} = this;
		const {groupId, documentId} = ctx.request.body;
		let userList = await service.userGroup.foundUserListByGroupId(groupId);
		let userIds = [];
		userList.forEach(item => {
			userIds.push(item._id);
		})
		let cooperationList = await service.document.addCooperationUser(documentId, userIds);
		ctx.returnBody(true, cooperationList)
	}
	/**
	 * 通过用户列表添加协作人
	 * @returns {Promise<void>}
	 */
	async addCooperationUser(){
		const {ctx, service} = this;
		const {userIds, documentId} = ctx.request.body;
		let cooperationList = await service.document.addCooperationUser(documentId, userIds);
		ctx.returnBody(true, cooperationList)
	}

	/**
	 * 获取协作人列表
	 * @returns {Promise<void>}
	 */
	async getCooperationUserListByDocumentId(){
		const {ctx, service} = this;
		const {documentId} = ctx.request.query;
		let cooperationList = await service.document.getCooperationUserListByDocumentId(documentId);
		ctx.returnBody(true, cooperationList)
	}

	async removeCooperationUser(){
		const {ctx, service} = this;
		const {documentId, userId} = ctx.request.body;
		const group = await service.document.removeCooperationUser(documentId, userId);
		ctx.returnBody(true, group)
	}
}

module.exports = CooperationController;
