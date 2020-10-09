module.exports = () => {

	return async function errorHandler(ctx, next) {
		try {
			await next();
		} catch (err) {
			// 所有的异常都会在app上出发一个error事件，框架会记录一条错误日志
			ctx.app.emit('error', err, ctx);

			const status = err.status || 500;

			// 如果时生产环境的时候 500错误的详细错误内容不返回给客户端
			const error = status === 500 && ctx.app.config.env === 'prod' ? '网络错误' : err.message;

			ctx.body = {
				msg: error,
				status: false,
				body: {},
				code: status
			};
		}
	};

};
