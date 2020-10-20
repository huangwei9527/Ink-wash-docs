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
	 * 获取我的模板
	 * @returns {Promise<void>}
	 */
	async getMyTemplateDocument(){
		let {ctx} = this;
		let {type} = ctx.request.query
		let documentList = await ctx.service.document.getMyTemplateDocument(type);
		ctx.returnBody(true, documentList)
	}

	/**
	 * 根据id获取文档详情
	 * @returns {Promise<void>}
	 */
	async getDocumentDetail() {
		let {ctx} = this;
		let {id, isVisit} = ctx.request.query
		let userData = await ctx.getUserData()
		let document = await ctx.service.document.getDocumentDetail(id, isVisit);
		if (isVisit) {
			await ctx.service.document.documentVisitCountAdd(id);
		}
		if(isVisit && userData._id){
			await ctx.service.user.addVisitDocumentHistory(id);
		}
		ctx.returnBody(true, document)
	}

	/**
	 * 新增文档
	 */
	async createDocument() {
		let {ctx} = this;
		let {id, title, content, type, parentId, isTemplate} = ctx.request.body;
		let document
		if (id) {
			document = await ctx.service.document.updateDocument({id, title, content})
			// 保存历史纪录
			await ctx.service.document.pushHistory(id, content)
		} else {
			document = await ctx.service.document.createDocument({title, content, type, parentId, isTemplate})
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

	/**
	 * 上传axure原型并解压获取访问地址
	 * @returns {Promise<void>}
	 */
	async uploadAxureZip(){
		const { ctx, service } = this;
		let file = ctx.request.files[0]
		let folderName = 'axure/' + (+ new Date());
		let fileResult = await service.file.unZip(file, folderName);
		// 拼接访问默认html
		fileResult.url = fileResult.url + '/index.html';
		ctx.returnBody(true, fileResult)
	}

	// 访问设置相关
	/**
	 * 获取所有文档授权用户
	 * @returns {Promise<*|$addToSet.members|{$each}>}
	 */
	async getMembersByDocumentId(){
		const { ctx, service } = this;
		let {documentId} = ctx.request.query
		let userList = await service.document.getMembersByDocumentId(documentId)
		ctx.returnBody(true, userList)


	}

	/**
	 * s设置访问方式为团队
	 * @returns {Promise<*>}
	 */
	async setDocumentVisitTeam(){
		const { ctx, service } = this;
		let {documentId, userIds, useToChildren} = ctx.request.body
		await service.document.setDocumentVisitTeam(documentId, userIds)
		// 不需要同步子级权限
		if(!useToChildren){
			ctx.returnBody(true)
			return
		}
		// 同步修改子节点权限
		let childrenList = await service.document.findChildrenListById(documentId);
		for(let i = 0, len = childrenList.length; i < len; i++){
			await service.document.setDocumentVisitTeam(childrenList[i]._id, userIds)
		}
		ctx.returnBody(true)
	}

	/**
	 * 设置访问方式为公开
	 * @returns {Promise<*>}
	 */
	async setDocumentOpen(){
		const { ctx, service } = this;
		let {documentId, useToChildren} = ctx.request.body
		await service.document.setDocumentOpen(documentId);
		// 不需要同步子级权限
		if(!useToChildren){
			ctx.returnBody(true)
			return
		}
		// 同步修改子节点权限
		let childrenList = await service.document.findChildrenListById(documentId);
		for(let i = 0, len = childrenList.length; i < len; i++){
			await service.document.setDocumentOpen(childrenList[i]._id)
		}
		ctx.returnBody(true)
	}

	/**
	 * 设置访问方式为私密
	 * @returns {Promise<*>}
	 */
	async setDocumentPrivate(){
		const { ctx, service } = this;
		let {documentId, pass, useToChildren} = ctx.request.body
		await service.document.setDocumentPrivate(documentId, pass);
		// 不需要同步子级权限
		if(!useToChildren){
			ctx.returnBody(true)
			return
		}
		// 同步修改子节点权限
		let childrenList = await service.document.findChildrenListById(documentId);
		for(let i = 0, len = childrenList.length; i < len; i++){
			await service.document.setDocumentPrivate(childrenList[i]._id, pass)
		}
		ctx.returnBody(true)
	}

	/**
	 * 校验文档密码是否正确
	 * @returns {Promise<void>}
	 */
	async checkDocumentPassword(){
		const { ctx, service } = this;
		let {documentId, pass} = ctx.request.body
		let isRight = await service.document.checkDocumentPassword(documentId, pass)
		ctx.returnBody(true, isRight)
	}

}

module.exports = UserController;
