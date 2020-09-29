<template>
  <div class="user-head-btn-components">
    <div class="user-head-btn-img">
      <img :src="userData.head || userHeadImage" alt="">
    </div>
    <span class="user-head-btn-name">{{userData.name}}</span>
  </div>
</template>

<script>
	export default {
		name: "user-head-btn",
    data(){
			return {
				userHeadImage: require('./headerImage.png')
      }
    },
    computed: {
			userData(){
				return this.$store.state.user.userInfo || {}
      }
    }
	}
</script>

<style lang="scss" scoped>
.user-head-btn-components{
  display: inline-block;
  vertical-align: middle;
  line-height: 28px;
  .user-head-btn-img{
    display: inline-block;
    vertical-align: middle;
    width: 28px;
    height: 28px;
  }
  .user-head-btn-name{
    font-size: 14px;
    margin-left: 8px;
  }
}
</style>
