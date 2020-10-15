<template>
  <div class="page docs-view">
    <div class="view-header">
      <pageHeader :fullWidth="true">
        <div class="document-title" v-if="['sheet', 'axure'].includes(type)">{{documentData.title}}</div>
        <div class="inline-block" slot="right-slot">
          <div class="docs-operation inline-block">
            <documentComBtn
                    @starCount="starCountChange"
                    :documentId="documentData._id"
                    :star="documentData.starStatus"
                    :collect="documentData.collectStatus" />
            <span class="cut-line"></span>
          </div>
        </div>
        <div class="inline-block" slot="left-slot">
          <!--axure文档预览需要返回按钮实现返回到上一页-->
          <div class="paddingL30" v-if="['axure'].includes(type)">
            <el-button  size="mini"  icon="el-icon-arrow-left" @click="routerGoBack">返回</el-button>
          </div>
        </div>
      </pageHeader>
    </div>
    <div class="view-body-wrapper">
      <docsView :document="documentData" :content="documentData.content" v-if="type==='docs'"></docsView>
      <sheetView :document="documentData" :content="documentData.content" v-if="type==='sheet'"></sheetView>
      <axureView :document="documentData" :content="documentData.content" v-if="type==='axure'"></axureView>
    </div>
  </div>
</template>

<script>
	import pageHeader from '@/components/page-header'
  import documentComBtn from '@/components/document-com-btn'
  import {
		Button
  } from 'element-ui'
  // 全局变量纪录上一个页面路由信息
  let currentHistoryLength = 0;
	export default {
		components: {
			pageHeader,
			documentComBtn,
      [Button.name]: Button,
			docsView: () => import('./components/docs'),
			sheetView: () => import('./components/sheet'),
			axureView: () => import('./components/axure')
		},
		data() {
			return {
				loading: true,
				id: '',
				type: '',
				documentData: {},
        fromRoute: {}, // 纪录上级路由，用于返回操作
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.type = this.$route.query.type;
			this.getData()

      // 记录路由历史纪录长度
			currentHistoryLength = window.history.length;
		},
		methods: {
			/**
			 * 获取文档信息
			 */
			getData() {
				this.loading = true;
				this.$API.getDocumentDetail({id: this.id, isVisit: true}).then(res => {
					this.documentData = res.body;
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				})
			},
			/**
       * 点赞后更新点赞数量
			 * @param num
			 */
			starCountChange(num){
				this.documentData.star_count = this.documentData.star_count + num;
      },
			/**
       * 兼容里面有iframe时的返回
			 */
			routerGoBack(){
        window.history.go((currentHistoryLength - window.history.length) + (-1))
      }
		}
	}
</script>

<style lang="scss" scoped>
.docs-view{
  height: 100%;
  position: relative;
  padding-top: 50px;
  .view-header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 48px;
    z-index: 100;
  }
  .view-body-wrapper{
    height: 100%;
    overflow-y: auto;
  }
}
.cut-line{
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  border-right: 2px solid #eee;
  margin: 0 16px;
}
.document-title{
  line-height: 48px;
  font-size: 16px;
  font-weight: 600;
}
</style>
