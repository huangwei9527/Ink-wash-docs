<template>
  <div class="page page-dash-board">
    <div class="page-header-wrappper">
      <pageHeader />
    </div>
    <div class="dash-board-wrappper layout-container">
      <div class="dash-board-side-bar">
        <sideBar/>
      </div>
      <div class="dash-board-main">
        <router-view class="dash-board-subpage"/>
      </div>
    </div>
  </div>
</template>

<script>
	import sideBar from '@/components/side-bar'
  import pageHeader from '@/components/page-header'
	export default {
		components: {
			sideBar,
			pageHeader
		}
	}
</script>

<style lang="scss" scoped>
.page-dash-board{
  .page-header-wrappper{
    height: 51px;
  }
  .dash-board-wrappper{
    display: flex;
    height: calc(100% - 81px);
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
      padding-top: 18px;
    }
  }
}
</style>
