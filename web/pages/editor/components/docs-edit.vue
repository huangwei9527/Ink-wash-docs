<template>
  <div class="editor-components-md">
      <editorMd content="test" />  
  </div>
</template>

<script>
import editorMd from "@/components/editor-md"
export default {
    components: {
        editorMd
    }
}
</script>

<style lang="scss" scoped>
.editor-components-md{
    height: 100%;
}
</style>