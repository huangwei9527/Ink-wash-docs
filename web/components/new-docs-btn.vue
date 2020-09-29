<template>
  <div class="component-new-docs-btn">
    <el-dropdown>
      <el-button size="small" class="new-docs-btn" type="primary">
        新建 <i class="el-icon-upload el-icon-plus" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>文档</el-dropdown-item>
        <el-dropdown-item>表格</el-dropdown-item>
        <el-dropdown-item>文件夹</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
	import {
		Dropdown,
		DropdownMenu,
		DropdownItem,
		Button
	} from 'element-ui'
	export default {
		components: {
			[Button.name]: Button,
			[Dropdown.name]: Dropdown,
			[DropdownMenu.name]: DropdownMenu,
			[DropdownItem.name]: DropdownItem
		}
	}
</script>

<style lang="scss" scoped>
.component-new-docs-btn{
  display: inline-block;
  .new-docs-btn{
    width: 120px;
  }
}
</style>
