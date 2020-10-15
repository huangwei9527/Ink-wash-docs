/*
	用户相关api
**/

import $axios from "@/service/httpServer";
// 登录
export const login = p => $axios.post('/inkwash/auth/login', p);

// 注册
export const register = p => $axios.post('/inkwash/auth/register', p);

// 获取用户信息
export const getUserInfo = () => $axios.get('/inkwash/user/info');
// 获取用户信息 by userId
export const getUserInfoById = p => $axios.get('/inkwash/user/getInfoById', p);
// 获取用户信息 by userId
export const getUserInfoByIds = p => $axios.get('/inkwash/user/getInfoByIds', p);

// 修改用户昵称
export const updateNickName = p => $axios.post('/inkwash/user/update/name', p);

// 修改密码
export const updateUserPass = p => $axios.post('/inkwash/user/update/pass', p);

// 修改头像
export const updateUserAvatar = p => $axios.post('/inkwash/user/update/avatar', p);

// 关键字搜索用户列表
export const getUserListByKeywords = p => $axios.get('/inkwash/user/getUserList', p);


/**
 * 文章作者相关
 */
export const getAuthorInfo = p => $axios.post('/inkwash/author/info', p);

