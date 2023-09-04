<template>
  <div class="scrollBar">
    <span class="barbtn" :style="{ height: `${barHeight}px` }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLyricStore } from '@/stores'
import { storeToRefs } from 'pinia'
export default defineComponent({
  setup() {
    const lyricStore = useLyricStore()
    const { barHeight } = storeToRefs(lyricStore)
    onMounted(() => {})
    return {
      barHeight,
    }
  },
})
</script>

<style lang="less" scoped>
.scrollBar {
  position: absolute;
  left: auto;
  right: 2px;
  z-index: 2;
  top: -1px;
  width: 6px;
  height: 260px;
  background: #000;
  opacity: 0.5;
  .barbtn {
    position: absolute;
    width: 4px;
    border-radius: 5px;
    height: 100px;
    cursor: pointer;
    background: #868686;
    border: 1px solid #a6a6a6;
    opacity: 0.8;
    left: auto;
    right: 0;
    height: 29.6562px;
    display: block;
    top: 0px;
    box-sizing: content-box;
  }
}
</style>
