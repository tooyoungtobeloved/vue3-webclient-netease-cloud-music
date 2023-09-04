<template>
  <h3>{{ activeLineIndex }}</h3>
  <div ref="lyricRef" class="listlyric">
    <p
      v-for="(lyc, index) in lyricList"
      :key="index"
      :class="{
        active:
          typeof lyc.time === 'number' &&
          playtime >= Number(lyc.time) &&
          playtime < Number(lyricList[index + 1].time),
      }"
      :data-time="lyc.time"
    >
      {{ lyc.text }}
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
      if (nextIndex === -1) {
        return nextIndex
      }
      if (playtime.value === lyricList.value[nextIndex].time) {
        return nextIndex
      } else {
        return nextIndex - 1
      }
    })

    watch(activeLineIndex, (value) => {
      if (
        lyricList.value.length > 7 &&
        value > 3 &&
        lyricList.value.length - value > 3
      ) {
        if (lyricRef.value) {
          // lyricRef.value.scrollTop = 32 * (activeLineIndex.value - 3)
          animate({ timing: linear, duration: 0.5, draw })
        }
      }
    })
    function draw(progress: number) {
      lyricRef.value!.scrollTop = (activeLineIndex.value - 4 + progress) * 32
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
      return fetch('http://10.15.1.55:9000/lyric?id=1897929515', {
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
