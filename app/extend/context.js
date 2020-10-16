// 扩展一些框架便利的方法
module.exports = {
	/**
	 * 返回客户端的内容
	 * @param status // 接口是否成功
	 * @param body // 返回数据
	 * @param msg // 返回信息提示
	 * @param code // 返回状态码
	 */
	returnBody (status = true, body = {}, msg = 'success', code = 200) {
		this.status = code;
		this.body = {
			status: status,
			body: body,
			msg,
			code: code
		}
	},
	// 生成token
	async getToken(data) {
		return await this.app.jwt.sign(data, this.app.config.jwt.secret, {expiresIn: 30* 24 * 60 * 60 + 's'});
	},
	// 验证token
	async checkToken(token) {
		return await this.app.jwt.verify(token, this.app.config.jwt.secret)
	},
	// 获取用户信息
	async getUserData() {
		var token = this.headers.authorization ? this.headers.authorization : '';
		token = token.substring(7) //把Bearer 截取掉，解析的时候不需要加上Bearer
		let user = {}
		try {
			user = this.app.jwt.verify(token, this.app.config.jwt.secret);
		} catch (err) {
			user = {}
		}
		return user;
	}
}
