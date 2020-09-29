<template>
  <div id="app">
    <div class="page-header-wrapper">
      <pageHeaader />
    </div>
    <div class="page-main">
      <router-view class="sub-page"/>
    </div>
    <div class="page-footer-wrapper">
      <pageFooter />
    </div>
  </div>
</template>
<script>
	import pageHeaader from '@/components/page-header'
	import pageFooter from '@/components/page-footer'

	export default {
		components: {
			pageHeaader,
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
    color: #2c3e50;
    position: relative;
    height: 100%;
  }

  .sub-page {
    position: relative;
    height: 100%;
  }

  #app{
    display: flex;
    flex-flow: column;
    height: 100%;
    background: #fafafa;
    .page-header-wrapper{
      height: 48px;
    }
    .page-main{
      flex: 1;
    }
    .page-footer-wrapper{
      height: 20px;
    }
  }

</style>
