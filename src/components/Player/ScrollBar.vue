<template>
  <div ref="scrollBarRef" class="scrollBar">
    <span
      class="barbtn"
      :style="{ height: `${barHeight}px`, top: `${barTop}px` }"
      @click="handleClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLyricStore } from '@/stores'
import { storeToRefs } from 'pinia'
export default defineComponent({
  setup() {
    const lyricStore = useLyricStore()
    const scrollBarRef = ref<HTMLDivElement | null>(null)
    const barTop = ref<number>(0)
    const { barHeight, lyricList, activeLineIndex } = storeToRefs(lyricStore)

    const handleClick = (e: MouseEvent) => {
      console.log(e.pageX)
    }
    onMounted(() => {
      const scrollBarHeight = scrollBarRef.value?.clientHeight
      if (scrollBarHeight) {
        const gap = scrollBarHeight - barHeight.value
        const perStepHeight = +(
          (1 / (lyricList.value.length - 7)) *
          gap
        ).toFixed(4) // 一屏7行歌词，所以可滚动的部分是list.length - 7
        console.log(perStepHeight)
        watch(activeLineIndex, (value) => {
          if (value > 3) {
            barTop.value = (value - 3) * perStepHeight
            console.log(barTop.value)
          }
          if (value > lyricList.value.length - 3) {
            barTop.value = gap
          }
        })
      }
    })
    return {
      barHeight,
      scrollBarRef,
      barTop,
      handleClick,
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
