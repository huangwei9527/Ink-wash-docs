## 前言
团队中会遇到在线文档管理的需求，包括技术文档，接口文档，excel文档，和产品原型的托管等需求，一直没有找到合适的开源项目来满足需求，所以动手实现了个文档管理系统（实现起来并不复杂，该教程只是提供思路，并非最佳实践）

Github: [传送门](https://github.com/huangwei9527/Ink-wash-docs)<br/>
演示地址：[传送门](http://47.104.247.183:7001)<br/>
掘金文章：[传送门](https://juejin.im/post/6886735919697788941)

## 功能列表
* [x] 登录注册
* [x] 工作台|文档列表
* [x] 文档编辑预览（支持：md， excel，html产品原型托管）
* [x] 协作编辑
* [x] 访问权限设置
* [x] 团队管理
* [x] 点赞收藏
* [x] 模板管理
* [x] 浏览历史
* [x] 回收站
* [ ] 文件夹形式阅读（接口文档）
* [ ] 编辑历史版本


## 系统界面预览
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ed9c1e870e54da290344ab480ecf587~tplv-k3u1fbpfcp-watermark.image)


## 工程目录结构

```
|-- app					--------服务器端项目代码
    |--controller				--------用于解析用户的输入，处理后返回相应的结果
    |--extend					--------框架的扩展
    |--middleware				--------编写中间件
    |--model					--------Schema数据模型
    |--public					--------用于放置静态资源
    |--service					--------用于编写业务逻辑层
    |--router.js				--------用于配置 URL 路由规则
|-- config					--------egg 配置文件
    |--config.default.js			--------默认配置
    |--config.local.js				--------开发环境配置
    |--config.prod.js				--------生产环境配置
    |--plugin.js					--------配置需要加载的插件
|-- web						--------前端项目界面代码
    |--common					--------前端界面对应静态资源
    |--components				--------组件
    |--config					--------配置文件
    |--filter					--------过滤器
    |--pages					--------页面
    |--router					--------路由配置
    |--store					--------vuex状态管理
    |--service					--------axios封装
    |--App.vue					--------App
    |--main.js					--------入口文件
    |--permission.js			--------权限控制
|-- docs					--------预留编写项目文档目录
|-- vue.config.js			--------vue webpack配置文件
|-- package.json
...
...
```
## 本地开发
```
// 启动后端服务
npm run dev
// 启动前端项目
npm run build
```
## 本地部署
先build个前端版本，然后再部署egg服务到本地

### License
Apache License 2.0

## 建个微信群如果遇到问题可以一起交流
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b493029c7ce4ac2adc0806aa4f7b812~tplv-k3u1fbpfcp-watermark.image)

