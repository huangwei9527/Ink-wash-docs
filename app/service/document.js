'use strict';

const Service = require('egg').Service;

class DocumentService extends Service {
	/**
	 * 新增文档
	 * @param options
	 * @returns {Promise<void>}
	 */
	async createDocument(documentData) {
		const {ctx} = this;
		let userData = await ctx.getUserData()
		const documentModel = {
			title: documentData.title,
			content: documentData.content,
			parentId: documentData.parentId || '',
			type: documentData.type,
			author: userData._id
		}
		return ctx.model.Document.create(documentModel);
	}

	/**
	 * 编辑更新文档
	 * @param documentData
	 * @returns {Promise<*>}
	 */
	async updateDocument(documentData) {
		const {ctx} = this;
		return await ctx.model.Document.findByIdAndUpdate({_id: documentData.id}, {
			$set: {
				title: documentData.title,
				content: documentData.content,
			}
		});
	}

	/**
	 * 查询文档列表
	 * @param {String} name 用户昵称
	 * @return {Promise[users]} 承载用户列表的 Promise 对象
	 */
	async getDocumentList(searchParams) {
		const {ctx} = this;
		let query = {parentId: searchParams.parentId, is_delete: {$ne: true}}
		// 联查用户表将用户创建者带上
		return ctx.model.Document.find(query)
			.select('_id parentId title type created updated')
			.populate({
				path: 'author',
				model: ctx.model.User,
				select: 'name username _id email avatar '
			}).exec();
	}

	/**
	 * 查询文档列表通过ids数组
	 * @param {String} name 用户昵称
	 * @return {Promise[users]} 承载用户列表的 Promise 对象
	 */
	async getDocumentListByIds(ids = []) {
		const {ctx} = this;
		let query = { _id: { $in: ids }, is_delete: {$ne: true}};
			// 联查用户表将用户创建者带上
		return ctx.model.Document.find(query)
			.select('_id parentId title type created updated')
			.populate({
				path: 'author',
				model: ctx.model.User,
				select: 'name username _id email avatar '
			}).exec();
	}

	/**
	 * 获取我的文档列表
	 * @returns {Promise<RegExpExecArray>}
	 */
	async getCurrentUserDocumentsList(){
		const {ctx} = this;
		let userData = await ctx.getUserData()
		let query = {author: userData._id, type: {$ne: 'folder'}, is_delete: {$ne: true}}
		// 联查用户表将用户创建者带上
		return ctx.model.Document.find(query)
			.select('_id parentId title type created updated')
			.populate({
				path: 'author',
				model: ctx.model.User,
				select: 'name username _id email avatar '
			}).exec();
	}

	/**
	 * 获取我的收藏列表
	 * @returns {Promise<void>}
	 */
	async getMyCollectDocumentList(){
		const {ctx} = this;
		let userData = await ctx.getUserData()
		let query = {collection_user:{ $elemMatch: {$in: userData._id}}, is_delete: {$ne: true}}
		// 联查用户表将用户创建者带上
		return ctx.model.Document.find(query)
			.select('_id parentId title type created updated')
			.populate({
				path: 'author',
				model: ctx.model.User,
				select: 'name username _id email avatar '
			}).exec();
	}

	/**
	 * 获取我的协作列表
	 * @returns {Promise<void>}
	 */
	async getMyCooperationDocumentList(){
		const {ctx} = this;
		let userData = await ctx.getUserData()
		let query = {cooperation_user:{ $elemMatch: {$in: userData._id}}, is_delete: {$ne: true}}
		// 联查用户表将用户创建者带上
		return ctx.model.Document.find(query)
			.select('_id parentId title type created updated')
			.populate({
				path: 'author',
				model: ctx.model.User,
				select: 'name username _id email avatar '
			}).exec();
	}

	/**
	 * 获取我的回收站列表
	 * @returns {Promise<void>}
	 */
	async getMyRecycleBinDocumentList(){
		const {ctx} = this;
		let userData = await ctx.getUserData();
		let query = {author: userData._id, is_delete: true};
		// 联查用户表将用户创建者带上
		return ctx.model.Document.find(query)
			.select('_id parentId title type created updated')
			.populate({
				path: 'author',
				model: ctx.model.User,
				select: 'name username _id email avatar '
			}).exec();
	}

