<template>
  <div class="editor-component editor-md" ref="editor-component">
    <div id="editor-md-dom"></div>
  </div>
</template>

<script>
	import Vditor from 'vditor'
	import "vditor/src/assets/scss/index.scss"

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
			}
		},
		created() {

		},
		mounted() {
			this.initEditor();
		},
		watch: {
			content(val) {
				this.setContent(val);
			}
		},
		methods: {
			/**
			 * 初始化编辑器
			 */
			initEditor() {
				let that = this;
				let editorHeight = this.$refs['editor-component'].offsetHeight;
				const options = {
					width: '100%',
					height: editorHeight || 600,
					tab: '\t',
					counter: '999999',
					typewriterMode: true,
					mode: 'sv',
					preview: {
						delay: 100
					},
					outline: true,
					toolbar: [{
						hotkey: "⌘-E",
						name: "emoji",
						tipPosition: "ne",
					}, {
						hotkey: "⌘-H",
						name: "headings",
						tipPosition: "ne",
					}, {
						hotkey: "⌘-B",
						name: "bold",
						prefix: "**",
						suffix: "**",
						tipPosition: "ne",
					}, {
						hotkey: "⌘-I",
						name: "italic",
						prefix: "*",
						suffix: "*",
						tipPosition: "ne",
					}, {
						hotkey: "⌘-S",
						name: "strike",
						prefix: "~~",
						suffix: "~~",
						tipPosition: "ne",
					}, {
						hotkey: "⌘-K",
						name: "link",
						prefix: "[",
						suffix: "](https://)",
						tipPosition: "n",
					}, {
						name: "|",
					}, {
						hotkey: "⌘-L",
						name: "list",
						prefix: "* ",
						tipPosition: "n",
					}, {
						hotkey: "⌘-O",
						name: "ordered-list",
						prefix: "1. ",
						tipPosition: "n",
					}, {
						hotkey: "⌘-J",
						name: "check",
						prefix: "* [ ] ",
						tipPosition: "n",
					}, {
						name: "|",
					}, {
						hotkey: "⌘-;",
						name: "quote",
						prefix: "> ",
						tipPosition: "n",
					}, {
						hotkey: "⌘-⇧-D",
						name: "line",
						prefix: "---",
						tipPosition: "n",
					}, {
						hotkey: "⌘-U",
						name: "code",
						prefix: "```\n",
						suffix: "\n```",
						tipPosition: "n",
					}, {
						hotkey: "⌘-G",
						name: "inline-code",
						prefix: "`",
						suffix: "`",
						tipPosition: "n",
					}, {
						name: "|",
					}, {
						hotkey: "⌘-⇧-U",
						name: "upload",
						tipPosition: "n",
					}, {
						hotkey: "⌘-M",
						name: "table",
						prefix: "| col1",
						suffix: " | col2 | col3 |\n| --- | --- | --- |\n|  |  |  |\n|  |  |  |",
						tipPosition: "n",
					}, {
						name: "|",
					}, {
						hotkey: "⌘-Z",
						name: "undo",
						tipPosition: "n",
					}, {
						hotkey: "⌘-Y",
						name: "redo",
						tipPosition: "n",
					}, {
						name: "|",
					}, {
						hotkey: "⌘-⇧-M",
						name: "edit-mode",
						tipPosition: "nw",
					}, {
						hotkey: "⌘-P",
						name: "both",
						tipPosition: "nw",
					}, {
						hotkey: "⌘-⇧-P",
						name: "preview",
						tipPosition: "nw",
					}, {
						name: "|",
					}, {
						name: "outline",
						tipPosition: "nw",
					}, {
						name: "export",
						tipPosition: "nw",
					}],
					after: () => {
						that.editorHasReady = true;
						that.setContent(that.content)
					}
				}
				this.editor = new Vditor('editor-md-dom', options)
				this.editor.focus()

			},
			/**
			 * 获取编辑器内容
			 * @returns {string}
			 */
			getContent() { // 获取内容方法
				const content = this.editor.getValue();
				return content;
			},
			/**
			 * 设置编辑器内容
			 * @param Msg
			 */
			setContent(mdStr) {
				if (!this.editorHasReady) {
					timer = setInterval(() => {
						this.editor.setValue(mdStr);
						clearInterval(timer);
					}, 50);
					return;
				}
				this.editor.setValue(mdStr);
			},
			/**
			 * 插入内容
			 * @param mdStr
			 */
			insertContent(mdStr) {
				if (this.editor) {
					this.editor.setValue(mdStr);
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
  .editor-component {
    height: 100%;
  }
</style>
<style>
  .vditor-preview__action {
    display: none !important;
  }

  .vditor-toolbar__item {
    margin-right: 6px;
  }
</style>
