'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const DocumentSchema = new Schema({
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
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
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
        // 共享人员列表
        members: [
            mongoose.Schema.Types.ObjectId
        ],
	}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
	return mongoose.model('Document', DocumentSchema);
};
