'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;

	const UserGroup = new Schema({
		name: {
			type: String,
			default: '',
			minlength: [2, '昵称长度不能小于2'],
			maxlength: [16, '昵称长度不能大于16'],
		},
		avatar: {type: String, default: ''},
		author: {type: String},
		members: [{type:String, ref: "User"}]
	}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
	return mongoose.model('UserGroup', UserGroup);
};
