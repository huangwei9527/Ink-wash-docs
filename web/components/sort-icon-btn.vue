<template>
  <ul class="components-sort-icon-btn">
    <li class="active border-r">
      <el-dropdown @command="command">
        <el-tooltip content="排序" placement="top">
          <i class="iconfont icon-caozuo-paixu-jiangxu"></i>
        </el-tooltip>
        <el-dropdown-menu>
          <el-dropdown-item
                  v-for="(item, index) in operationDataList"
                  :key="index"
                  :command="item.eventType"
          >{{item.title}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
    <li :class="{active: listType === 'thumbnail'}" @click="toggleType('thumbnail')">
      <el-tooltip content="平铺" placement="top">
        <i class="iconfont icon-liebiao"></i>
      </el-tooltip>
    </li>
    <li :class="{active: listType === 'list'}" @click="toggleType('list')">
      <el-tooltip content="列表" placement="top">
        <i class="iconfont icon-liebiao1"></i>
      </el-tooltip>
    </li>
  </ul>
</template>

<script>
	import {
		Dropdown,
		DropdownMenu,
		DropdownItem,
		Tooltip
	} from 'element-ui'
	export default {
		name: "sort-icon-btn",
		props: {
			listType: {
				type: String,
				default: 'thumbnail' // 默认缩略图模式（thumbnail） 可以切换列表模式（list）
			}
		},
		components: {
			[Tooltip.name]: Tooltip,
			[Dropdown.name]: Dropdown,
			[DropdownMenu.name]: DropdownMenu,
			[DropdownItem.name]: DropdownItem
		},
		data() {
			return {
				type: 'thumbnail',
				operationDataList: [{
					title: '默认',
					eventType: 'default'
				}, {
					title: '更新时间',
					eventType: 'updateTime'
				}, {
					title: '创建时间',
					eventType: 'creatTime',
					iconClass: ''
				}, {
					title: '文件名',
					eventType: 'folderName'
				}, {
					title: '文件夹置顶',
					eventType: 'folderTop'
				}]
			}
		},
		created() {
			this.type = this.listType;
		},
		computed: {},
		methods: {
			/**
			 * 切换列表tyoe
			 * @param type
			 */
			toggleType(type) {
				this.type = type;
				this.$emit('update:listType', this.type)
			},
			
			command(type){
				this.$emit('command', type)
			}
		},
		watch: {
			listType(n) {
				this.type = n;
			}
		},
	}
</script>

<style lang="scss" scoped>
  .components-sort-icon-btn {
    display: inline-block;
    li {
      display: inline-block;
      cursor: pointer;
      color: #ccc;
      font-size: 20px;
      &.active{
        color: #555;
      }
    }
    li + li {
      margin-left: 10px;
    }
  }
</style>
