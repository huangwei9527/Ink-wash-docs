<template>
  <div class="components-docs-thumbnail" :class="{'is-list': isList}">
    <ul class="docs-thumbnail">
      <li class="docs-thumbnail-image" @click="open">
        <img :src="getDocsIconImage(docsData.type)" alt="">
      </li>
      <li class="docs-thumbnail-title" @click="open">
        <p :title="docsData.title">{{docsData.title}}</p>
      </li>
      <li class="docs-info-author show-list">{{docsData.author}}</li>
      <li class="docs-info-date show-list">{{docsData.updateDate}}</li>
      <!--操作按钮-->
      <li class="docs-info-operation-btn">
        <el-dropdown @command="command">
          <i class="font-p-color el-icon-setting"/>
          <el-dropdown-menu>
            <el-dropdown-item
                    v-for="(item, index) in operationDataList"
                    :key="index"
                    :command="item.eventType"
            >{{item.title}}
            </el-dropdown-item>
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
	import newFolder from '@/components/new-folder/index.js'
	import {
		Dropdown,
		DropdownMenu,
		DropdownItem,
	} from 'element-ui'

	export default {
		name: "docs-thumbnail",
		props: {
			isList: Boolean,
			docsData: {
				type: Object,
				default: () => {
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
					title: '打开',
					eventType: 'open',
					iconClass: ''
				}, {
					title: '重命名',
					eventType: 'reName',
					iconClass: ''
				}, {
					title: '复制链接',
					eventType: 'copyUrl',
					iconClass: ''
				}, {
					title: '分享设置',
					eventType: 'shareSetting',
					iconClass: ''
				}, {
					title: '协作设置',
					eventType: 'cooperation',
					iconClass: ''
				}, {
					title: '删除',
					eventType: 'delete',
					iconClass: ''
				}]
			}
		},
		methods: {
			/**
			 * 根据文档type获取文档icon的classname
			 * @param type
			 * @returns {string}
			 */
			getDocsIconImage(type) {
				let map = {
					folder: imgF,
					docs: imgDoc,
					excel: imgExcel
				}
				return map[type] ? map[type] : imgDoc
			},
			/**
       * 操作命令
			 * @param type
			 */
			command(type){
				switch(type) {
					case 'open':
						this.open();
						break;
					case 'reName':
						this.reName();
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
				}
			},
			open(){
        this.$router.push({name: 'DocsView', query: {id: this.docsData.id}})
      },
			reName(){
				newFolder(this.docsData, res => {
          this.docsData.title = res.title;
        })
      },
			delete(){
				this.$emit('refresh')
      },
			copyUrl(){
        this.$mUtils.copyText(this.docsData.url);
        this.$message.info('已复制到剪切板');
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
    .docs-thumbnail{
      width: 100%;
      height: 48px;
      display: flex;
      flex-direction: row;
      border: none;
      border-bottom: 1px solid #e5e5e5;
      &:hover{
        border: none;
        border-bottom: 1px solid #e5e5e5;
        border-radius: 0;
      }
      .docs-thumbnail-image{
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
      .docs-thumbnail-title{
        height: 30px;
        line-height: 30px;
        max-width: none;
        flex: 1;
        font-size: 16px;
        text-align: left;
      }
      .docs-info-author{
        width: 180px;
      }
      .docs-info-date{
        width: 180px;
      }
      .docs-info-operation-btn{
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
