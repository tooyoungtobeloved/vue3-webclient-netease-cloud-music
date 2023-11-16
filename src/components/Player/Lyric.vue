<template>
  <div ref="lyricRef" class="listlyric">
    <p
      v-for="(lyc, index) in lyricList"
      :key="index"
      :class="{
        active: calcActive(index),
      }"
      :data-time="lyc.time"
    >
      {{ lyc.text }}
      {{ lyc.time }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, computed, watch } from 'vue'
import { useLyricStore } from '@/stores'
import { linear, animate } from '@/utils/util'
export default defineComponent({
  setup() {
    const lyricStore = useLyricStore()
    const lyricRef = ref<null | HTMLElement>(null)

    const { playtime, activeLineIndex, lyricList } = storeToRefs(lyricStore)

    watch(activeLineIndex, (value) => {
      if (lyricRef.value) {
        const currentScrollTop = lyricRef.value?.scrollTop
        animate({
          timing: linear,
          duration: 700,
          draw: (progress) => {
            // const scrollTop = getScrollTop()
            let commingScrollTop = (value - 3) * 32
            if (value < 3) {
              commingScrollTop = 0
            }
            if (value > lyricList.value.length - 3) {
              commingScrollTop = (lyricList.value.length - 3) * 32
            }
            const gap = commingScrollTop - currentScrollTop
            lyricRef.value!.scrollTop = currentScrollTop + progress * gap
          },
        })
      }
    })

    const calcActive = computed(() => {
      return (index: number) => {
        return (
          activeLineIndex.value === index ||
          (activeLineIndex.value === -1 && index === lyricList.value.length - 1)
        )
      }
    })
    onMounted(async () => {
      const { lyricClientHeight, lyricScrollHeight } = storeToRefs(lyricStore)
      nextTick(() => {
        setTimeout(() => {
          const clientHeight = lyricRef.value?.clientHeight
          const scrollHeight = lyricRef.value?.scrollHeight
          lyricClientHeight.value = clientHeight as number
          lyricScrollHeight.value = scrollHeight as number
          console.log(scrollHeight)
        }, 10)
      })
    })

    return {
      lyricRef,
      lyricList,
      playtime,
      activeLineIndex,
      calcActive,
    }
  },
})
</script>

<style lang="less" scoped>
.listlyric {
  position: absolute;
  right: 40px;
  top: 0;
  z-index: 4;
  margin: 21px 0 20px 0;
  height: 219px;
  width: 354px;
  overflow: hidden;
  p {
    color: #989898;
    word-wrap: break-word;
    text-align: center;
    line-height: 32px;
    height: auto !important;
    height: 32px;
    min-height: 32px;
    transition: color 0.7s linear;
    font-size: 12px;
    margin: 0px;
  }
  p.active {
    color: #fff;
    font-size: 14px;
    transition: color 0.7s linear;
  }
}
</style>
