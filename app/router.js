'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // auth
	router.get('/inkwash/auth/login', controller.auth.login);
  router.post('/inkwash/auth/register', controller.auth.register);
  router.get('/inkwash/user/info', controller.user.getUserInfo)
};
