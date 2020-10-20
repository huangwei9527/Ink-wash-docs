'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const DocumentSchema = new Schema({
		parentId: {
			type: String,
			default: '0'
		},
		title: {
			type: String,
			required: [true, '标题不能为空'],
			maxlength: [20, '用户名长度不能大于20'],
			default: '新建文档'
		},
		content: {
			type: String
		},
		type: { // md: markdown文档
			type: String,
			default: 'md'
		},
		author: {
			type: String,
			ref: "User"
		},
		//  发布状态
		isPublish: {
			type: Boolean,
			default: true
		},
		isTemplate: {
			type: Boolean,
			default: false
		},
		visit_count: {
			type: Number,
			default: 1
		},
		star_user: [{
			type: String
		}],
		collection_user: [{
			type: String
		}],
		// 协作人员
		cooperation_user: [{
			type: String,
			ref: "User"
		}],
		// 授权用户
		members: [{
			type: String,
			ref: "User"
		}],
		visitType: {
			type: String, // open: 公开， team: 团队， private: 私密
			default: 'team'
		},
		visitPass: {
			type: String
		},
		// 是否已删除
		is_delete: {
			type: Boolean,
			default: false
		},
		// 历史纪录
		history: [{
			type: String
		}],
	}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
	return mongoose.model('Document', DocumentSchema);
};
