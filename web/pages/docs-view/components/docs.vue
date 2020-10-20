<template>
  <div class="docs-view-item">
    <div class="docs-main-wrapper">
      <div class="docment-title-wrapper">
        <h1 class="docs-title">
          {{document.title}}
        </h1>
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
      <div id="preview" v-html="document.content"></div>
    </div>
  </div>
</template>

<script>
	import "vditor/src/assets/scss/index.scss"
	import Vditor from 'vditor'
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
		data() {
			return {}
		},
		mounted() {
			this.renderMarkdown(this.content);
		},
		methods: {
			renderMarkdown(md) {
				Vditor.preview(document.getElementById('preview'), md, {
					speech: {
						enable: true,
					},
					anchor: 1,
				})
			}
		},
		watch: {
			content(md) {
				this.renderMarkdown(md);
			}
		}
	}
</script>

<style lang="scss">
  .docs-view-item {
    max-width: 1000px;
    height: 100%;
    position: relative;
    padding: 16px 0 30px;
    margin-left: auto;
    margin-right: auto;
    .docs-main-wrapper {
      background: white;
      padding: 20px 40px 60px;
      min-height: calc(100% - 10px);
    }
  }

  .docment-title-wrapper {
    text-align: center;
    padding: 10px;
    margin-bottom: 20px;
    .docs-title {
      margin-bottom: 10px;
    }
    .docment-sub-info-wrapper{
      font-size: 12px;
      color: #6c757d;
      li{
        display: inline-block;
        padding: 0 8px;
      }
    }
  }
</style>
