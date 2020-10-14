<template>
  <div class="user-head-btn-components">
    <el-dropdown>
      <div class="inline-block">
        <div class="user-head-btn-img">
          <img :src="userData.avatar || userHeadImage" alt="">
        </div>
        <span class="user-head-btn-name">{{userData.name}}</span>
      </div>
      <el-dropdown-menu>
        <el-dropdown-item>
          <userInfo :userData="userData" :showEdit="true">
            <i class="el-icon-user"></i> 个人资料
          </userInfo>
        </el-dropdown-item>
        <el-dropdown-item>
          <resetPassword>
            <i class="el-icon-edit"></i> 修改密码
          </resetPassword>
        </el-dropdown-item>
        <el-dropdown-item>
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
  import userInfo from '@/components/user-info'

	export default {
		name: "user-head-btn",
		components: {
			[Dropdown.name]: Dropdown,
			[DropdownMenu.name]: DropdownMenu,
			[DropdownItem.name]: DropdownItem,
      resetPassword,
      userInfo
		},
		data() {
			return {
				userHeadImage: require('@/common/images/headerImage.png')
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
      border-radius: 50%;
      overflow: hidden;
      img{
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .user-head-btn-name {
      font-size: 14px;
      margin-left: 8px;
    }
  }
</style>
