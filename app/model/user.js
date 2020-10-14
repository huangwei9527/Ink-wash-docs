'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const UserSchema = new Schema({
		username: {
			type: String,
			required: [true, 'username不能为空'],
			minlength: [2, '用户名长度不能小于2'],
			maxlength: [16, '用户名长度不能大于16'],
		},
		password: {
			type: String,
			required: [true, 'password不能为空']
		},
		name: {
			type: String,
			default: '',
			minlength: [2, '昵称长度不能小于2'],
			maxlength: [16, '昵称长度不能大于16'],
		},
		email: {
			type: String,
			default: '',
			required: [true, 'email不能为空'],
			match: [/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, '邮箱格式错误，请输入正确邮箱地址']
		},
		avatar: {type: String, default: ''},
		roles: {type: String, default: ''},
		type: { //site用户是网站注册用户, third是第三方登录过来的用户
			type: String,
			enum: ['site', 'third'],
			default: 'site'
		},
		// 被点赞数统计
		star_count: {type: Number, default: 0},
		// 文章被阅读统计
		be_read_count: {type: Number, default: 0},
		history_visit_doc: [{type: String}],
	}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
	return mongoose.model('User', UserSchema);
};
