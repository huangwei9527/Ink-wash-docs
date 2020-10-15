<template>
  <div class="page-monitoring-page">
    <iframe :src="url" frameborder="0" style="background-color:transparent;width: 100%; min-height: 100%;"></iframe>
  </div>
</template>

<script>
	export default {
    props: {
			url: String
    }
	}
</script>

<style scoped>
  .page-monitoring-page{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
