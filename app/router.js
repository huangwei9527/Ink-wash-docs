'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware} = app;
  const auth = middleware.auth()
	// 重定向到index页面
	app.router.redirect('/', '/index.html', 302);

  // 认证
	router.post('/inkwash/auth/login', controller.auth.login);
  router.post('/inkwash/auth/register', controller.auth.register);
  // 用户
  router.get('/inkwash/user/info', auth, controller.user.getUserInfo);
	router.get('/inkwash/user/getInfoById', controller.user.getUserInfoById);
	router.get('/inkwash/user/getInfoByIds', controller.user.getUserByIds);
	router.post('/inkwash/user/update/name', auth, controller.user.updateUserName);
	router.post('/inkwash/user/update/pass', auth, controller.user.updateUserPass);
	router.post('/inkwash/user/update/avatar', auth, controller.user.updateUserAvatar);
	router.get('/inkwash/user/getUserList', controller.user.getUserList);
	// 文档
	router.post('/inkwash/docs/add', auth, controller.document.createDocument);
	router.post('/inkwash/docs/del', auth, controller.document.delDocument);
	router.get('/inkwash/dos/list', auth, controller.document.getDocumentList);
	router.get('/inkwash/dos/detail', controller.document.getDocumentDetail);
	router.post('/inkwash/docs/newFolder', auth, controller.document.createFolder);
	router.post('/inkwash/docs/rename', auth, controller.document.renameFolder);
	router.get('/inkwash/docs/path', auth, controller.document.getDocumentPathById);
	router.post('/inkwash/docs/checkPass', controller.document.checkDocumentPassword);
	// 上传axure
	router.post('/inkwash/docs/axure/upload', auth, controller.document.uploadAxureZip);
	// 点赞收藏
	router.get('/inkwash/docs/star', auth, controller.document.starDocument);
	router.get('/inkwash/docs/collect', auth, controller.document.collectDocument);
	// 我的文档
	router.get('/inkwash/docs/myDocument', auth, controller.document.getCurrentUserDocumentList);
	// 我的收藏列表
	router.get('/inkwash/docs/myCollectDocument', auth, controller.document.getMyCollectDocumentList);
	// 我的协作列表
	router.get('/inkwash/docs/myCooperationDocument', auth, controller.document.getMyCooperationDocumentList);
	router.post('/inkwash/docs/addCooperation/userIds', auth, controller.cooperation.addCooperationUser);
	router.post('/inkwash/docs/addCooperation/groupId', auth, controller.cooperation.addCooperationUserByGroup);
	router.get('/inkwash/docs/getCooperation/userList', auth, controller.cooperation.getCooperationUserListByDocumentId);
	router.post('/inkwash/delCooperation/user', auth, controller.cooperation.removeCooperationUser);

	// 我的浏览历史列表
	router.get('/inkwash/docs/myVisitHistoryDocument', auth, controller.document.getMyVisitHistoryDocumentList);
	// 我的回收站
	router.get('/inkwash/docs/myRecycleBin', auth, controller.document.getMyRecycleBinDocumentList);
	router.post('/inkwash/docs/distory', auth, controller.document.distoryDocument);
	router.post('/inkwash/docs/recovery', auth, controller.document.recoveryDocument);

	// 分组管理团队管理
	router.post('/inkwash/userGroup/create', auth, controller.userGroup.createUserGroup);
	router.get('/inkwash/userGroup/list', auth, controller.userGroup.getUserGroupList);
	router.post('/inkwash/userGroup/addUsers', auth, controller.userGroup.addUsersToUserGroup);
	router.post('/inkwash/userGroup/delUser', auth, controller.userGroup.delUsersFromUserGroup);
	router.get('/inkwash/userGroup/userList', auth, controller.userGroup.getUsersByGroupId);
	router.get('/inkwash/userGroup/del', auth, controller.userGroup.delUserGroup);

	// 访问设置
	router.get('/inkwash/docs/visit/getDocMembers', auth, controller.document.getMembersByDocumentId);
	router.get('/inkwash/docs/getDocMembers', auth, controller.document.getMembersByDocumentId);
	router.post('/inkwash/docs/visit/setAsTeam', auth, controller.document.setDocumentVisitTeam);
	router.post('/inkwash/docs/visit/setAsOpen', auth, controller.document.setDocumentOpen);
	router.post('/inkwash/docs/visit/setAsPrivate', auth, controller.document.setDocumentPrivate);

	// 我的模板
	router.get('/inkwash/docs/myTemplate', auth, controller.document.getMyTemplateDocument);


};
