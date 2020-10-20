'use strict';

/** @type Egg.EggPlugin */
module.exports = {
	jwt: {
		enable: true,
		package: "egg-jwt"
	},
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  }
};
