'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
	/**
	 * 获取文档列表
	 */
	async getDocumentList() {
		let {ctx} = this;
		let query = ctx.request.query
		let documentList = await ctx.service.document.getDocumentList(query);
		ctx.returnBody(true, documentList)
	}

	/**
	 * 获取个人文档列表
	 */
	async getCurrentUserDocumentList() {
		let {ctx} = this;
		let documentList = await ctx.service.document.getCurrentUserDocumentsList();
		ctx.returnBody(true, documentList)
	}

	/**
	 * 获取个人收藏列表
	 */
	async getMyCollectDocumentList() {
		let {ctx} = this;
		let documentList = await ctx.service.document.getMyCollectDocumentList();
		ctx.returnBody(true, documentList)
	}

	/**
	 * 获取个人协作列表
	 */
	async getMyCooperationDocumentList() {
		let {ctx} = this;
		let documentList = await ctx.service.document.getMyCooperationDocumentList();
		ctx.returnBody(true, documentList)
	}

	/**
	 * 获取个人浏览历史列表
	 */
	async getMyVisitHistoryDocumentList() {
		let {ctx} = this;
		let userData = await ctx.getUserData();
		userData = await ctx.service.user.getUserById(userData._id)
		userData = userData.toObject();
		let documentList = await ctx.service.document.getDocumentListByIds(userData.history_visit_doc);
		ctx.returnBody(true, documentList)
	}

	/**
	 * 获取个人浏览历史列表
	 */
	async getMyRecycleBinDocumentList() {
		let {ctx} = this;
		let documentList = await ctx.service.document.getMyRecycleBinDocumentList();
		ctx.returnBody(true, documentList)
	}

	/**
	 * 根据id获取文档详情
	 * @returns {Promise<void>}
	 */
	async getDocumentDetail() {
		let {ctx} = this;
		let {id, isVisit} = ctx.request.query
		let document = await ctx.service.document.getDocumentDetail(id);
		if (isVisit) {
			await ctx.service.document.documentVisitCountAdd(id);
			await ctx.service.user.addVisitDocumentHistory(id);
		}
		ctx.returnBody(true, document)
	}

	/**
	 * 新增文档
	 */
	async createDocument() {
		let {ctx} = this;
		let {id, title, content, type, parentId} = ctx.request.body;
		let document
		if (id) {
			document = await ctx.service.document.updateDocument({id, title, content})
		} else {
			document = await ctx.service.document.createDocument({id, title, content, type, parentId})
		}
		ctx.returnBody(true, document)
	}

	/**
	 *  创建文件夹
	 */
	async createFolder() {
		let {ctx} = this;
		let {title, parentId} = ctx.request.body
		let document = await ctx.service.document.createFolder(title, parentId);
		ctx.returnBody(true, document)
	}

	/**
	 * 文件夹重命名
	 * @returns {Promise<void>}
	 */
	async renameFolder() {
		let {ctx} = this;
		let {title, id} = ctx.request.body
		let document = await ctx.service.document.renameFolder(id, title);
		ctx.returnBody(true, document)
	}

	/**
	 * 删除文档或文件夹
	 */
	async delDocument() {
		let {ctx} = this;
		let {id} = ctx.request.body;
		await ctx.service.document.delDocument(id);
		ctx.returnBody(true)
	}
	/**
	 * 彻底删除文档或文件夹
	 */
	async distoryDocument() {
		let {ctx} = this;
		let {id} = ctx.request.body;
		await ctx.service.document.distoryDocument(id);
		ctx.returnBody(true)
	}
	/**
	 * 恢复文档或文件夹
	 */
	async recoveryDocument() {
		let {ctx} = this;
		let {id} = ctx.request.body;
		await ctx.service.document.recoveryDocument(id);
		ctx.returnBody(true)
	}

	/**
	 * 获取路径
	 * @returns {Promise<void>}
	 */
	async getDocumentPathById() {
		let {ctx} = this;
		let {id} = ctx.request.query
		let document = await ctx.service.document.getPathById(id);
		ctx.returnBody(true, document)
	}

	/**
	 * 点赞
	 * @returns {Promise<void>}
	 */
	async starDocument() {
		let {ctx} = this;
		let {id, status} = ctx.request.query
		await ctx.service.document.starDocument(id, status === 'true');
		ctx.returnBody(true)
	}

	/**
	 * 收藏
	 * @returns {Promise<void>}
	 */
	async collectDocument() {
		let {ctx} = this;
		let {id, status} = ctx.request.query
		await ctx.service.document.collectDocument(id, status === 'true');
		ctx.returnBody(true)
	}
}

module.exports = UserController;
