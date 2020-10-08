'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: { type: String, required: [true,'username不能为空'] },
    password: { type: String, required: [true,'password不能为空'] },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    avatar: { type: String, default: '' },
    roles: { type: String, default: '' },
    type: { type: String, enum: ['site', 'third'], default: 'site' }, //site用户是网站注册用户, third是第三方登录过来的用户
  });
  return mongoose.model('User', UserSchema);
};
