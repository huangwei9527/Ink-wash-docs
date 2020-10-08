<template>
  <div class="excel-edit-component-wrapper">
    <div class="excel-edit" id="excel-edit"></div>
  </div>
</template>

<script>
import Spreadsheet from "x-data-spreadsheet";
import zhCN from 'x-data-spreadsheet/dist/locale/zh-cn';
export default {
    mounted(){
        this.initExcelEditor();
    },
    methods: {
        initExcelEditor(){
            Spreadsheet.locale('zh-cn', zhCN);
            new Spreadsheet(document.getElementById('excel-edit'));
        }
    }
}
</script>

<style lang="scss" scoped>
.excel-edit-component-wrapper{
    height: 100%;
    .excel-edit{
        height: 100%;
    }
}
</style>