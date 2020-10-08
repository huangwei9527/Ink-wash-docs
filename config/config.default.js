/* eslint valid-jsdoc: "off" */

'use strict';

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

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // mongdb 配置
  config.mongoose = {
    url: 'mongodb://172.0.0.1:27017/inkwash',
    options: {},
  };

  return {
    ...config,
    ...userConfig,
    mongoose: {
      client: {
        url:'mongodb://admin:123456@localhost:27017/test',
        options: {}
      }
    }
  };
};
