<template>
  <div class="contain">
    <layout />
  </div>
</template>

<script lang="ts">
import Layout from '@/Layout/Layout.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { Layout },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
@color-black: #333;
.page {
  color: red;
}
.container :deep(.member) {
  color: red;
  background-color: @color-black;
}
ul {
  list-style: none;
}
.active > div {
  background-color: tomato;
}
</style>
