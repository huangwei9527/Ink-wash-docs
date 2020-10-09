
// 扩展一些框架便利的方法
module.exports = {
	/**
	 * 返回客户端的内容
	 * @param status // 接口是否成功
	 * @param body // 返回数据
	 * @param msg // 返回信息提示
	 * @param code // 返回状态码
	 */
	returnBody (status = true, body = {}, msg = '接口请求已处理', code = 200) {
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
		return this.app.jwt.sign(data, this.app.config.jwt.secret, {expiresIn: '1h'});
	},
	//验证token
	async checkToken(token) {
		return this.app.jwt.verify(token, this.app.config.jwt.secret)
	}
}
