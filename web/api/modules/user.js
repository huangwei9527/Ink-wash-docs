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

//
