<template>
  <div class="page page-editor">
    <div class="editor-header-wrapper">
      <div class="editor-header-back">
        <el-button size="mini" @click="goBack" type="info">
          <i class="el-icon-d-arrow-left"></i>
          &nbsp;&nbsp;返回
        </el-button>
      </div>
      <div class="editor-header-docs-title">
        <el-input
                type="text"
                class="editor-header-docs-title-input"
                placeholder="请输入标题"
                v-model="title"
                maxlength="18"
                show-word-limit
        />
      </div>
      <div class="editor-header-operation text-right">
        <el-dropdown class="marginR15" v-if="templateList.length && ['docs', 'sheet'].includes(type)">
          <el-button size="mini">我的模板<i class="el-icon-arrow-down"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in templateList" :key="index">
              <div class="" @click="insertTemplate(item)">{{item.title}}</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown split-button size="mini" type="primary" @click="saveDocument">
          保存
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="['docs', 'sheet'].includes(type)">
              <div class="" @click="saveAsTemplate">存为模板</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="editor-wrapper" v-loading="loading">
      <template v-if="type === 'docs'">
        <docsEdit :content="content" ref="edit"/>
      </template>
      <template v-if="type === 'sheet'">
        <excelEdit :content="content" ref="edit"/>
      </template>
      <template v-if="type === 'axure'">
        <axureEdit :content="content" ref="edit"/>
      </template>
    </div>
  </div>
</template>

<script>
	import {
		Dropdown,
		DropdownMenu,
		DropdownItem,
		Button,
		ButtonGroup,
		Input
	} from 'element-ui'

	// 全局变量纪录上一个页面路由信息
	let currentHistoryLength = 0;
	export default {
		components: {
			[ButtonGroup.name]: ButtonGroup,
			[Button.name]: Button,
			[Input.name]: Input,
			[Dropdown.name]: Dropdown,
			[DropdownMenu.name]: DropdownMenu,
			[DropdownItem.name]: DropdownItem,
			docsEdit: () => import('./components/docs-edit'),
			excelEdit: () => import('./components/excel-edit'),
			axureEdit: () => import('./components/axure-edit'),

		},
		data() {
			return {
				loading: false,
				id: '',
				parentId: '',
				type: '',
				title: '',
				content: '',
				documentData: {},
				templateList: []
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.isTemplate = this.$route.query.isTemplate;
			this.parentId = this.$route.query.parentId;
			this.type = this.$route.query.type;

			// 记录路由历史纪录长度
			currentHistoryLength = window.history.length;
		},
		mounted() {
			if (this.id) {
				this.getData();
			}
			this.getMyTemplateList();
		},
		methods: {
			/**
			 * 兼容里面有iframe时的返回
			 */
			goBack() {
				window.history.go((currentHistoryLength - window.history.length) + (-1))
			},
			/**
			 * 获取文档信息
			 */
			getData() {
				this.loading = true;
				this.$API.getDocumentDetail({id: this.id}).then(res => {
					this.loading = false;
					this.title = res.body.document.title || '';
					this.content = res.body.document.content || '';
					this.documentData = res.body.document;
				}).catch(() => {
					this.loading = false;
				})
			},
			/**
			 * 保存文档
			 */
			saveDocument() {
				this.loading = true;
				// 获取编辑器内容
				let content = this.$refs.edit.getContent();
				// 调接口保存
				this.$API.createDocument({
					id: this.id,
					parentId: this.parentId,
					title: this.title || '新建文档',
					content: content,
					type: this.type,
					isTemplate: this.isTemplate
				}).then(() => {
					this.loading = false;
					this.goBack();
				}).catch(() => {
					this.loading = false;
				})
			},
			saveAsTemplate() {
				this.isTemplate = true;
				this.saveDocument();
			},
			getMyTemplateList() {
				this.$API.getMyTemplate({type: this.type}).then(res => {
					this.templateList = res.body || [];
				})
			},
			insertTemplate(item) {
				this.loading = true;
				let edit = this.$refs.edit
				// 获取文档详情
				this.$API.getDocumentDetail({id: item._id}).then(res => {
					this.loading = false;
					if (edit.insertContent) {
						edit.insertContent(res.body.document.content);
					}
				}).catch(() => {
					this.loading = false;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  .page-editor {
    height: 100%;
  }

  .editor-header-wrapper {
    position: relative;
    background: linear-gradient(180deg, #fdfdfd, #fff);
    z-index: 110;
    height: 50px;
    box-shadow: 0 2px 3px 0 rgba(100, 100, 100, 0.15);
    user-select: none;
    min-width: 1280px;
    overflow: hidden;
    border-bottom: 1px solid #fff;
    display: flex;
    padding: 0 16px;
    .editor-header-back {
      width: 220px;
      padding-top: 8px;
    }
    .editor-header-docs-title {
      flex: 1;
      text-align: center;
    }
    .editor-header-operation {
      width: 220px;
      padding-top: 8px;
    }
  }

  .editor-wrapper {
    height: calc(100% - 81px);
  }

  .editor-header-docs-title-input {
    max-width: 680px;
  }
</style>
<style lang="scss">
  .editor-header-docs-title-input {
    .el-input__inner {
      text-align: center;
      font-size: 14px;
      font-weight: 700;
      line-height: 14px;
      border: 1px solid transparent;
      border-bottom: 1px solid #DCDFE6;
    }
    .el-input.is-active, .el-input__inner:focus {
      border-color: transparent;
      border-bottom-color: #ddd;
    }
  }
</style>
