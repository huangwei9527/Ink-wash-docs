<template>
  <div class="page-axure-view">
    <div class="axure-view">
      <iframeLayout :url="axureUrl"/>
    </div>
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
	import authorHead from '@/components/author-head'
	import iframeLayout from '@/components/iframe-layout'
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
			iframeLayout,
			[Tooltip.name]: Tooltip
		},
		data() {
			return {
				axureUrl: ''
			}
		},
		mounted() {
			this.renderContent();
		},
		methods: {
			renderContent() {
				this.setContent(this.content);
			},
			/**
			 * 设置编辑器内容
			 * @param Msg
			 */
			setContent(dataStr) {
				this.axureUrl = dataStr;
			}
		},
		watch: {
			content(str) {
				this.setContent(str);
			}
		}
	}
</script>

<style lang="scss" scoped>
  .page-axure-view {
    position: relative;
    width: 100%;
    height: 100%;
    .axure-view {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }

  .docment-sub-info-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    color: #6c757d;
    background: #f2f2f2;
    height: 36px;
    line-height: 36px;
    padding-right: 18px;
    z-index: 100;
    li {
      display: inline-block;
      padding: 0 8px;
    }
  }
</style>
