<template>
  <div class="page docs-view">
    <div class="view-header">
      <pageHeader :fullWidth="true">
        <div class="document-title" v-if="['sheet', 'axure'].includes(type)">{{documentData.title}}</div>
        <div class="inline-block" slot="right-slot">
          <div class="docs-operation inline-block" v-if="isLogined">
            <documentComBtn
                    @starCount="starCountChange"
                    :documentId="documentData._id"
                    :star="documentData.starStatus"
                    :collect="documentData.collectStatus"/>
            <span class="cut-line"></span>
          </div>
        </div>
        <div class="inline-block" slot="left-slot">
          <!--axure文档预览需要返回按钮实现返回到上一页-->
          <div class="paddingL30" v-if="['axure'].includes(type)">
            <el-button size="mini" icon="el-icon-arrow-left" @click="routerGoBack">返回</el-button>
          </div>
        </div>
      </pageHeader>
    </div>
    <div class="view-body-wrapper" v-if="!loading && hasPermission">
      <docsView
              :author="author"
              :document="documentData"
              :content="documentData.content"
              v-if="type==='docs'"
      ></docsView>
      <sheetView
              :author="author"
              :document="documentData"
              :content="documentData.content"
              v-if="type==='sheet'"
      ></sheetView>
      <axureView
              :author="author"
              :document="documentData"
              :content="documentData.content"
              v-if="type==='axure'"
      ></axureView>
    </div>


    <!--loading-->
    <div class="view-body-wrapper" v-if="loading || !hasPermission">
      <div class="skeleton-wrapper layout-container">
        <div class="skeleton-title chiaroscuro"></div>
        <div class="skeleton-content-item chiaroscuro"></div>
        <div class="skeleton-content-item chiaroscuro"></div>
        <div class="skeleton-content-item chiaroscuro"></div>
        <div class="skeleton-content-item chiaroscuro"></div>
        <div class="skeleton-title chiaroscuro"></div>
        <div class="skeleton-content-item chiaroscuro"></div>
        <div class="skeleton-content-item chiaroscuro"></div>
        <div class="skeleton-content-item chiaroscuro"></div>
        <div class="skeleton-title chiaroscuro"></div>
        <div class="skeleton-content-item chiaroscuro"></div>
        <div class="skeleton-content-item chiaroscuro"></div>
      </div>
      <div class="wa-tips-wrapper" v-if="showNoPermissionTips">
        <div class="wa-tips-main">
          <div class="tips-wrapper">
            <i class="el-icon-warning"></i>
          </div>
          <div class="tips-text-wrapper">
            {{title || '无访问权限，该文档只对团队内部可见！'}}
          </div>
        </div>
      </div>
      <div class="wa-tips-wrapper" v-if="showPasswordCheck">
        <div class="wa-tips-main">
          <div class="check-pass-title">
            <i class="el-icon-warning"></i>
            该文档为私密文档，请输入密码
          </div>
          <div class="check-pass-input-wrapper">
            <div class="check-pass-input">
              <el-input
                      placeholder="输入访问密码"
                      prefix-icon="el-icon-lock"
                      v-model="pass">
              </el-input>
            </div>
            <div class="check-pass-btn">
              <el-button type="primary" @click="checkPass">确 认</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import pageHeader from '@/components/page-header'
	import documentComBtn from '@/components/document-com-btn'
	import {
		Button,
		Input
	} from 'element-ui'

	// 全局变量纪录上一个页面路由信息
	let currentHistoryLength = 0;
	export default {
		components: {
			pageHeader,
			documentComBtn,
			[Button.name]: Button,
			[Input.name]: Input,
			docsView: () => import('./components/docs'),
			sheetView: () => import('./components/sheet'),
			axureView: () => import('./components/axure')
		},
		data() {
			return {
				hasPermission: false,
				loading: true,
				id: '',
				type: '',
				documentData: {},
				author: {},
				authority: {
					edit: false,
					needLogin: true,
					read: true,
					visitType: ""
				},
				showNoPermissionTips: false,
				showPasswordCheck: false,
				pass: ''
			}
		},
		computed: {
			isLogined() {
				return this.$store.state.user.access_token;
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.type = this.$route.query.type;
			this.getData()

			// 记录路由历史纪录长度
			currentHistoryLength = window.history.length;
		},
		methods: {
			/**
			 * 获取文档信息
			 */
			getData() {
				this.loading = true;
				this.$API.getDocumentDetail({id: this.id, isVisit: true}).then(res => {
					let doc = res.body;
					this.documentData = doc.document;
					this.author = doc.author;
					this.authority = doc.authority;
					this.permission()
					this.loading = false;
				})
			},
			/**
			 * 判断权限，然后显示不同状态
			 */
			permission() {
				// 显示
				this.hasPermission = this.authority.read;
				if (!this.hasPermission && this.authority.visitType !== 'private') {
					this.showNoPermissionTips = true;
					return;
				}
				if (!this.hasPermission && this.authority.visitType === 'private') {
					this.showPasswordCheck = true;
					return;
				}
			},
			checkPass() {
				this.$API.documentCheckPass({documentId: this.documentData._id, pass: this.pass}).then(res => {
					if (res.body) {
						this.showPasswordCheck = false;
						this.hasPermission = true;
					}else{
						this.$message.error('访问密码错误，请重试！')
          }
				})
			},
			/**
			 * 点赞后更新点赞数量
			 * @param num
			 */
			starCountChange(num) {
				this.documentData.star_count = this.documentData.star_count + num;
			},
			/**
			 * 兼容里面有iframe时的返回
			 */
			routerGoBack() {
				window.history.go((currentHistoryLength - window.history.length) + (-1))
			}
		}
	}
</script>

<style lang="scss" scoped>
  .docs-view {
    height: 100%;
    position: relative;
    padding-top: 50px;
    .view-header {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 48px;
      z-index: 100;
    }
    .view-body-wrapper {
      position: relative;
      height: 100%;
      overflow-y: auto;
    }
  }

  .cut-line {
    display: inline-block;
    vertical-align: middle;
    height: 20px;
    border-right: 2px solid #eee;
    margin: 0 16px;
  }

  .document-title {
    line-height: 48px;
    font-size: 16px;
    font-weight: 600;
  }

  .docs-view-main {
    height: 100%;
    position: relative;
  }

  .permission-tip-wrapper {
    width: 100%;
    height: 100%;
    background: white;
    padding: 60px 60px;
  }

  .skeleton-wrapper {
    width: 100%;
    height: 100%;
    background: white;
    padding: 60px 60px;
    .chiaroscuro {
      height: 30px;
      background: #f2f2f2;
      animation-name: blink;
      animation-iteration-count: infinite;
      margin-bottom: 20px;
      &.skeleton-title {
        height: 70px;
        width: 70%;
        animation: none;
      }
    }
    .chiaroscuro:nth-of-type(2n) {
      animation-duration: 10s;
    }
    .chiaroscuro:nth-of-type(2n +1) {
      animation-duration: 3s;
    }
  }

  @keyframes blink {
    0% {
      opacity: .4;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: .4;
    }
  }

  @keyframes flush {
    0% {
      width: 100%;
    }

    50% {
      width: 0;
    }

    100% {
      width: 100%;
    }
  }

  .wa-tips-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    .wa-tips-main {
      width: 400px;
      height: 300px;
      background: white;
      border-radius: 4px;
    }
  }

  .tips-wrapper {
    text-align: center;
    font-weight: 600;
    font-size: 36px;
    padding-bottom: 30px;
    padding-top: 80px;
  }

  .tips-text-wrapper {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    color: #666;
  }

  .check-pass-title {
    font-weight: 600;
    font-size: 18px;
    color: #666;
    text-align: center;
    padding-top: 60px;
  }

  .check-pass-input-wrapper {
    display: flex;
    padding: 60px 60px 0;
    .check-pass-input {
      flex: 1;
      padding-right: 20px;
    }
    .check-pass-btn {
      width: 80px;
    }
  }
</style>
