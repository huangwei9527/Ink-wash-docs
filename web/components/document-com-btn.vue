<template>
  <ul class="document-com-btn-wrapper">
    <li :class="{active: starStatus}">
      <i v-if="starStatus" class="iconfont icon-dianzan cursor-pointer" @click="starFn(!starStatus)"></i>
      <i v-else class="iconfont icon-dianzan1 cursor-pointer" @click="starFn(!starStatus)"></i>
      点赞
    </li>
    <li :class="{active: collectStatus}">
      <i v-if="collectStatus" class="iconfont icon-shoucang1 cursor-pointer" @click="collectFn(!collectStatus)"></i>
      <i v-else class="iconfont icon-shoucang cursor-pointer" @click="collectFn(!collectStatus)"></i>
      收藏
    </li>
    <!--<li>-->
    <!--<i class="iconfont icon-weibiaoti5"></i>-->
    <!--</li>-->
  </ul>
</template>

<script>
	export default {
		name: "document-com-btn",
		props: {
			documentId: String,
			star: Boolean,
			collect: Boolean
		},
		data() {
			return {
				starStatus: false,
				collectStatus: false
			}
		},
		created() {
			this.starStatus = this.star;
			this.collectStatus = this.collect;
		},
		watch: {
			star(val) {
				this.starStatus = val;
			},
			collect(val) {
				this.collectStatus = val;
			}
		},
		methods: {
			starFn(status) {
				this.$API.starDocument({id: this.documentId, status: !!status}).then(() => {
					this.starStatus = !!status;
					if (status) {
						this.$emit('starCount', 1)
					} else {
						this.$emit('starCount', -1)
					}
				})
			},
			collectFn(status) {
				this.$API.collectDocument({id: this.documentId, status: !!status}).then(() => {
					this.collectStatus = !!status;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  .document-com-btn-wrapper {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    li {
      display: inline-block;
      vertical-align: middle;
      padding: 8px;
      & > i {
        font-size: 18px;
      }
      &.active {
        color: #5ac66a;
      }
    }
  }
</style>
