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
// 按小组添加协作人
export const addCooperationUser = p => $axios.post('/inkwash/docs/addCooperation/userIds', p)
// 按userIds添加协作人
export const addCooperationUserByGroup = p => $axios.post('/inkwash/docs/addCooperation/groupId', p)
// 获取协作人列表
export const getCooperationUserListByDocumentId = p => $axios.get('/inkwash/docs/getCooperation/userList', p)
// 删除协作人
export const removeCooperationUser = p => $axios.post('/inkwash/delCooperation/user', p)

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

/**
 * 上传axure压缩包
 */
export const docsUplaodAxure = p => $axios.post('/inkwash/docs/axure/upload', p)

/**
 * 设置访问方式
 */
export const getMembersByDocumentId = p => $axios.get('/inkwash/docs/getDocMembers', p)
export const setDocumentVisitTeam = p => $axios.post('/inkwash/docs/visit/setAsTeam', p)
export const setDocumentOpen = p => $axios.post('/inkwash/docs/visit/setAsOpen', p)
export const setDocumentPrivate = p => $axios.post('/inkwash/docs/visit/setAsPrivate', p)
export const documentCheckPass = p => $axios.post('/inkwash/docs/checkPass', p)

/**
 * 我的模板
 */
export const getMyTemplate = p => $axios.get('/inkwash/docs/myTemplate', p);
