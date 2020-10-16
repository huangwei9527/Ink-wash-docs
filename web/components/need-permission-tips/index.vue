<template>
  <el-dialog
          title="提示信息"
          :visible.sync="visible"
          width="500px">
    <div class="new-folder-wrapper padding30">
      <div class="tips-wrapper">
        <i class="el-icon-warning"></i>
      </div>
      <div class="tips-text-wrapper">
        {{title || '无访问权限，该文档只对团队内部可见！'}}
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="back">返 回</el-button>
      <el-button size="small" type="primary" @click="confirmFun">回到首页</el-button>
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
				title: '',
				visible: false,
				callback: null
			}
		},
		methods: {
			confirmFun() {
				this.$router.push('/');
			},
			back(){
				this.$router.go(-1);
      }
		}
	}
</script>

<style lang="scss" scoped>
.tips-wrapper{
  text-align: center;
  font-weight: 600;
  font-size: 36px;
  padding-bottom: 30px;
}
.tips-text-wrapper{
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #666;
}
</style>
