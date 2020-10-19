<template>
  <el-dialog
          title="访问设置"
          :visible.sync="visible"
          width="600px">
    <div class="f-w-s-t">
      <div class="check-type-wrapper">
        <el-radio v-model="type" label="open" border>公开</el-radio>
        <el-radio v-model="type" label="team" border>团队</el-radio>
        <el-radio v-model="type" label="private" border>私密</el-radio>
      </div>
      <div class="cz-wrapper">
        <div class="cz-item" v-if="type === 'open'">
          <div class="open-text">访问方式设为公开，所有人都能访问该文档</div>
        </div>
        <div class="cz-item" v-if="type === 'team'">
          <div class="search-wrapper paddingB20">
            <div class="title">按团队/小组添加(单选):</div>
            <div class="input-wrapper">
              <el-select
                      class="input-i"
                      v-model="groupInput"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="请输入团队|分组名称"
                      :remote-method="remoteMethod_group"
                      :loading="loading_group">
                <el-option
                        v-for="item in groupOptions"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                </el-option>
              </el-select>
            </div>
            <div class="tj-btn">
              <el-button type="primary" @click="addByGroup">添加</el-button>
            </div>
          </div>
          <div class="search-wrapper">
            <div class="title">按人员搜索添加(多选):</div>
            <div class="input-wrapper">
              <el-select
                      class="input-i"
                      v-model="userInput"
                      multiple
                      filterable
                      remote
                      reserve-keyword
                      placeholder="请输入用户名称"
                      :remote-method="remoteMethod_user"
                      :loading="loading_user">
                <el-option
                        v-for="item in userOptions"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                </el-option>
              </el-select>
            </div>
            <div class="tj-btn">
              <el-button type="primary" @click="addByUser">添加</el-button>
            </div>
          </div>

          <div class="user-list-wrapper">
            <div class="title">已加入成员:</div>
            <div class="user-list">
              <el-tag
                      class="user-item"
                      v-for="(tag, index) in selectUserList"
                      :key="index"
                      size="mini"
                      @close="delGroupUser(tag._id, index)"
                      closable>
                <img class="userHeadImage" :src="tag.avatar || userHeadImage" alt="">
                {{tag.name}}
              </el-tag>
            </div>
          </div>
        </div>
        <div class="cz-item" v-if="type === 'private'">
          <div class="private-wrapper">
            <p>设为私密，用户可以通过输入密码查看</p>
            <div>
              <el-input placeholder="请输入密码" v-model="pass">
                <template slot="prepend">访问密码</template>
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <div class="pull-left">
        <el-checkbox size="small" border v-model="useToChildren">应用到目录下的所有文档</el-checkbox>
      </div>
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="conformFn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
	import {
		Dialog,
		Input,
		Button,
		Radio,
		Select,
		Option,
		Tag,
		Checkbox
	} from 'element-ui'

	export default {
		components: {
			[Tag.name]: Tag,
			[Select.name]: Select,
			[Option.name]: Option,
			[Dialog.name]: Dialog,
			[Input.name]: Input,
			[Button.name]: Button,
			[Radio.name]: Radio,
			[Checkbox.name]: Checkbox,
		},
		data() {
			return {
				userHeadImage: require('@/common/images/headerImage.png'),
				documentId: '',
				visible: false,
				callback: null,
				type: 'open',
				pass: '',
				loading_group: false,
				loading_user: false,
				groupInput: '',
				groupOptions: [],
				userInput: [],
				userOptions: [],
				selectUserList: [],
        docsData: {},
				useToChildren: false, // 应用到子文件
			}
		},
		created() {
			this.getDocsData();
			this.getMemberList();
		},
		methods: {
			getDocsData(){
				this.$API.getDocumentDetail({id: this.documentId}).then(res => {
					this.docsData = res.body.document;
					this.type = this.docsData.visitType || 'open';
					this.pass = this.docsData.visitPass;
        })
      },
			conformFn() {
				if (this.type === 'open') {
					this.saveAsOpen()
				}
				if (this.type === 'team') {
					this.saveAsTeam()
				}
				if (this.type === 'private') {
					this.saveAsPrivate()
				}
			},
			saveAsOpen(){
				this.$API.setDocumentOpen({documentId: this.documentId, useToChildren: this.useToChildren}).then(() => {
					this.visible = false;
					this.$meaasge.success('设置成功！')
        })
      },
			saveAsTeam(){
				let userIds = [];
				this.selectUserList.forEach(item => {
					userIds.push(item._id);
        })
				this.$API.setDocumentVisitTeam({documentId: this.documentId, userIds: userIds, useToChildren: this.useToChildren}).then(() => {
					this.visible = false;
					this.$meaasge.success('设置成功！')
				})
			},
			saveAsPrivate(){
				this.$API.setDocumentPrivate({documentId: this.documentId, pass: this.pass, useToChildren: this.useToChildren}).then(() => {
					this.visible = false;
					this.$meaasge.success('设置成功！')
				})
			},
			getMemberList() {
				this.$API.getMembersByDocumentId({documentId: this.documentId}).then(res => {
					this.selectUserList = res.body || [];
				})
			},
			/**
			 * 远程搜索
			 */
			remoteMethod_group(str) {
				this.loading_group = true;
				this.$API.getUserGroupList({keywords: str}).then(res => {
					this.groupOptions = res.body || [];
					this.loading_group = false;
				}).catch(() => {
					this.loading_group = true;
				})
			},
			addByGroup() {
				if (!this.groupInput) return;
				this.$API.getUserListFromGroup({groupId: this.groupInput}).then(res => {
					let userList = res.body || [];
					this.groupInput = ''
					this.selectUserList = this.mergeUserList(this.selectUserList, userList)
				})
			},
			remoteMethod_user(str) {
				this.loading_user = true;
				this.$API.getUserListByKeywords({keywords: str}).then(res => {
					this.userOptions = res.body || [];
					this.loading_user = false;
				}).catch(() => {
					this.loading_user = true;
				})
			},
			addByUser() {
				if (!this.userInput.length) return;
				this.$API.getUserInfoByIds({ids: this.userInput.join(',')}).then(res => {
					let userList = res.body || [];
					this.userInput = [];
					this.selectUserList = this.mergeUserList(this.selectUserList, userList)
				})
			},
			mergeUserList(list1, list2){
				let list = [...list1, ...list2];
				let result = [];
				let ids = [];
				list.forEach(item => {
					if(ids.includes(item._id)) return;
					ids.push(item._id)
					result.push(item)
        })
        return result
      },
			// 删除
			delGroupUser(userId, index) {
				this.$API.removeCooperationUser({documentId: this.documentId, userId: userId}).then(() => {
					this.selectUserList.splice(index, 1);
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
  .f-w-s-t {
    height: 360px;
  }

  /*人员列表*/
  .user-list-wrapper {
    background: #fafafa;
    min-height: 160px;
    margin-top: 10px;
    padding: 20px;
    .title {
      font-weight: 600;
      padding-bottom: 20px;
    }
  }

  .userHeadImage {
    width: 14px;
    height: 14px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
  }

  .user-item {
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .title {
    display: block;
    font-weight: 600;
    padding-bottom: 20px;
  }

  .search-wrapper {
    display: flex;
    .title {
      width: 80px;
      margin-right: 16px;
      font-weight: 500;
    }
    .input-wrapper {
      flex: 1;
      padding-right: 20px;
      .input-i {
        width: 100%;
      }
    }
    .tj-btn {
      width: 80px;
    }
  }

  .check-type-wrapper {
    text-align: center;
    padding-bottom: 30px;
  }

  .cz-item {

  }

  .open-text {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    height: 300px;
    line-height: 300px;
  }

  .private-wrapper {
    padding: 60px 30px;
    p {
      font-weight: 600;
      padding-bottom: 20px;
    }

  }
</style>
