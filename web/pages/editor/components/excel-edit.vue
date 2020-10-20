<template>
  <div class="excel-edit-component-wrapper">
    <div class="excel-edit" id="excel-edit"></div>
  </div>
</template>

<script>
	import Spreadsheet from "x-data-spreadsheet";
	import zhCN from 'x-data-spreadsheet/dist/locale/zh-cn';

	let timer = null;
	export default {
		props: {
			content: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				editor: null,
				editorHasReady: false,
        editorContent: ''
			}
		},
		created() {

		},
		mounted() {
			this.initEditor();
		},
		methods: {
			initEditor() {
				let options = {
					showToolbar: true,
					showGrid: true,
					showContextmenu: true,
					view: {
						height: () => document.documentElement.clientHeight - 71,
						width: () => document.documentElement.clientWidth,
					},
					row: {
						len: 100,
						height: 25,
					},
					col: {
						len: 26,
						width: 100,
						indexWidth: 60,
						minWidth: 60,
					},
					style: {
						bgcolor: '#ffffff',
						align: 'left',
						valign: 'middle',
						textwrap: false,
						strike: false,
						underline: false,
						color: '#0a0a0a',
						font: {
							name: 'Helvetica',
							size: 10,
							bold: false,
							italic: false,
						},
					}
				};
				Spreadsheet.locale('zh-cn', zhCN);
				this.editor = new Spreadsheet(document.getElementById('excel-edit'), options)
				this.editor.validate()
        this.editor.setContent(this.content);
			},
			/**
			 * 获取编辑器内容
			 * @returns {string}
			 */
			getContent() { // 获取内容方法
				const content = this.editor.getData();
				return JSON.stringify(content);
			},
			/**
			 * 设置编辑器内容
			 * @param Msg
			 */
			setContent(dataStr) {
				try {
          dataStr = JSON.parse(dataStr)
				}catch (e) {
					console.log(e)
				}
				this.editor.loadData(dataStr);
			},
			/**
			 * 插入内容 表格插入内容设置为重置整个表单
			 * @param mdStr
			 */
			insertContent(mdStr) {
				if (this.editor) {
					this.setContent(mdStr);
				}
			},
			destroy() {
				this.editor.destroy();
				this.editor = undefined;
			}
		},
		destroyed() {
			if (this.editorHasReady && this.editor) {
				this.editor.destroy();
			}
			if (timer) {
				clearInterval(timer)
			}
		}
	}
</script>

<style lang="scss" scoped>
  .excel-edit-component-wrapper {
    height: 100%;
    .excel-edit {
      height: 100%;
    }
  }
</style>
