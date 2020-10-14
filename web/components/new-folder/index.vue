<template>
  <el-dialog
          :title="id ? '重命名' : '新文件夹'"
          :visible.sync="visible"
          width="500px">
    <div class="new-folder-wrapper padding30">
      <el-input v-model="title" placeholder="请输入文件夹名"></el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="confirmFun">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
	import {
		Dialog,
		Input,
		Button
	} from 'element-ui'

	export default {
		components: {
			[Dialog.name]: Dialog,
			[Input.name]: Input,
			[Button.name]: Button,
		},
		data() {
			return {
				id: '',
				title: '',
				parentId: '',
				visible: false,
				callback: null
			}
		},
		methods: {
			confirmFun() {
				let fnName = this.id ? 'reName' : 'newFolder';
				this[fnName]().then(res => {
					if (this.callback) {
						this.callback(res.body)
					}
					this.visible = false
				})
			},
			newFolder() {
				return this.$API.newFolder({title: this.title, parentId: this.parentId})
			},
			reName() {
				return this.$API.documentRename({title: this.title, id: this.id})
			},

		}
	}
</script>

<style scoped>

</style>
