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
        <el-dropdown split-button size="mini" type="primary" @click="saveDocument">
          保存
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>存为模板</el-dropdown-item>
            <el-dropdown-item>编辑锁定</el-dropdown-item>
            <el-dropdown-item>
              <span class="red">删除</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="editor-wrapper">
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
			docsEdit:  () => import('./components/docs-edit'),
			excelEdit:  () => import('./components/excel-edit'),
			axureEdit:  () => import('./components/axure-edit'),

		},
		data() {
			return {
				id: '',
				parentId: '',
				type: '',
				title: '',
				content: '',
				documentData: {}
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.parentId = this.$route.query.parentId;
			this.type = this.$route.query.type;

			// 记录路由历史纪录长度
			currentHistoryLength = window.history.length;
		},
		mounted() {
			if (this.id) {
				this.getData();
			}
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
				this.$API.getDocumentDetail({id: this.id}).then(res => {
					this.title = res.body.title || '';
					this.content = res.body.content || '';
					this.documentData = res.body;
				})
			},
			/**
			 * 保存文档
			 */
			saveDocument() {
				// 获取编辑器内容
				let content = this.$refs.edit.getContent();
				// 调接口保存
				this.$API.createDocument({
					id: this.id,
					parentId: this.parentId,
					title: this.title || '新建文档',
					content: content,
					type: this.type
				}).then(() => {
					this.goBack();
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
