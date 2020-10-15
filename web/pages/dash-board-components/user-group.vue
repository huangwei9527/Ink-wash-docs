<template>
  <div class="page-my-document">
    <div class="dash-board-operator-wrapper">
      <div class="dash-board-title">我的团队</div>
      <div class="pull-right">
        <el-button size="mini" class="new-docs-btn" icon="el-icon-plus" @click="showNew(true)">新建</el-button>
      </div>
    </div>
    <!--文档列表-->
    <div class="docs-list-wrapper scroll-wrapper">
      <ul class="group-list-table group-list-title">
        <li class="group-list-title-name">团队名称</li>
        <li class="group-list-title-date">成员数量</li>
        <li class="group-list-title-date">创建时间</li>
        <li class="group-list-title-date">更新时间</li>
        <li class="group-list-title--op">操作</li>
      </ul>
      <div class="list-wrapper" v-loading="loading">
        <template v-for="(group, index) in groupList">
          <ul class="group-list-table group-list-table-row" :key="index">
            <li class="group-list-row-date">
              <i class="iconfont icon-yonghushu"></i>
              {{group.name}}
            </li>
            <li class="group-list-row-date">
              <div class="member-list blue">{{group.members.length}}</div>
            </li>
            <li class="group-list-row-date">{{group.created | formatTime('yyyy-MM-dd')}}</li>
            <li class="group-list-row-date">{{group.updated | formatTime('yyyy-MM-dd')}}</li>
            <li class="group-list-title--op">
              <el-dropdown>
                <i class="font-p-color el-icon-setting"/>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <div @click="showNew(group)">编辑</div>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <div @click="showMemberManage(group)">成员管理</div>
                  </el-dropdown-item>
                  <el-dropdown-item command="edit">
                    <div @click="delGroup(group._id)" class="error">删除</div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </template>
        <noFunData v-if="noData"></noFunData>
      </div>
    </div>

    <el-dialog class="page-dialog-wrapper" :title="newGroupData.id ? '编辑' : '新增'" width="480px"
               :visible.sync="newDiolagVisible">
      <el-form label-width="110px" class="paddingR30">
        <el-form-item label="团队名称：">
          <el-input v-model="newGroupData.name" placeholder="请输入团队名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeNew">取消</el-button>
        <el-button type="primary" @click="newGroup" :loading="loading">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog class="page-dialog-wrapper" @close="getData" title="成员管理" width="650px"
               :visible.sync="userDiolagVisible">
      <div class="add-user-wrapper">
        <div class="search-w">
          <div class="search-input-wrapper">
            <div class="input-item">
              <el-select
                      class="input-i"
                      v-model="user"
                      multiple
                      filterable
                      remote
                      reserve-keyword
                      placeholder="请输入用户名|昵称搜索"
                      :remote-method="remoteMethod"
                      :loading="loading">
                <el-option
                        v-for="item in userOptions"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                </el-option>
              </el-select>
            </div>
            <div class="qr-btn">
              <el-button type="primary" @click="addGroupUser">添加</el-button>
            </div>
          </div>
        </div>
        <div class="user-list-wrapper">
          <div class="title">已加入成员:</div>
          <div class="user-list">
            <el-tag
                    class="user-item"
                    v-for="(tag, index) in selectUser"
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
    </el-dialog>
  </div>
</template>

