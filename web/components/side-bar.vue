<template>
  <ul class="components-work-side-bar">
    <li
            class="side-bar-item"
            v-for="(item, index) in navData"
            :key="index"
            :class="{active: $route.path === item.path}"
            @click="navClick(item)"
    >
      <i class="iconfont" :class="item.iconClassName"></i>
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
	export default {
		data() {
			return {
				navData: [{
					name: '工作台',
					path: '/dashboard/work',
					iconClassName: 'icon-weimingmingwenjianjia_gongzuotai'
				}, {
					name: '我的文档',
					path: '/dashboard/document',
					iconClassName: 'icon-ziyuan194'
				}, {
					name: '协作编辑',
					path: '/dashboard/cooperation',
					iconClassName: 'icon-zuzhi'
				}, {
					name: '我的模板',
					path: '/dashboard/template',
					iconClassName: 'icon-moban'
				}, {
					name: '我的团队',
					path: '/dashboard/group',
					iconClassName: 'icon-yonghushu'
				}, {
					name: '我的收藏',
					path: '/dashboard/collection',
					iconClassName: 'icon-guanzhu'
				}, {
					name: '最近浏览',
					path: '/dashboard/history',
					iconClassName: 'icon-zuijinliulan'
				}, {
					name: '回收站',
					path: '/dashboard/recycle-bin',
					iconClassName: 'icon-huishouzhan'
				}]
			}
		},
		methods: {
			/**
			 * 点击导航
			 * @param nav
			 */
			navClick(nav) {
				if (!nav.path) {
					this.$message.info('正在开发中，敬请期待...');
					return;
				}
				this.$router.push(nav.path);
			}
		}
	}
</script>

<style lang="scss" scoped>
  .components-work-side-bar {
    width: 100%;
    height: 100%;
    .side-bar-item {
      line-height: 40px;
      color: #8c8c8c;
      cursor: pointer;
      margin-bottom: 10px;
      &:hover {
        color: #666;
        background-color: rgba(255, 255, 255, 0.2);
      }
      &.active {
        color: #333;
        font-weight: bold;
      }
      .iconfont {
        display: inline-block;
        margin-right: 8px;
      }
    }
  }
</style>
