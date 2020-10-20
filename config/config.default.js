/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_huangwei9527';

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

	// add your middleware config here
	config.middleware = [ 'errorHandler'];


	// 统一错误信息配置（注：match和ignore不可以同时配置）
	config.errorHandler = {
		enable: true, // 中间件开启配置
		match: '', // 设置请求中间件的请求路由
		// ignore: '', // 设置不经过这个中间件的请求路由
	};

	config.crypto = {
		secret: 'Z#fOGf$te4^J28l1Z&$#fXCNifv!ZHQnEG'
	};

  // 关掉csrf
	config.security = {
		csrf: {
			enable: false,
		},
	};

	// 上传文件file读取方式
	config.multipart = {
		mode: 'file'
	};

	config.static = {
		prefix: '/',
		dir: [path.join(__dirname, '../app/public'), path.join(__dirname, '../dist')]// 多静态文件入口
	}

  return {
    ...config,
    ...userConfig,
  };
};
