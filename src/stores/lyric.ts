import { transformTimeToStandardTime } from '@/utils/format'
import { defineStore } from 'pinia'

export const useLyricStore = defineStore('lyric', {
  state: () => ({
    barTop: 0,
    scrollTop: 0,
    lyricClientHeight: 0,
    lyricScrollHeight: 0,
    scrollWrapHeight: 260,
    playtime: 0,
    totalTime: 0,
    isPlaying: false,
    lyricList: <{ text: string | number; time: string | number }[]>[],
  }),
  getters: {
    lyricHeightGap: (state) =>
      state.lyricScrollHeight - state.lyricClientHeight,
    barHeight: (state) =>
      Number(
        (
          (state.lyricClientHeight * state.scrollWrapHeight) /
          state.lyricScrollHeight
        ).toFixed(5),
      ),
    totalTimeString: (state) => {
      return transformTimeToStandardTime(state.totalTime)
    },
    currentTimeString: (state) => {
      return transformTimeToStandardTime(state.playtime)
    },
    playPercent: (state) => {
      if (state.playtime === state.totalTime) {
        state.isPlaying = false
      }
      return Number(((state.playtime / state.totalTime) * 100).toFixed(4))
    },
    activeLineIndex: (state) => {
      const nextIndex = state.lyricList.findIndex(
        (lyc) => state.playtime <= Number(lyc.time),
      )
      return nextIndex === -1 ? state.lyricList.length - 1 : nextIndex - 1
    },
  },
})
