<template>
  <div class="components-docs-thumbnail" :class="{'is-list': docShowType==='list'}">
    <ul class="docs-thumbnail">
      <li class="docs-thumbnail-image" @click="open">
        <img :src="getDocsIconImage(docsData.type)" alt="">
      </li>
      <li class="docs-thumbnail-title" @click="open">
        <p :title="docsData.title">{{docsData.title}}</p>
      </li>
      <li class="docs-info-author show-list" v-if="showAuthor">{{docsData.author.name}}</li>
      <li class="docs-info-date show-list" v-if="showCreateTime">{{docsData.created | formatTime('yyyy-MM-dd')}}</li>
      <li class="docs-info-date show-list" v-if="showUpdateTime">{{docsData.updated | formatTime('yyyy-MM-dd')}}</li>
      <!--操作按钮-->
      <li class="docs-info-operation-btn" v-if="showOperator">
        <el-dropdown @command="command">
          <i class="font-p-color el-icon-setting"/>
          <el-dropdown-menu>
            <template v-for="(item, index) in operationDataList">
              <el-dropdown-item
                      :key="index"
                      :command="item.eventType"
                      v-if="isShow(item) && btnList.includes(item.eventType)"
              >
                <div :class="item.extraClassName">
                  {{item.title}}
                </div>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
	let imgDoc = require('@/common/images/docs.png')
	let imgExcel = require('@/common/images/excel.png')
	let imgF = require('@/common/images/f.png')
	let imgAxure = require('@/common/images/axure.png')
	import newFolder from '@/components/new-folder/index.js'
	import addCooperationer from '@/components/add-cooperationer/index.js'
	import shareSetting from '@/components/share-setting/index.js'
	import {
		Dropdown,
		DropdownMenu,
		DropdownItem,
	} from 'element-ui'

	export default {
		name: "docs-thumbnail",
		props: {
			docShowType: {
				type: String,
				default: 'thumbnail'
			},
			docsData: {
				type: Object,
				default: () => {
				}
			},
      canOpenDocs: {
				type: Boolean,
        default: true
      },
			showCreateTime: Boolean,
			showUpdateTime: {
				type: Boolean,
				default: true
			},
			showAuthor: {
				type: Boolean,
				default: true
			},
			showOperator: {
				type: Boolean,
				default: true
			},
			// 操作按钮显示哪些按钮  根据type来匹配。
			btnList: {
				type: Array,
				default: () => {
					return ['openBlank', 'copyUrl']
				}
			}
		},
		components: {
			[Dropdown.name]: Dropdown,
			[DropdownMenu.name]: DropdownMenu,
			[DropdownItem.name]: DropdownItem
		},
		data() {
			return {
				operationDataList: [{
					title: '编辑',
					eventType: 'edit',
					hideAsFolder: true,
					extraClassName: '',
					iconClass: ''
				}, {
					title: '重命名',
					eventType: 'reName',
					showAsFolder: true,
					iconClass: ''
				}, {
					title: '新标签打开',
					eventType: 'openBlank',
					iconClass: ''
				}, {
					title: '复制链接',
					eventType: 'copyUrl',
					iconClass: ''
				}, {
					title: '访问设置',
					eventType: 'shareSetting',
					iconClass: ''
				}, {
					title: '协作设置',
					eventType: 'cooperation',
					iconClass: ''
				}, {
					title: '删除',
					eventType: 'delete',
					extraClassName: 'error',
					iconClass: ''
				}, {
					title: '取消收藏',
					eventType: 'unCollect',
					extraClassName: 'error',
					iconClass: ''
				}, {
					title: '退出协作',
					eventType: 'unCooperation',
					extraClassName: 'error',
					iconClass: ''
				}, {
					title: '恢复文件',
					eventType: 'recovery',
					iconClass: ''
				}, {
					title: '彻底删除',
					eventType: 'destroy',
					extraClassName: 'error',
					iconClass: ''
				}]
			}
		},
		methods: {
			/**
			 * 根据showAsFolder和hideAsFolder来判断是否显示按钮
			 */
			isShow(item) {
				let type = this.docsData.type;
				if (type !== 'folder' && !item.showAsFolder) {
					return true;
				}
				if (type === 'folder' && item.showAsFolder) {
					return true;
				}
				if (type === 'folder' && !item.hideAsFolder) {
					return true;
				}
				return false;
			},
			/**
			 * 根据文档type获取文档icon的classname
			 * @param type
			 * @returns {string}
			 */
			getDocsIconImage(type) {
				let map = {
					folder: imgF,
					docs: imgDoc,
					sheet: imgExcel,
					axure: imgAxure
				}
				return map[type] ? map[type] : imgDoc
			},
			/**
			 * 操作命令
			 * @param type
			 */
			command(type) {
				switch (type) {
					case 'edit':
						this.edit();
						break;
					case 'reName':
						this.reName();
						break;
					case 'openBlank':
						this.openBlank();
						break;
					case 'shareSetting':
						this.shareSetting();
						break;
					case 'cooperation':
						this.cooperation();
						break;
					case 'delete':
						this.delete();
						break;
					case 'copyUrl':
						this.copyUrl();
						break;
					case 'unCollect':
						this.unCollect();
						break;
					case 'recovery':
						this.recovery();
						break;
					case 'destroy':
						this.destroy();
						break;
					case 'unCooperation':
						this.unCooperation();
						break;
				}
			},
			open() {
				if (!this.canOpenDocs) {
					return;
				}

				// 打开文件夹
				if (this.docsData.type === 'folder') {
					this.$emit('open-folder', this.docsData)
					return;
				}
				// 打开文档
				this.$router.push({name: 'DocsView', query: {type: this.docsData.type, id: this.docsData._id}})
			},
			// 新标签打开
			openBlank() {
				window.open(this.getUrl(this.docsData.type, this.docsData._id), '_blank')
			},
			edit() {
				this.$router.push({name: 'Edit', query: {type: this.docsData.type, id: this.docsData._id}})
			},
			reName() {
				newFolder(this.docsData, () => {
					this.$emit('refresh')
				})
			},
			delete() {
				this.$alert('确认删除文件？删除后，将无法访问此文件?', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.$API.delDocument({id: this.docsData._id}).then(() => {
						this.$message.success('删除成功！');
						this.$emit('refresh')
					})
				})
			},
			copyUrl() {
				this.$mUtils.copyText(this.getUrl(this.docsData.type, this.docsData._id));
				this.$message.info('已复制到剪切板');
			},
			// 取消收藏
			unCollect() {
				this.$alert('确认取消收藏', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.$API.collectDocument({id: this.docsData._id, status: false}).then(() => {
						this.$emit('refresh')
					})
				})
			},
			// 恢复文档
			recovery() {
				this.$alert('确认恢复文档，恢复后原有协作者将继续有权限编辑！', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.$API.recoveryDocument({id: this.docsData._id}).then(() => {
						this.$emit('refresh')
					})
				})
			},
			// 彻底删除
			destroy() {
				this.$alert('删除后将无法找回！', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.$API.destroyDocument({id: this.docsData._id}).then(() => {
						this.$emit('refresh')
					})
				})
			},
			unCooperation() {
				this.$alert('确认退出协同编辑？', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
					this.$API.removeCooperationUser({
						userId: this.$store.state.user.userInfo._id,
						documentId: this.docsData._id
					}).then(() => {
						this.$emit('refresh')
					})
				})
			},
			getUrl(type, id) {
				if (type !== 'folder') {
					return window.location.origin + `/#/docs?type=${type}&id=${id}`;
				}
				let hash = window.location.hash
				let query = this.$mUtils.getQueryStringArgs() || {};
				hash = hash.includes('?') ? hash : hash.split('?')[0];
				let queryStr = this.$mUtils.makeQuery({...query, folderId: id})
				return window.location.origin + `/${hash}${queryStr}`
			},
			cooperation() {
				addCooperationer(this.docsData._id)
			},
			shareSetting() {
				shareSetting(this.docsData._id)
			}
		}
	}
