<template>
  <div class="author-head inline-block">
    <div class="user-img">
      <img :src="userData.avatar || userHeadImage" alt="">
    </div>
    <span class="user-name">{{userData.name}}</span>
  </div>
</template>

<script>
	export default {
		props: {
			userData: {
				type: Object,
        default: () => {return {}}
      }
    },
    data(){
			return {
				userHeadImage: require('@/common/images/headerImage.png')
      }
    }
	}
</script>

<style lang="scss" scoped>
.author-head{
  .user-img{
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    img{
      display: inline-block;
      width: 100%;
      height: 100%;

    }
  }
  .user-name{
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
    line-height: inherit;
    color: inherit;
    font-size: inherit;
  }
}
</style>
