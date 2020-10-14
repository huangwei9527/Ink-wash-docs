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
                  class="sort-icon-btn-item"
                  :class="{active: item.eventType === sortType}"
          >
            <span class="sort-icon-btn-item-check-icon">
              <i v-show="item.eventType === sortType" class="check-icon el-icon-check"></i>
            </span>
            {{item.title}}
          </el-dropdown-item>
          <el-dropdown-item command="folderTop" class="sort-icon-btn-item" :class="{active: isFolderTop}">
            <span class="sort-icon-btn-item-check-icon">
              <i v-show="isFolderTop" class="check-icon el-icon-check"></i>
            </span>
            文件夹置顶
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
    <li :class="{active: docShowType === 'thumbnail'}" @click="toggleType('thumbnail')">
      <el-tooltip content="平铺" placement="top">
        <i class="iconfont icon-liebiao"></i>
      </el-tooltip>
    </li>
    <li :class="{active: docShowType === 'list'}" @click="toggleType('list')">
      <el-tooltip content="列表" placement="top">
        <i class="iconfont icon-liebiao1"></i>
      </el-tooltip>
    </li>
  </ul>
</template>

<script>
	import {mapState} from 'vuex'
	import {
		Dropdown,
		DropdownMenu,
		DropdownItem,
		Tooltip
	} from 'element-ui'

	export default {
		components: {
			[Tooltip.name]: Tooltip,
			[Dropdown.name]: Dropdown,
			[DropdownMenu.name]: DropdownMenu,
			[DropdownItem.name]: DropdownItem
		},
		data() {
			return {
				operationDataList: [{
					title: '默认',
					eventType: 'default'
				}, {
					title: '更新时间',
					eventType: 'updateTime'
				}, {
					title: '创建时间',
					eventType: 'createTime',
					iconClass: ''
				}, {
					title: '文件名',
					eventType: 'name'
				}]
			}
		},
		computed: {
			...mapState({
				sortType: state => state.sortType,
				docShowType: state => state.docShowType,
				isFolderTop: state => state.isFolderTop,
			})
		},
		methods: {
			/**
			 * 切换列表tyoe
			 * @param type
			 */
			toggleType(type) {
				this.$store.commit('UPDATE_DOC_SHOW_TYPE', type)
			},

			command(type) {
				if(type === 'folderTop'){
					this.$store.commit('UPDATE_IS_FOLDER_TOP', !this.isFolderTop)
					this.$emit('updateSort')
          return;
        }

				this.$store.commit('UPDATE_SORT_TYPE', type)
				this.$emit('updateSort')
			}
		}
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
      &.active {
        color: #555;
      }
    }
    li + li {
      margin-left: 10px;
    }
  }
  .sort-icon-btn-item-check-icon{
    display: inline-block;
    width: 16px;
  }
</style>
