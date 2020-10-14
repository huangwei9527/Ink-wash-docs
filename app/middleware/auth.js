'use strict';

module.exports = () => {
	return async function(ctx, next) {
		// let token = '';
		// if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer') {
		// 	token = ctx.headers.authorization.split(' ')[1];
		// }
		// try{
		// 	await ctx.checkToken(token)
		// 	await next();
		// }catch(e){
		// 	ctx.returnBody(false, '', '登录过期', 401);
		// }
		await next();
	};
};
