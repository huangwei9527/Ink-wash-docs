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
			author: userData._id,
			members: [userData._id],
			visitType: 'team',
			isTemplate: !!documentData.isTemplate

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
	 *
	 * @param id
	 * @param content
	 * @returns {Promise<void>}
	 */
	async pushHistory(id, content) {
		const {ctx} = this;
		let documentData = await ctx.model.Document.findOne({_id: id}).select('history').exec();
		documentData = documentData.toObject();
		let history = documentData.history
		history.unshift(content)
		history = history.slice(0, 5);
		await ctx.model.Document.findByIdAndUpdate({_id: id}, {$set: {history: history}});
		return true;
	}

	/**
	 * 查询文档列表
	 * @param {String} name 用户昵称
	 * @return {Promise[users]} 承载用户列表的 Promise 对象
	 */
	async getDocumentList(searchParams) {
		const {ctx, app} = this;
		let userData = await ctx.getUserData()
		let query = {parentId: searchParams.parentId, is_delete: {$ne: true}, isTemplate: {$ne: true}}
		let userId = app.mongoose.Types.ObjectId(userData._id).toString()
		let documentList = await ctx.model.Document.find(query)
			.populate({
				path: 'author',
				model: ctx.model.User,
				select: 'name username _id email avatar'
			}).exec()
		let resultList = [];
		documentList.forEach(t => {
			let item = t.toObject();
			let isShow = false;
			let isEditor = false;
			// 判断是否有权限看
			// open 只有作者可见， 团队成员内可见， 私密也只有成员科技， 参与协作可见该文档
			if (item.author._id == userData._id || item.collection_user.includes(userId)) {
				isShow = true;
				isEditor = true;
			}
			if (item.visitType === 'team' && item.members.includes(userId)) {
				isShow = true;
			}
			if (isShow) {
				resultList.push({
					_id: item._id,
					parentId: item.parentId,
					title: item.title,
					type: item.type,
					author: {...item.author},
					created: item.created,
					updated: item.updated,
					isEditor: isEditor,
					isAuthor: item.author._id == userData._id
				})
			}
		})
		return resultList;
	}

	/**
	 * 查询文档列表通过ids数组
	 * @param {String} name 用户昵称
	 * @return {Promise[users]} 承载用户列表的 Promise 对象
	 */
	async getDocumentListByIds(ids = []) {
		const {ctx} = this;
		let query = {_id: {$in: ids}, is_delete: {$ne: true}, isTemplate: {$ne: true}};
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
	async getCurrentUserDocumentsList() {
		const {ctx} = this;
		let userData = await ctx.getUserData()
		let query = {author: userData._id, type: {$ne: 'folder'}, is_delete: {$ne: true}, isTemplate: {$ne: true}}
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
	async getMyCollectDocumentList() {
		const {ctx} = this;
		let userData = await ctx.getUserData()
		let query = {collection_user: {$elemMatch: {$in: userData._id}}, is_delete: {$ne: true}, isTemplate: {$ne: true}}
		// 联查用户表将用户创建者带上
		let docsData = ctx.model.Document.find(query)
			.select('_id parentId title type created updated')
			.populate({
				path: 'author',
				model: ctx.model.User,
				select: 'name username _id email avatar '
			}).exec();
		return docsData;

	}

	/**
	 * 获取我的协作列表
	 * @returns {Promise<void>}
	 */
	async getMyCooperationDocumentList() {
		const {ctx} = this;
		let userData = await ctx.getUserData()
		let query = {cooperation_user: {$elemMatch: {$in: userData._id}}, is_delete: {$ne: true}, isTemplate: {$ne: true}}
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
	async getMyRecycleBinDocumentList() {
		const {ctx} = this;
		let userData = await ctx.getUserData();
		let query = {author: userData._id, is_delete: true, isTemplate: {$ne: true}};
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
	 * 获取我的模板
	 * @returns {Promise<void>}
	 */
	async getMyTemplateDocument(type = '') {
		const {ctx} = this;
		let userData = await ctx.getUserData()
		let query = {author: userData._id, isTemplate: true};
		if (type) {
			query.type = type;
		}
		return await ctx.model.Document.find(query).select('_id parentId title type created updated').exec();
	}

	/**
	 * 查询文档详情
	 * @param id 文档id
	 * @returns {Promise<RegExpExecArray>}
	 */
	async getDocumentDetail(id, isVisit) {
		const {ctx, service} = this;
		let userData = await ctx.getUserData()
		let documentData = await ctx.model.Document.findOne({_id: id}).exec();
		documentData = documentData.toObject();
		// 阅读权限 open(公开)所有人都能访问  team（团队）登录用户在团队 协作人或者作者里都可见 pass（密码）仅作者可看见
		let readPermission = documentData.visitType === 'open' ||
			(documentData.visitType === 'team' && ([...documentData.members, ...documentData.cooperation_user, documentData.author].includes(userData._id))) ||
			(documentData.visitType === 'private' && documentData.author === userData._id);
		// 编辑权限
		let editPermission = (documentData.visitType === 'private' && documentData.author === userData._id);
		let resultData = {}
		resultData.authority = {
			visitType: documentData.visitType,
			needLogin: documentData.visitType === 'private' || documentData.visitType === 'team',
			read: readPermission,
			edit: editPermission
		}
		resultData.author = await service.user.getUserById(documentData.author)
		resultData.document = {
			_id: documentData._id,
			type: documentData.type,
			title: documentData.title,
			content: documentData.content,
			parentId: documentData.parentId,
			visit_count: documentData.visit_count,
			star_count: documentData.star_count,
			starStatus: userData && documentData.star_user.includes(userData._id),
			collectStatus: userData && documentData.collection_user.includes(userData._id),
			updated: documentData.updated,
			created: documentData.created,
		}
		resultData.is_delete = documentData.is_delete;

		if (!isVisit) {
			resultData.document.visitPass = documentData.visitPass;
		}

		return resultData
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
			author: userData._id,
			members: [userData._id],
			visitType: 'team'
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
	async distoryDocument(id) {
		const {ctx} = this;
		return await ctx.model.Document.remove({_id: id});
	}

	/**
	 * 恢复文档
	 * @param id
	 * @returns {Promise<*>}
	 */
	async recoveryDocument(id) {
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
			} catch (e) {
				parentIsExist = false;
			}
			if (item.is_delete) {
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
	async documentVisitCountAdd(id) {
		const {ctx} = this;
		// 访问数加一
		await ctx.model.Document.findByIdAndUpdate({_id: id}, {$inc: {visit_count: 1}})
	}


	/**
	 * 通过user list 添加协作人
	 * @param documentId
	 * @param userIds
	 * @returns {Promise<$addToSet.cooperation_user|{$each}|query.cooperation_user|{$elemMatch}>}
	 */
	async addCooperationUser(documentId, userIds) {
		const {ctx} = this;
		await ctx.model.Document.findByIdAndUpdate(documentId, {
			$addToSet: {cooperation_user: {$each: userIds}}
		})
		let documentData = await ctx.model.Document.findOne({_id: documentId}).populate({
			path: 'cooperation_user',
			model: ctx.model.User,
			select: 'name username _id email avatar '
		}).exec();
		documentData = documentData.toObject();
		return documentData.cooperation_user
	}

	/**
	 * 获取协作人列表
	 * @param documentId
	 * @returns {Promise<RegExpExecArray>}
	 */
	async getCooperationUserListByDocumentId(documentId) {
		const {ctx} = this;
		let doc = await ctx.model.Document.findOne({_id: documentId}).populate({
			path: 'cooperation_user',
			model: ctx.model.User,
			select: 'name username _id email avatar '
		}).exec();
		doc = doc.toObject()
		return doc.cooperation_user
	}

	/**
	 * 移出协作人
	 * @param documentId
	 * @param userId
	 * @returns {Promise<*>}
	 */
	async removeCooperationUser(documentId, userId) {
		const {ctx} = this;
		return await ctx.model.Document.updateOne({_id: documentId}, {$pull: {cooperation_user: userId}}, {
			runValidators: true
		})
	}

	/**
	 * 获取当前文档所有权限用户
	 * @param documentId
	 * @returns {Promise<$addToSet.members|{$each}>}
	 */
	async getMembersByDocumentId(documentId) {
		const {ctx} = this;
		let doc = await ctx.model.Document.findOne({_id: documentId}).populate({
			path: 'members',
			model: ctx.model.User,
			select: 'name username _id email avatar '
		}).exec();
		doc = doc.toObject()
		return doc.members
	}

	/**
	 * 设置团队访问
	 * @param documentId
	 * @param users
	 * @returns {Promise<*>}
	 */
	async setDocumentVisitTeam(documentId, users) {
		const {ctx} = this;
		return await ctx.model.Document.findByIdAndUpdate(documentId, {$set: {members: users, visitType: 'team'}});
	}

	/**
	 * 设置公开访问
	 * @param documentId
	 * @returns {Promise<*>}
	 */
	async setDocumentOpen(documentId) {
		const {ctx} = this;
		return await ctx.model.Document.findByIdAndUpdate(documentId, {$set: {visitType: 'open'}});
	}

	/**
	 * 设置私密访问
	 * @param documentId
	 * @param pass
	 * @returns {Promise<*>}
	 */
	async setDocumentPrivate(documentId, pass) {
		const {ctx} = this;
		return await ctx.model.Document.findByIdAndUpdate(documentId, {$set: {visitType: 'private', visitPass: pass}});
	}

	/**
	 * 校验密码
	 * @param documentId
	 * @param pass
	 * @returns {Promise<boolean>}
	 */
	async checkDocumentPassword(documentId, pass) {
		const {ctx} = this;
		let doc = await ctx.model.Document.findOne({_id: documentId}).exec()
		doc = doc.toObject();
		return pass === doc.visitPass
	}

	/**
	 * 根据id获取子级
	 * @param documentId
	 * @returns {Promise<void>}
	 */
	async findChildrenListById(documentId) {
		const {ctx} = this;
		let docsList = [];
		let finFn = async id => {
			let l = await ctx.model.Document.find({parentId: id}).exec();
			for (let i = 0, len = l.length; i < len; i++) {
				if (l[i].type === 'folder') {
					await finFn(l[i]._id);
				}
				docsList.push(l[i])
			}
		}
		await finFn(documentId)
		return docsList;
	}
}

module.exports = DocumentService;
