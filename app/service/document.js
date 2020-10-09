'use strict';

const Service = require('egg').Service;

class DocumentService extends Service {
	/**
	 * 新增文档
	 * @param options
	 * @returns {Promise<void>}
	 */
	async createDocument() {
		const {ctx} = this;
		return ctx.model.Document.create({});
	}
}

module.exports = DocumentService;