</script>

<style lang="scss" scoped>
  .components-docs-thumbnail {
    height: 154px;
    width: 144px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    .docs-thumbnail {
      display: flex;
      position: relative;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      flex-direction: column;
      margin: 0 10px 15px;
      width: 122px;
      height: 137px;
      /*border: 1px solid #eee;*/
      &:hover {
        border: 1px solid #e5e5e5;
        border-radius: 2px;
        background-color: #f3f3f3;
        .docs-info-operation-btn {
          display: inline-block;
        }
      }
      .docs-thumbnail-image {
        width: 92px;
        height: 80px;
        margin: 18px auto 2px;
        position: relative;
        display: flex;
        align-items: center;
        text-align: center;
        img {
          display: inline-block;
          width: 80px;
          height: 80px;
        }
      }
      .docs-thumbnail-title {
        height: 40px;
        max-width: 116px;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        p {
          font-size: 13px;
          color: #555;
          flex: 1 1 auto;
        }
      }
    }
    .docs-info-operation-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      display: none;
    }
    .show-list {
      display: none;
    }

  }

  .components-docs-thumbnail.is-list {
    width: 100%;
    height: 48px;
    line-height: 48px;
    .show-list {
      display: block;
    }
    .docs-thumbnail {
      width: 100%;
      height: 48px;
      display: flex;
      flex-direction: row;
      margin: 0;
      border: none;
      border-bottom: 1px solid #e5e5e5;
      &:hover {
        border: none;
        border-bottom: 1px solid #e5e5e5;
        border-radius: 0;
      }
      .docs-thumbnail-image {
        width: 30px;
        height: 30px;
        margin: 0;
        display: inline-block;
        margin-right: 16px;
        img {
          display: inline-block;
          width: 30px;
          height: 30px;
        }
      }
      .docs-thumbnail-title {
        height: 30px;
        line-height: 30px;
        max-width: none;
        flex: 1;
        font-size: 16px;
        text-align: left;
        p {
          font-size: inherit;
        }
      }
      .docs-info-author {
        width: 180px;
      }
      .docs-info-date {
        width: 180px;
      }
      .docs-info-operation-btn {
        width: 120px;
        text-align: center;
        position: relative;
        left: auto;
        top: auto;
        display: inline-block;
      }
    }
  }

  .font-p-color {
    color: #999;
  }
</style>
