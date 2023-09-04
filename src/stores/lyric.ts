import { transformTimeToStandardTime } from '@/utils/format'
import { defineStore } from 'pinia'

export const useLyricStore = defineStore('lyric', {
  state: () => ({
    barTop: 0,
    scrollTop: 0,
    lyricClientHeight: 0,
    lyricScrollHeight: 0,
    scrollWrapHeight: 219,
    playtime: 0,
    totalTime: 0,
    isPlaying: false,
  }),
  getters: {
    lyricHeightGap: (state) =>
      state.lyricScrollHeight - state.lyricClientHeight,
    barHeight: (state) =>
      (
        (state.lyricClientHeight * state.scrollWrapHeight) /
        state.lyricScrollHeight
      ).toFixed(5),
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
  },
})