	/**
	 * 查询文档详情
	 * @param id 文档id
	 * @returns {Promise<RegExpExecArray>}
	 */
	async getDocumentDetail(id) {
		const {ctx} = this;
		let userData = await ctx.getUserData()
		let documentData = await ctx.model.Document.findOne({_id: id}).populate({
			path: 'author',
			model: ctx.model.User,
			select: 'name username _id email avatar'
		}).exec();
		documentData = documentData.toObject();
		documentData.star_count = documentData.star_user.length;
		// 当前用户是否已点赞
		documentData.starStatus = userData && documentData.star_user.includes(userData._id);
		// 当前用户是否已收藏
		documentData.collectStatus = userData && documentData.collection_user.includes(userData._id);
		// 删除冗余字段
		delete documentData.collection_user
		delete documentData.star_user
		return documentData;
	}

	/**
	 * 创建文件夹
	 * @param title
	 * @param parentId
	 * @returns {Promise<documentModel>}
	 */
	async createFolder(title, parentId) {
		const {ctx} = this;
		let userData = await ctx.getUserData()
		const documentModel = {
			title: title,
			parentId: parentId || '',
			type: 'folder',
			author: userData._id
		}
		return ctx.model.Document.create(documentModel);
	}

	/**
	 * 文件夹重命名
	 * @param id
	 * @param title
	 * @returns {Promise<*>}
	 */
	async renameFolder(id, title) {
		const {ctx} = this;
		return await ctx.model.Document.findByIdAndUpdate({_id: id}, {$set: {title: title}});
	}

	/**
	 * 删除文档
	 * @param id
	 * @returns {Promise<*>}
	 */
	async delDocument(id) {
		const {ctx} = this;
		return await ctx.model.Document.findByIdAndUpdate({_id: id}, {$set: {is_delete: true}});
	}

	/**
	 * 彻底删除文档
	 * @param id
	 * @returns {Promise<boolean>}
	 */
	async distoryDocument(id){
		const {ctx} = this;
		return await ctx.model.Document.remove({_id: id});
	}

	/**
	 * 恢复文档
	 * @param id
	 * @returns {Promise<*>}
	 */
	async recoveryDocument(id){
		const {ctx} = this;
		// 检测所有父级是否有效
		let parentIsExist = true;

		let item = await ctx.model.Document.findOne({_id: id}).select('_id parentId title type, is_delete').exec();
		let tempData = item.toObject();
		item = item.toObject();
		while (item.parentId.length > 2) {
			try {
				item = await ctx.model.Document.findOne({_id: item.parentId}).select('_id parentId title type, is_delete').exec();
				item = item.toObject();
			}catch (e) {
				parentIsExist = false;
			}
			if(item.is_delete){
				parentIsExist = false;
			}
		}
		// 父级存在则正常恢复，父级有不存在的则将文档push到顶级目录
		let opt = {
			$set:
				{
					is_delete: false,
					parentId: parentIsExist ? tempData.parentId : ''
				}
		}
		return await ctx.model.Document.findByIdAndUpdate({_id: id}, opt);
	}

	/**
	 * 根据id获取当前文档所有父级列表
	 */
	async getPathById(id) {
		const {ctx} = this;
		if (!id) return [];

		let path = [];
		let item = await ctx.model.Document.findOne({_id: id}).select('_id parentId title type').exec();
		item = item.toObject();
		path.push(item);
		while (item.parentId.length > 2) {
			item = await ctx.model.Document.findOne({_id: item.parentId}).select('_id parentId title type').exec();
			item = item.toObject();
			path.push(item);
		}
		path.reverse();
		return path;
	}

	/**
	 * 点赞
	 * @param id
	 * @param status
	 */
	async starDocument(id, status) {
		const {ctx} = this;
		let userData = await ctx.getUserData()
		if (status) {
			await ctx.model.Document.updateOne({_id: id}, {$push: {star_user: userData._id}}, {
				runValidators: true
			});
		} else {
			await ctx.model.Document.updateOne({_id: id}, {$pull: {star_user: userData._id}}, {
				runValidators: true
			});
		}
		return true;
	}

	/**
	 *
	 * @param id
	 * @param status
	 * @returns {Promise<void>}
	 */
	async collectDocument(id, status) {
		const {ctx} = this;
		let userData = await ctx.getUserData()
		if (status) {
			await ctx.model.Document.updateOne({_id: id}, {$push: {collection_user: userData._id}}, {
				runValidators: true
			});
		} else {
			await ctx.model.Document.updateOne({_id: id}, {$pull: {collection_user: userData._id}}, {
				runValidators: true
			});
		}
		return true;
	}

	/**
	 * 文档访问数加一
	 * @param id
	 * @returns {Promise<void>}
	 */
	async documentVisitCountAdd(id){
		const {ctx} = this;
		// 访问数加一
		await ctx.model.Document.findByIdAndUpdate({_id: id}, {$inc: {visit_count: 1}})
	}
}

module.exports = DocumentService;
