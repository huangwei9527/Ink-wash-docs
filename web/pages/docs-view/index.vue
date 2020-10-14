<template>
  <div class="page docs-view">
    <div class="view-header">
      <pageHeader :fullWidth="true">
        <div class="document-title" v-if="['sheet'].includes(type)">{{documentData.title}}</div>
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
      </pageHeader>
    </div>
    <div class="view-body-wrapper">
      <docsView :document="documentData" :content="documentData.content" v-if="type==='docs'"></docsView>
      <sheetView :document="documentData" :content="documentData.content" v-if="type==='sheet'"></sheetView>
    </div>
  </div>
</template>

<script>
	import pageHeader from '@/components/page-header'
  import documentComBtn from '@/components/document-com-btn'
	export default {
		components: {
			pageHeader,
			documentComBtn,
			docsView: () => import('./components/docs'),
			sheetView: () => import('./components/sheet')
		},
		data() {
			return {
				loading: true,
				id: '',
				type: '',
				documentData: {}
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.type = this.$route.query.type;
			this.getData()
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
