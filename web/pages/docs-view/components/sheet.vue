<template>
  <div class="sheet-view-page">
    <div class="excel-edit" id="excel-edit"></div>

    <ul class="docment-sub-info-wrapper">
      <li>
        <span class="paddingR5">作者:</span>
        <span class="user-header-wrapper">
                <authorHead :userData="author"/>
              </span>
      </li>
      <li>
        更新时间: {{document.updated | formatTime('yyyy-MM-dd')}}
      </li>
      <li>
        <el-tooltip content="获赞数" placement="bottom">
          <span> <i class="iconfont icon-dianzan"></i></span>
        </el-tooltip>
        {{document.star_count || 0}}
      </li>
      <li>
        <el-tooltip content="阅读数" placement="bottom">
          <span> <i class="iconfont icon-ico_yueduliang"></i></span>
        </el-tooltip>
        {{document.visit_count || 0}}
      </li>
    </ul>
  </div>
</template>

<script>
	import Spreadsheet from "x-data-spreadsheet";
	import zhCN from 'x-data-spreadsheet/dist/locale/zh-cn';
	import authorHead from '@/components/author-head'
	import {
		Tooltip,
	} from 'element-ui'

	export default {
		props: {
			author: {
				type: Object,
				default: () => {
					return {}
				}
			},
			document: {
				type: Object,
				default: () => {
					return {}
				}
			},
			content: {
				type: String,
				default: ''
			}
		},
		components: {
			authorHead,
			[Tooltip.name]: Tooltip
		},
		mounted() {
			this.renderContent();
		},
		methods: {
			renderContent() {
				let options = {
					mode: 'read',
					showToolbar: true,
					showGrid: true,
					showContextmenu: true,
					view: {
						height: () => document.documentElement.clientHeight - 70,
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
			 * 设置编辑器内容
			 * @param Msg
			 */
			setContent(dataStr) {
				try {
					dataStr = JSON.parse(dataStr)
				} catch (e) {
					console.log(e)
				}
				this.editor.loadData(dataStr);
			},
		},
		watch: {
			content(md) {
				this.setContent(md);
			}
		}
	}
</script>

<style lang="scss" scoped>
  .sheet-view-page {
    position: relative;
    height: 100%;
    width: 100%;
    .excel-edit {
      height: 100%;
    }
  }

  .docment-sub-info-wrapper {
    position: absolute;
    right: 18px;
    top: 10px;
    font-size: 12px;
    color: #6c757d;
    li {
      display: inline-block;
      padding: 0 8px;
    }
  }
</style>
