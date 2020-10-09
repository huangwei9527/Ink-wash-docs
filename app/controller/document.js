'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
	/**
	 * 获取个人文档列表
	 */
	async getMyDocumentList() {
		ctx.returnBody(true, [])
    }
    /**
     * 新增文档
     */
    async newDocument(){
        
    }
    /**
     * 删除文档
     */
    async delDocument(){

    }
    /**
     * 修改文档
     */
    async updateDocument(){

    }
    async get
}

module.exports = UserController;
