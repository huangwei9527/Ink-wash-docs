<template>
  <div class="components-page-header">
    <div class="inline-block logo-wrapper">
      <span>水墨文档</span>
    </div>
    <div class="header-center-wrapper">
      <slot></slot>
    </div>
    <div class="user-wrapper">
      <userHeadBtn />
    </div>
  </div>
</template>

<script>
  import userHeadBtn from '@/components/user-head-btn/index'
	export default {
		components: {
			userHeadBtn
    }
	}
</script>

<style lang="scss" scoped>
.components-page-header{
  display: flex;
  height: 100%;
  background: white;
  box-shadow: 0 2px 3px 0 rgba(100,100,100,0.06);
  padding: 0 20px;
}
.logo-wrapper{
  width: 100px;
  font-size: 18px;
  line-height: 48px;
}
.header-center-wrapper{
  flex: 1;
  text-align: center;
}
.user-wrapper{
  width: 100px;
  text-align: right;
  padding-top: 10px;
}
</style>
