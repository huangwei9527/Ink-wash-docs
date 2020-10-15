<template>
  <div class="axure-edit-wrapper">
    <div class="upload-wrapper">
      <el-form label-position="top">
        <el-form-item label="上传Axure zip文件：">
          <div class="paddingL60 text-area-wrapper">
            <el-upload
                    action="/"
                    :before-upload="beforeUpload"
                    accept="application/zip"
                    class="user-image-upload-input">
              <div>
                <el-button type="primary" size="small">上传文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传zip文件，且不超过50m</div>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="默认访问入口：">
          <div slot="label">
            <span class="inline-block marginR20">默认访问入口：</span>
            <el-button size="small" @click="setDefaultUrl">设置当前预览页面为入口页面</el-button>
          </div>
          <div class="text-area-wrapper">
            {{reGetUrl(axureUrl)}}
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="axure-preview-wrapper" v-loading="loading">
      <iframe
              ref="iframe"
              :src="reGetUrl(axureUrl)"
              frameborder="0"
              style="background-color:transparent;width: 100%; min-height: 100%;"></iframe>
      <div class="preview-tips-wrapper" v-if="!axureUrl">
        <div class="preview-tips">
          上传原型图zip包预览
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import {
		Form,
		FormItem,
		Button,
		Upload,
		Tooltip,
	} from 'element-ui'

	export default {
		name: "axure-edit",
		props: {
			content: {
				type: String,
				default: ''
			}
		},
		components: {
			[Form.name]: Form,
			[FormItem.name]: FormItem,
			[Button.name]: Button,
			[Upload.name]: Upload,
			[Tooltip.name]: Tooltip
		},
		data() {
			return {
				loading: false,
				axureUrl: '',
				editorHasReady: true, // 无需初始化，默认置为true吧
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
			initEditor() {
				// 无需操作
			},
			/**
			 * 获取编辑器内容
			 * @returns {string}
			 */
			getContent() { // 获取内容方法
				return this.axureUrl;
			},
			/**
			 * 设置编辑器内容
			 * @param Msg
			 */
			setContent(dataStr) {
				this.axureUrl = dataStr;
			},
			destroy() {
				// 无需操作
			},
			/**
			 * 上传
			 * @param file
			 * @returns {boolean}
			 */
			beforeUpload(file) {
				// 判断文件是否合法
				if (file.size > 50 * 1024 * 1024) {
					this.$message.error('上传图片不能超过50mb！')
					return;
				}
				this.saveAxureZip(file);
				return false;
			},
			/**
			 * 上传文件
			 * @param file
			 */
			saveAxureZip(file) {
				let formData = new FormData();
				formData.append('file', file);
				this.loading = true;
				this.$API.docsUplaodAxure(formData).then(res => {
					this.loading = false;
					this.setContent(res.body.url);
				}).catch(() => {
					this.loading = false;
				})
			},
			/**
			 * 设置默认链接
			 */
			setDefaultUrl() {
				if(!this.axureUrl){
					return;
        }
				try {
					let url = this.$refs.iframe.contentWindow.location.href;
					if (url.includes(window.location.origin)) {
						url = url.replace(window.location.origin, '')
					}
					this.axureUrl = url;
				} catch (e) {
					this.$message.error('axuer预览地址与当前系统地址不同源，无法获取url')
				}
			},
			/**
			 * 获取地址，如果没有location.origin 则自动拼接上前缀
			 * @param url
			 */
			reGetUrl(url) {
				if(!url){
					return '';
        }
				if (url.includes('http://') || url.includes('https://')) {
					return url;
				}
				return window.location.origin + url;
			}
		},
		destroyed() {
			// 无需操作
		}
	}
</script>

<style lang="scss" scoped>
  .axure-edit-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
  }

  .preview-tips-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .preview-tips {
      font-size: 24px;
      color: #ddd;
      font-weight: 600;
    }
  }

  .axure-edit-wrapper {
    display: flex;
    .upload-wrapper {
      width: 400px;
      height: 100%;
      border-right: 1px solid #666;
      padding: 40px;
    }
    .axure-preview-wrapper {
      height: 100%;
      flex: 1;
      position: relative;
    }
  }

  .text-area-wrapper {
    background: #ededed;
    width: 100%;
    min-height: 80px;
    border-radius: 6px;
    padding: 30px 20px;
    word-wrap: break-word;
  }
</style>
