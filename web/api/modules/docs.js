/**文档相关接口*/

import $axios from "@/service/httpServer";
// 获取文档列表
export const getDocsList = () => $axios.get('http://yapi.newhope.cn/mock/398/inkwash/dos/list');
