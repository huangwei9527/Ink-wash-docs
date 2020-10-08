<template>
  <div class="page page-editor">
      <div class="editor-header-wrapper">
          <div class="editor-header-back">
            <el-button size="small" @click="goBack" type="info">
                <i class="el-icon-d-arrow-left"></i>
                &nbsp;&nbsp;返回
            </el-button>
          </div>
          <div class="editor-header-docs-title">
            <el-input
            type="text"
            class="editor-header-docs-title-input"
            placeholder="请输入文档标题"
            v-model="docsData.title"
            maxlength="18"
            show-word-limit
            />
          </div>
          <div class="editor-header-operation text-right">
            <el-dropdown split-button size="mini" type="primary" @click="handleClick">
                保存
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>存为模板</el-dropdown-item>
                    <el-dropdown-item>编辑锁定</el-dropdown-item>
                    <el-dropdown-item>
                        <span class="red">删除</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>
      <div class="editor-wrapper">
          <template v-if="editType === 'docs'">
            <docsEdit />
          </template> 
          <template v-if="editType === 'excel'">
            <excelEdit />
          </template> 
      </div>
  </div>
</template>

<script>
import docsEdit from "./components/docs-edit"
import excelEdit from "./components/excel-edit"
import {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Button,
    ButtonGroup,
    Input
} from 'element-ui'
export default {
    components: {
        [ButtonGroup.name]: ButtonGroup,
        [Button.name]: Button,
        [Input.name]: Input,
        [Dropdown.name]: Dropdown,
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        docsEdit,
        excelEdit
    },
    data(){
        return {
            docsData: {
                editType: '',
                title: ''
            }
        }
    },
    created(){
        this.editType = this.$route.query.type
    },
    methods: {
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
.page-editor{
    height: 100%;
}
.editor-header-wrapper{
    position: relative;
    background: linear-gradient(180deg,#fdfdfd,#fff);
    z-index: 110;
    height: 50px;
    box-shadow: 0 2px 3px 0 rgba(100,100,100,0.15);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    min-width: 1280px;
    overflow: hidden;
    border-bottom: 1px solid #fff;
    display: flex;
    padding: 0 16px;
    .editor-header-back{
        width: 220px;
        padding-top: 8px;
    }
    .editor-header-docs-title{
        flex: 1;
        text-align: center;
    }
    .editor-header-operation{
        width: 220px;
        padding-top: 8px;
    }
}
.editor-wrapper{
    height: calc(100% - 81px);
}
.editor-header-docs-title-input{
    max-width: 680px;
}
</style>
<style lang="scss">
.editor-header-docs-title-input{
    .el-input__inner{
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        line-height: 14px;
        border: 1px solid transparent;
        border-bottom: 1px solid #DCDFE6;
    }
    .el-input.is-active, .el-input__inner:focus{
        border-color: transparent;
        border-bottom-color:  #ddd;
    }
}
</style>