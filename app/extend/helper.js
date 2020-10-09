// 引入
const crypto = require('crypto');
module.exports = {
	// 加密
	async createPassword(password) {
		const hmac = crypto.createHash("sha256", this.config.crypto.secret);
		hmac.update(password.toString());
		return hmac.digest("hex");
	},
	// 验证密码
	async checkPassword(password, hash_password) {
		// 先对需要验证的密码进行加密
		password = await this.createPassword(password);
		return password === hash_password;
	}
}
