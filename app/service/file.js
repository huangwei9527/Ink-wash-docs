const Service = require('egg').Service;
const  fs = require('fs')
const path = require('path')
const extract = require('extract-zip')

class FileService extends Service {
	/**
	 * 单文件上传
	 * @param file  要上传的文件
	 * @param folderPath 保存目标目录
	 * @returns {Promise<{fileName: *, url: string}>}
	 */
	async upload(file, folderName) {
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
			url:ctx.app.config.BASE_URL + `/resource/${folderName ? folderName + '/' : ''}${file.filename}`
		}
	}
	/***
	 * 解压操作
	 * @param file
	 * @param folderName
	 */
	async unZip(file, folderName){
		let {ctx} = this;
		// 将文件存到指定位置
		let folderPath = path.join(path.join(__dirname, '../public/resource/'), folderName) // 拼接文件夹
		// 判断文件夹是否存在不存在则新建一个
		await ctx.helper.dirExists(folderPath);

		try {
			await extract(file.filepath, { dir: folderPath })
			return {
				fileName: file.filename,
				url: ctx.app.config.BASE_URL + `/resource/${folderName ||  ''}`
			}
		} catch (err) {
			throw new Error(err);
		}
	}
}

module.exports = FileService;
