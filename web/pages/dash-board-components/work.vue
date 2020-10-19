<template>
  <div class="page-work">
    <!--头部-->
    <div class="dash-board-operator-wrapper">
      <div class="breadcrumb-wrapper">
        <el-breadcrumb separator="＞">
          <el-breadcrumb-item :to="{name: 'DashBoardWork'}">
            <span class="dash-board-title">工作台</span>
          </el-breadcrumb-item>
          <template v-for="(item, index) in breadcrumbData">
            <el-breadcrumb-item
                    v-if="(index + 1) !== breadcrumbData.length"
                    :to="{name: 'DashBoardWork', query: {folderId: item._id}}"
                    :key="index">
              {{item.title}}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-else :key="index">{{item.title}}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
      <div class="right-wrapper">
        <newDocsBtn @command="newCommand"/>
        <span class="cut-line"></span>
        <sortIconBtn/>
      </div>
    </div>
    <!--文档列表-->
    <div class="docs-list-wrapper scroll-wrapper">
      <ul class="docs-thumbnail-table-title" v-if="docShowType === 'list'">
        <li class="docs-thumbnail-title">标题</li>
        <li class="docs-info-author">创建者</li>
        <li class="docs-info-date">更新时间</li>
        <li class="docs-info-op">操作</li>
      </ul>
      <div class="list-wrapper" v-loading="loading">
        <template v-for="(docs, index) in docsList_sorted">
          <docsThumbnail
                  :type="docs.type"
                  :docShowType="docShowType"
                  :docsData="docs"
                  @open-folder="openFolder(docs)"
                  @refresh="getData"
                  :btnList="btnList(docs)"
                  :key="index"/>
        </template>
        <noFunData v-if="noData"></noFunData>
      </div>
    </div>
  </div>
</template>

<script>
	import {mapState} from 'vuex'
	import newDocsBtn from '@/components/new-docs-btn'
	import sortIconBtn from '@/components/sort-icon-btn'
	import docsThumbnail from '@/components/docs-thumbnail'
	import newFolder from '@/components/new-folder/index.js'
	import noFunData from '@/components/notFundData'
	import {
		Breadcrumb,
		BreadcrumbItem
	} from 'element-ui'

	export default {
		components: {
			[Breadcrumb.name]: Breadcrumb,
			[BreadcrumbItem.name]: BreadcrumbItem,
			newDocsBtn,
			sortIconBtn,
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
				docsList: [],
				docsList_sorted: [], // 按照排序规则重新计算一个列表
				breadcrumbData: []
			}
		},
		computed: {
			...mapState({
				sortType: state => state.sortType,
				docShowType: state => state.docShowType,
				isFolderTop: state => state.isFolderTop,
			})
		},
		watch: {
			sortType() {
				this.docsList_sorted = this.$mUtils.resort([...this.docsList], this.sortType, this.isFolderTop);
			},
			isFolderTop() {
				this.docsList_sorted = this.$mUtils.resort([...this.docsList], this.sortType, this.isFolderTop);
			}
		},
		created() {
			this.searchParams.parentId = this.$route.query.folderId || '';
			this.getData();
			if (this.searchParams.parentId) {
				this.getPathData(this.searchParams.parentId)
			}
		},
		beforeRouteUpdate(to, from, next) {
			this.searchParams.parentId = to.query.folderId || '';
			if (this.searchParams.parentId) {
				this.getPathData(this.searchParams.parentId)
			} else {
				this.breadcrumbData = [];
			}
			this.getData();
			next();
		},
		methods: {
			/**
			 * 根据文档信息展示哪些按钮
			 * */
			btnList(docsData) {
				let all = ['openBlank', 'copyUrl'];
				if (docsData.isAuthor) {
					all.push('shareSetting', 'cooperation', 'delete', 'reName')
				}
				if (docsData.isEditor) {
					all.push('edit')
				}
				return all;
			},
			/**
			 * 获取docs列表页面数据
			 */
			getData() {
				this.loading = true;
				this.$API.getDocsList(this.searchParams).then(res => {
					this.docsList = res.body || [];
					this.docsList_sorted = this.$mUtils.resort([...this.docsList], this.sortType, this.isFolderTop);
					this.loading = false;
					if (!this.docsList.length) {
						this.noData = true;
					}
				}).catch(() => {
					this.loading = false;
				})
			},
			/**
			 * 获取路径数 用于拼接面包屑
			 */
			getPathData(id) {
				this.$API.getDocumentPathById({id}).then(res => {
					this.breadcrumbData = [...res.body || []];
				})
			},
			/**
			 * 点击新增相关操作
			 */
			newCommand(command) {
				switch (command) {
					case 'new-docs':
						this.newDocs();
						break;
					case 'new-sheet':
						this.newExcel();
						break;
					case 'new-folder':
						this.newFolder();
						break;
					case 'new-axure':
						this.newAxure();
						break;
				}
			},
			/**新增文档 */
			newDocs() {
				this.$router.push({name: 'Edit', query: {type: 'docs', parentId: this.searchParams.parentId}})
			},
			/**新增excel */
			newExcel() {
				this.$router.push({name: 'Edit', query: {type: 'sheet', parentId: this.searchParams.parentId}})
			},
			/**新增axure */
			newAxure() {
				this.$router.push({name: 'Edit', query: {type: 'axure', parentId: this.searchParams.parentId}})
			},
			/**新增文件夹 */
			newFolder() {
				newFolder({parentId: this.searchParams.parentId}, () => {
					// 刷新列表
					this.getData();
				})
			},
			/**
			 * 打开文件夹
			 * @param doc
			 */
			openFolder(doc) {
				this.$router.push({name: 'DashBoardWork', query: {...this.$route.query, folderId: doc._id}})
			}
		}
	}
</script>

<style lang="scss" scoped>
  .page-work {
    height: 100%;
    .docs-list-wrapper {
      padding: 20px 0;
      height: calc(100% - 36px);
    }
  }

  .cut-line {
    display: inline-block;
    vertical-align: middle;
    height: 18px;
    border-right: 2px solid #ddd;
    margin: 0 20px;
  }

  .dash-board-operator-wrapper {
    display: flex;
    line-height: 30px;
    .breadcrumb-wrapper {
      flex: 1;
      padding-top: 10px;
    }
    .right-wrapper {
      width: 200px;
      text-align: right;
    }
  }
</style>
