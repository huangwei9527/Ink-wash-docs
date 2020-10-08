<template>
  <div class="components-page-background">
    <img class="bg-0 not-select" src="../common/images/login-bg/0.png" alt="">
    <img class="bg-1 not-select" src="../common/images/login-bg/1.png" alt="">
    <img class="bg-2 not-select" src="../common/images/login-bg/2.png" alt="">
  </div>
</template>

<script>
	export default {
		name: "page-background"
	}
</script>

<style lang="scss" scoped>
  .components-page-background{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .bg-0{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
  .bg-1{
    width: 15%;
    position: absolute;
    bottom: 10%;
    left: 85%;
    animation: run2 50s linear infinite 0s;
    z-index: 2;
  }
  .bg-2{
    width: 12%;
    position: absolute;
    bottom: 75%;
    left: 50%;
    animation: run3 15s linear infinite 1s;
    z-index: 3;
  }
  @keyframes run1{
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
  }
  @keyframes run2{
    0%{
      left:75%;
    }
    75%{
      left: -16%
    }
    75.01%{
      left: 100%;
    }
    100%{
      left: 75%;
    }
  }
  @keyframes run3{
    0%{
      width: 12%;
    }
    50%{
      width: 15%;
    }
    100%{
      width: 12%
    }
  }
  .not-select{
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
  }
</style>
