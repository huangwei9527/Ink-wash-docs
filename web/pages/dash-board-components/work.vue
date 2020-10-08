<template>
  <div class="page-work">
    <!--头部-->
    <div class="dash-board-operator-wrapper">
      <newDocsBtn @command="newCommand" />
      <div class="pull-right">
        <sortIconBtn @command="sortCommand" :listType.sync="docsListType"/>
      </div>
    </div>
    <!--文档列表-->
    <el-scrollbar class="docs-list-wrapper scroll-wrapper">
      <template v-for="(docs, index) in docsList">
        <docsThumbnail
                :type="docs.type"
                :isList="docsListType === 'list'"
                :docsData="docs"
                @refresh="getData"
                :key="index"/>
      </template>
    </el-scrollbar>
  </div>
</template>

<script>
	import newDocsBtn from '@/components/new-docs-btn'
	import sortIconBtn from '@/components/sort-icon-btn'
	import docsThumbnail from '@/components/docs-thumbnail'
	import newFolder from '@/components/new-folder/index.js'
	import {
		Scrollbar
	} from 'element-ui'  
	export default {
		components: {
			[Scrollbar.name]: Scrollbar,
			newDocsBtn,
			sortIconBtn,
			docsThumbnail
		},
		data() {
			return {
				searchParams: {
					size: 30,
					page: 1,
					orderBy: '',
					keywords: ''
				},
				docsList: [],
				total: 0,
        docsListType: 'thumbnail'
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
				this.$API.getDocsList(this.searchParams).then(res => {
					this.docsList = res.body.data || [];
				})
			},
			/**
			 * 点击新增相关操作
			 */
			newCommand(command){
				switch(command){
					case 'new-docs':
						this.newDocs();
						break;
					case 'new-excel':
						this.newExcel();
						break;
					case 'new-folder':
						this.newFolder();
						break;
				}
			},
			/**新增文档 */
			newDocs(){
				this.$router.push({name: 'Edit', query: {type: 'docs'}})
			},
			/**新增excel */
			newExcel(){
				this.$router.push({name: 'Edit', query: {type: 'excel'}})
			},
			/**新增文件夹 */
			newFolder(){
				newFolder({}, () => {
					// 刷新列表
					this.getData();
        })
			},
			/**排序命令 */
			sortCommand(sortType){
				this.searchParams.orderBy = sortType || '';
				this.getData();
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-work{
  height: 100%;
  .docs-list-wrapper{
  	padding: 20px 0;
	  height: calc(100% - 36px);
  }
}
</style>
