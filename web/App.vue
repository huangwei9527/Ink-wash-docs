<template>
  <div id="app">
    <router-view class="sub-page" :key="$route.name" />
    <div class="page-footer-wrapper">
      <pageFooter/>
    </div>
  </div>
</template>
<script>
	import pageFooter from '@/components/page-footer'

	export default {
		components: {
			pageFooter
		}
	}
</script>
<style lang="scss">
  html, body {
    position: relative;
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    position: relative;
    height: 100%;
    background: #fafafa;
  }

  .sub-page {
    position: relative;
    height: 100%;
  }

  .page-footer-wrapper {
    position: fixed;
    left: 0;
    bottom: 8px;
    width: 100%;
    z-index: 100;
  }

</style>
