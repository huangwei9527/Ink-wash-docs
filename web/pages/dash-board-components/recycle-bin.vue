<template>
  <div class="page-my-document">
    <div class="dash-board-operator-wrapper">
      <div class="dash-board-title">回收站</div>
    </div>
    <!--文档列表-->
    <div class="docs-list-wrapper scroll-wrapper">
      <ul class="docs-thumbnail-table-title" >
        <li class="docs-thumbnail-title">标题</li>
        <li class="docs-info-date">创建时间</li>
        <li class="docs-info-date">更新时间</li>
        <li class="docs-info-op">操作</li>
      </ul>
      <div class="list-wrapper" v-loading="loading">
        <template v-for="(docs, index) in docsList">
          <docsThumbnail
                  :type="docs.type"
                  docShowType="list"
                  :docsData="docs"
                  @open-folder="openFolder(docs)"
                  @refresh="getData"
                  :showAuthor="false"
                  :showCreateTime="true"
                  :btnList="['recovery', 'destroy']"
                  :canOpenDocs="false"
                  :key="index"/>
        </template>
        <noFunData v-if="noData"></noFunData>
      </div>
    </div>
  </div>
</template>

<script>
	import docsThumbnail from '@/components/docs-thumbnail'
	import noFunData from '@/components/notFundData'
	export default {
		components: {
			docsThumbnail,
			noFunData
		},
		data() {
			return {
				loading: false,
				noData: false,
				searchParams: {
					parentId: ''
				},
				docsList: []
			}
		},
		created() {
			this.getData();
		},
		methods: {
			/**
			 * 获取docs列表页面数据
			 */
			getData() {
				this.loading = true;
				this.$API.getMyRecycleBinDocumentList().then(res => {
					this.docsList = res.body || [];
					this.loading = false;
					if(!this.docsList.length){
						this.noData = true;
					}
				}).catch(() => {
					this.loading = false;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  .page-my-document{

  }
</style>
