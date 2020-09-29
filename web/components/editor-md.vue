<template>
  <div class="editor-component editor-md" ref="editor-component">
    <div id="editor-md-dom"></div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import "vditor/src/assets/scss/index.scss"
export default {
   props: {
        content: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            editor: null,
            editorHasReady: false,
        }
    },
    computed: {
        editorConfig() {
            var option = {};
            for (let key in this.config) {
                option[key] = this.config[key];
            }
            option.lang = 'zh-cn';
            return option;
        },
    },
    created(){

    },
    mounted(){
        let editorHeight = this.$refs['editor-component'].offsetHeight;
        this.eitor = new Vditor('editor-md-dom', {
            minHeight: 400,
            height: editorHeight || 600,
            toolbarConfig: {
                pin: true,
            },
            cache: {
                enable: false,
            },
            after: () => {
                this.eitor.setValue(this.content)
                this.editorHasReady = true;
            },
        })

    },
    methods: {
        getContent() { // 获取内容方法
            if (this.editor) {
                return this.eitor.getHTML();
            }d
            return '';
        },
        setContent(Msg) {
            var timer;
            if (!this.editorHasReady) {
                timer = setInterval(() => {
                    this.editor.setValue(Msg);
                    clearInterval(timer);
                }, 50);
                return;
            }
            this.editor.setValue(Msg);
        },
        destroy() {
            this.editor.destroy();
            this.editor = undefined;
        }
    },
    destroyed() {
        if (this.editorHasReady && this.editor) {
            this.editor.destroy();
        }
    }
}
</script>

<style lang="scss" scoped>
.editor-component {
    height: 100%;
}
</style>