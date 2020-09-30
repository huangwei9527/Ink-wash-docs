<template>
  <div class="user-head-btn-components">
    <el-dropdown>
      <div class="inline-block">
        <div class="user-head-btn-img">
          <img :src="userData.head || userHeadImage" alt="">
        </div>
        <span class="user-head-btn-name">{{userData.name}}</span>
      </div>
      <el-dropdown-menu>
        <el-dropdown-item command="new-excel">
          <resetPassword>
            <i class="el-icon-edit"></i> 修改密码
          </resetPassword>
        </el-dropdown-item>
        <el-dropdown-item command="new-folder">
          <div @click="doLogout">
            <i class="el-icon-switch-button"></i> 退出登录
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
	import {
		Dropdown,
		DropdownMenu,
		DropdownItem,
	} from 'element-ui'
	import resetPassword from '@/components/reset-password'

	export default {
		name: "user-head-btn",
		components: {
			[Dropdown.name]: Dropdown,
			[DropdownMenu.name]: DropdownMenu,
			[DropdownItem.name]: DropdownItem,
			resetPassword
		},
		data() {
			return {
				userHeadImage: require('./headerImage.png')
			}
		},
		computed: {
			userData() {
				return this.$store.state.user.userInfo || {}
			}
		},
		methods: {
			doLogout() {
				this.$router.push('/login')
			}
		}
	}
</script>

<style lang="scss" scoped>
  .user-head-btn-components {
    display: inline-block;
    vertical-align: middle;
    line-height: 28px;
    cursor: pointer;
    .user-head-btn-img {
      display: inline-block;
      vertical-align: middle;
      width: 28px;
      height: 28px;
    }
    .user-head-btn-name {
      font-size: 14px;
      margin-left: 8px;
    }
  }
</style>
