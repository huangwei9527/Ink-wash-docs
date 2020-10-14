const Service = require('egg').Service;
const  fs = require('fs')
const path = require('path')

class FileService extends Service {
	/**
	 * 单文件上传
	 * @param file  要上传的文件
	 * @param folderPath 保存目标目录
	 * @returns {Promise<{fileName: *, url: string}>}
	 */
	async upload(file, folderName) {
		console.log(folderName)
		let {ctx} = this;
		// 读取文件
		let fileData = fs.readFileSync(file.filepath)
		// 将文件存到指定位置
		let folderPath = path.join(path.join(__dirname, '../public/resource/'), folderName) // 拼接文件夹
		// 判断文件夹是否存在不存在则新建一个
		await ctx.helper.dirExists(folderPath);
		// 拼接文件路径
		let filePath = path.join(folderPath, file.filename) // 拼接文件路径
		fs.writeFileSync(filePath, fileData)
		// 返回文件信息
		return {
			fileName: file.filename,
			url: `/public/resource/${folderName ? folderName + '/' : ''}${file.filename}`
		}
	}
}

module.exports = FileService;
