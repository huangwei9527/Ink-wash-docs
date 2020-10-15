<template>
  <div class="component-new-docs-btn">
    <el-dropdown @command="command">
      <el-button size="mini" class="new-docs-btn"  icon="el-icon-plus">新建</el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="new-docs">文档</el-dropdown-item>
        <el-dropdown-item command="new-sheet">表格</el-dropdown-item>
        <el-dropdown-item command="new-axure">产品原型</el-dropdown-item>
        <el-dropdown-item command="new-folder">文件夹</el-dropdown-item>
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
    },
    methods: {
      command(type){
        this.$emit('command', type)
      }
    }
	}
</script>

<style lang="scss" scoped>
.component-new-docs-btn{
  display: inline-block;
  .new-docs-btn{
    /*width: 120px;*/
  }
}
</style>
