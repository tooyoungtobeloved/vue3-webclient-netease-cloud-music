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
import { transforStandardTimeStringtTotime } from '@/utils/format'
import { linear, animate } from '@/utils/util'
export default defineComponent({
  setup() {
    const lyricStore = useLyricStore()
    const lyricRef = ref<null | HTMLElement>(null)
    const lyricList = ref<{ text: string | number; time: string | number }[]>(
      [],
    )
    const { playtime } = storeToRefs(lyricStore)
    const activeLineIndex = computed(() => {
      const nextIndex = lyricList.value.findIndex(
        (lyc) => playtime.value <= Number(lyc.time),
      )
      return nextIndex
    })

    watch(activeLineIndex, (value, old) => {
      if (lyricRef.value) {
        const currentScrollTop = lyricRef.value?.scrollTop
        animate({
          timing: linear,
          duration: 700,
          draw: (progress) => {
            const gap = calcGap(value, old)
            console.log(value, old, gap)
            lyricRef.value!.scrollTop = currentScrollTop + progress * gap * 32
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
    function calcGap(value: number, old: number): number {
      let start = old
      let end = value
      if (value === -1) {
        value = lyricList.value.length - 1
      }
      if (value < 3) {
        end = 3
      }
      if (old < 3) {
        start = 3
      }
      if (value > lyricList.value.length - 3) {
        end = lyricList.value.length - 3
      }
      if (old > lyricList.value.length - 3) {
        start = lyricList.value.length - 3
      }
      if (value === -1) {
        end = lyricList.value.length - 4
      }

      return end - start
    }
    onMounted(async () => {
      const { lyricClientHeight, lyricScrollHeight } = storeToRefs(lyricStore)

      const { lrc } = await fetchLyric()
      lyricList.value = lrc.lyric
        .split('\n')
        .map((lc) => handleLyric(lc))
        .map((lc) => ({
          ...lc,
          time: transforStandardTimeStringtTotime(lc.time as string),
        }))
        .filter((lc) => lc.text || lc.time)
      nextTick(() => {
        const clientHeight = lyricRef.value?.clientHeight
        const scrollHeight = lyricRef.value?.scrollHeight
        lyricClientHeight.value = clientHeight as number
        lyricScrollHeight.value = scrollHeight as number
      })
    })
    interface lrc {
      lrc: {
        version: number
        lyric: string
      }
      [propName: string]: any
    }

    const handleLyric = (
      lyric: string,
    ): { time: string; text: string | number } => {
      const matchObj = {
        // [00:00.00] xxxxxxxx
        time: lyric,
        text: /^\[\d{2}:\d{2}\.\d{2,3}\]/.test(lyric)
          ? lyric.replace(/^\[\d{2}:\d{2}\.\d{2,3}\]/, '')
          : lyric,
      }
      const matchStr = lyric.match(/^\[\d{2}:\d{2}\.\d{2,3}\]/)
      if (matchStr) {
        matchObj.time = matchStr[0].replace(/\[|\]/g, '')
      }
      return matchObj
    }
    const fetchLyric = async (): Promise<lrc> => {
      return fetch('http://10.15.1.55:9000/lyric?id=421423806', {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => {
          return res
        })
    }
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