<script>
	import noFunData from '@/components/notFundData'
	import {
		Form,
		FormItem,
		Dialog,
		Button,
		Input,
		Dropdown,
		DropdownMenu,
		DropdownItem,
		Select,
		Option,
		Tag
	} from 'element-ui'

	export default {
		components: {
			noFunData,
			[Tag.name]: Tag,
			[Select.name]: Select,
			[Option.name]: Option,
			[Dropdown.name]: Dropdown,
			[DropdownMenu.name]: DropdownMenu,
			[DropdownItem.name]: DropdownItem,
			[Form.name]: Form,
			[FormItem.name]: FormItem,
			[Dialog.name]: Dialog,
			[Button.name]: Button,
			[Input.name]: Input
		},
		data() {
			return {
				userHeadImage: require('@/common/images/headerImage.png'),
				loading: false,
				searching: false,
				noData: false,
				newDiolagVisible: false,
				userDiolagVisible: false,
				groupList: [],
				userOptions: [],
				user: [],
				selectUser: [],
				newGroupData: {
					id: '',
					name: ''
				},
				currentGroupId: ''
			}
		},
		created() {
			this.getData();
		},
		methods: {
			/**
			 * 获取docs列表页面数据
			 */
			getData() {
				this.loading = true;
				this.$API.getUserGroupList().then(res => {
					this.groupList = res.body || [];
					this.loading = false;
					this.noData = !this.groupList.length;
				}).catch(() => {
					this.loading = false;
				})
			},
			// 显示新增弹出层
			showNew(group) {
				this.newGroupData.id = group._id
				this.newGroupData.name = group.name
				this.newDiolagVisible = true;
			},
			// 取消新增
			closeNew() {
				this.newDiolagVisible = false;
				this.newGroupData.id = '';
				this.newGroupData.name = '';
			},
			// 删除分组
			delGroup(id) {
				this.$API.delUserGroup({id: id}).then(() => {
					this.getData();
					this.closeNew()
				})
			},
			// 新增
			newGroup() {
				this.$API.createUserGroup(this.newGroupData).then(() => {
					this.getData();
					this.closeNew()
				})
			},
			// 显示成员管理弹窗
			showMemberManage(group) {
				this.currentGroupId = group._id;
				this.selectUser = group.members;
				this.userDiolagVisible = true;
			},
			// 删除
			delGroupUser(userId, index) {
				this.$API.delUserFromGroup({groupId: this.currentGroupId, userId: userId}).then(() => {
					this.selectUser.splice(index, 1);
				})
			},
      // 加人
			addGroupUser() {
				this.$API.addUserToGroup({groupId: this.currentGroupId, userList: this.user}).then(res => {
					this.selectUser = res.body.members;
					this.user = [];
					this.userOptions = [];
				})
			},
			// 查找人员
			remoteMethod(str) {
				this.$API.getUserListByKeywords({keywords: str}).then(res => {
					this.userOptions = res.body || [];
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
  .page-my-document {

  }

  .group-list-table {
    display: flex;
    font-weight: 500;
    color: #999;
    padding-bottom: 10px;
    .group-list-title-info-member {
      flex: 1;
    }
    .group-list-title-name {
      flex: 1;
    }
    .group-list-title-date {
      flex: 1;
    }
    .group-list-title--op {
      width: 120px;
      text-align: center;
    }
  }

  .group-list-table {
    &.group-list-table-row {
      width: 100%;
      height: 48px;
      line-height: 48px;
      display: flex;
      flex-direction: row;
      margin: 0;
      border: none;
      border-bottom: 1px solid #e5e5e5;
      &:hover {
        border: none;
        border-bottom: 1px solid #e5e5e5;
        border-radius: 0;
      }
    }
    .group-list-row-date {
      flex: 1;
    }
  }

  .dash-board-operator-wrapper {
    display: block;
    padding-right: 20px;
  }

  .add-user-wrapper {
    padding: 10px 30px 20px;
    .search-w {
    }
  }

  .search-input-wrapper {
    .input-item {
      display: inline-block;
      width: 460px
    }
    .qr-btn {
      display: inline-block;
      width: 80px;
      text-align: center;
    }
    .input-i {
      width: 100%;
    }
  }

  .user-list-wrapper {
    background: #fafafa;
    min-height: 200px;
    margin-top: 20px;
    padding: 20px;
    .title {
      font-weight: 600;
      padding-bottom: 20px;
    }
  }
  .userHeadImage{
    width: 14px;
    height: 14px;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
  }
  .user-item{
    margin-right: 5px;
    margin-bottom: 5px;
  }
</style>
