<template>
  <div class="page page-dash-board layout-container">
    <div class="dash-board-side-bar">
      <sideBar/>
    </div>
    <div class="dash-board-main">
      <router-view class="dash-board-subpage"/>
    </div>
  </div>
</template>

<script>
	import sideBar from '@/components/side-bar'
	export default {
		components: {
			sideBar
		}
	}
</script>

<style lang="scss" scoped>
.page-dash-board{
  display: flex;
  .dash-board-side-bar{
    width: 200px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 18px;
  }
  .dash-board-main{
    flex: 1;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 26px;
  }
}
</style>
