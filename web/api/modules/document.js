/**文档相关接口*/

import $axios from "@/service/httpServer";

// 获取文档列表
export const getDocsList = p => $axios.get('/inkwash/dos/list', p);

// 获取文档详情
export const getDocumentDetail = p => $axios.get('/inkwash/dos/detail', p);

// 创建文件夹
export const newFolder = p => $axios.post('/inkwash/docs/newFolder', p);

// 新增文档
export const createDocument = p => $axios.post('/inkwash/docs/add', p);

// 删除文档
export const delDocument = p => $axios.post('/inkwash/docs/del', p);

// 文档重命名
export const documentRename = p => $axios.post('/inkwash/docs/rename', p);

// 获取文档路径
export const getDocumentPathById = p => $axios.get('/inkwash/docs/path', p)

// 点赞
export const starDocument = p => $axios.get('/inkwash/docs/star', p)

// 收藏
export const collectDocument = p => $axios.get('/inkwash/docs/collect', p)

/**
 * 我的文档
 * */
// 我的文档列表
export const getMyDocumentList = () => $axios.get('/inkwash/docs/myDocument')

/**
 * 我的收藏
 * */
// 我的文档列表
export const getMyCollectDocumentList = () => $axios.get('/inkwash/docs/myCollectDocument')

/**
 * 我的协作
 * */
// 我的文档列表
export const getMyCooperationDocumentList = () => $axios.get('/inkwash/docs/myCooperationDocument')

/**
 * 我的浏览历史
 * */
// 我的文档列表
export const getMyVisitHistoryDocumentList = () => $axios.get('/inkwash/docs/myVisitHistoryDocument')

/**
 * 我的回收站
 * */
// 我的文档列表
export const getMyRecycleBinDocumentList = () => $axios.get('/inkwash/docs/myRecycleBin')
// 恢复文档
export const recoveryDocument = p => $axios.post('/inkwash/docs/recovery', p)
// 彻底删除文档
export const destroyDocument = p => $axios.post('/inkwash/docs/distory', p)
