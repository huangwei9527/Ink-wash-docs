'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // auth
	router.get('/auth/login', controller.auth.login);
	router.get('/auth/register', controller.auth.register);
};
