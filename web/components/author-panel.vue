<template>
  <div class="author-panel-components">
    <div class="title-wrapper block-title">
      关于作者
    </div>
    <div class="author-info-wrapper">
      <div class="info-w">
        <div class="header-img">
          <img :src="userData.avatar || userHeadImage" alt="">
        </div>
        <div class="user-name-w">
          <p class="name">{{userData.name}}</p>
          <p>{{userData.email || '-'}}</p>
        </div>
      </div>
      <div class="dynamic-wrapper">
        <span class="icon-wrapper">
          <i class="iconfont icon-dianzan"></i>
        </span>
        <span>获得点赞数 </span>
        <span class="dynamic-num">{{userData.star_count || 0}}</span>
      </div>
      <div class="dynamic-wrapper">
        <span class="icon-wrapper">
          <i class="iconfont icon-ico_yueduliang"></i>
        </span>
        <span>文章被阅读数 </span>
        <span class="dynamic-num">{{userData.be_read_count || 0}}</span>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		props: {
			id: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				loading: false,
				userHeadImage: require('@/common/images/headerImage.png'),
				userData: {}
			}
		},
		created() {
			if (this.id) {
				this.getData();
			}
		},
		watch: {
			id() {
				this.getData();
			}
		},
		methods: {
			getData() {
				this.loading = true;
				this.$API.getUserInfoById({userId: this.id}).then(res => {
					this.userData = res.body || {};
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  .author-panel-components {
    background: white;
    position: relative;
    margin-bottom: 18px;
    border-radius: 2px;
  }

  .block-title {
    padding: 12px 16px;
    font-size: 13px;
    color: #333;
    border-bottom: 1px solid hsla(0, 0%, 58.8%, .1);

  }

  .info-w {
    padding: 16px;
    display: flex;
    .header-img {
      flex: 0 0 auto;
      margin-right: 16px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .user-name-w {
      flex: 1;
      .name {
        font-weight: 600;
        padding-bottom: 8px;
      }
    }
  }

  .dynamic-wrapper {
    padding: 0 16px 16px;
    font-size: 14px;
    .icon-wrapper {
      display: inline-block;
      text-align: center;
      width: 25px;
      height: 25px;
      line-height: 25px;
      background: rgb(225, 239, 255);
      border-radius: 50%;
      color: rgb(123, 185, 255);
      margin-right: 8px;
    }
    .dynamic-num {
      color: #000;
      font-size: 16px;
    }
  }
</style>
