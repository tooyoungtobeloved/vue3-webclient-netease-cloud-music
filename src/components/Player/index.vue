<template>
  <div class="player-container">
    <div class="player-wrap">
      <div class="updn">
        <div class="left">
          <span class="lock" />
        </div>
        <div class="right" />
      </div>
      <div class="main-wrap-bg" />
      <div class="main-wrap">
        <div class="btns">
          <span class="prev" title="上一首(ctrl+←)">上一首</span>
          <span
            :class="[isPlaying ? 'play' : 'pause']"
            title="播放/暂停(p)"
            @click="togglePlaying"
          >
            播放/暂停
          </span>
          <span class="next" title="下一首(ctrl+→)">下一首</span>
        </div>
        <div class="head">
          <span class="img" />
          <a class="mask" href="/" />
        </div>
        <div class="play">
          <div class="words">
            <a href="/" class="name">{{ currentSong?.name }}</a>
            <span class="by">
              <a href="/" class="">{{
                currentSong?.artists.map((a) => a.name).join('/')
              }}</a>
            </span>
            <a href="" class="src" title="来自榜单" />
          </div>
          <div ref="pbarRef" class="pbar" @click.prevent="handleStatusBarClick">
            <div class="barbg">
              <div class="rdy" />
              <div class="cur" :style="{ width: `${playPercent}%` }">
                <span class="btn" />
              </div>
            </div>
            <div class="time">
              <span class="current">{{ currentTimeString }}</span>
              <span class="total"> / {{ totalTimeString }}</span>
            </div>
          </div>
        </div>
        <div class="open">
          <a href="/" class="icn icon-pic">画中画歌词</a>
          <a href="/" class="icn icon-add">收藏</a>
          <a href="/" class="icn icon-share">分享</a>
        </div>
        <div class="ctrl">
          <div v-show="showSound" class="sound">
            <div class="volumn-bg" />
            <div class="vol-show">
              <div class="volumn-cur" />
              <div class="volumn-btn" />
            </div>
          </div>
          <span class="icn icon-sound" @click="toggleSound" />
          <span class="icn loop" title="循环" />
          <span class="add">
            <span class="tip">已添加到播放列表</span>
            <span class="icn playlist">1</span>
          </span>
        </div>
      </div>
      <PlayList />
      <audio
        ref="audioRef"
        :src="`https://music.163.com/song/media/outer/url?id=${songid}.mp3`"
        @canplay="handleCanplay"
        @timeupdate="audioTimeUpdate"
      >
        浏览器不支持 audio 标签。
      </audio>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLyricStore, usePlaylistStore } from '@/stores'
// import { usePlaylistStore } from '@/stores'
import { transforStandardTimeStringtTotime } from '@/utils/format'
import PlayList from './PlayList.vue'
export default defineComponent({
  components: { PlayList },
  setup() {
    const lyricStore = useLyricStore()
    const playlistStore = usePlaylistStore()
    const { currentSongId: songid, currentSong } = storeToRefs(playlistStore)
    const audioRef = ref<HTMLAudioElement | null>(null)
    const pbarRef = ref<HTMLDivElement | null>(null)
    const lyricList = ref<{ text: string | number; time: string | number }[]>(
      [],
    )
    const {
      totalTimeString,
      currentTimeString,
      isPlaying,
      totalTime,
      playPercent,
      playtime,
    } = toRefs(lyricStore)
    const data = reactive({
      showSound: false,
      showTip: false,
    })
    const toggleSound = () => {
      data.showSound = !data.showSound
    }
    const togglePlaying = () => {
      if (lyricStore.isPlaying) {
        lyricStore.isPlaying = false
        audioRef.value?.pause()
      } else {
        lyricStore.isPlaying = true
        audioRef.value?.play()
      }
    }
    const handleCanplay = () => {
      if (audioRef.value) {
        lyricStore.totalTime = audioRef.value.duration
      }
    }
    const audioTimeUpdate = () => {
      if (audioRef.value?.currentTime) {
        lyricStore.playtime = audioRef.value.currentTime
      }
    }
    const handleStatusBarClick = (e: MouseEvent) => {
      const pbarWidth = pbarRef.value?.clientWidth
      if (pbarWidth) {
        // const posPercent = ((e.offsetX / pbarWidth) * 100).toFixed(4)
        playtime.value = Number(
          ((e.offsetX / pbarWidth) * totalTime.value).toFixed(3),
        )
        if (audioRef.value) {
          audioRef.value.currentTime = playtime.value
        }
      }
    }
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
      return fetch('http://127.0.0.1:9000/lyric?id=' + songid.value, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => {
          return res
        })
    }
    onMounted(async () => {
      const { lrc } = await fetchLyric()
      lyricList.value = lrc.lyric
        .split('\n')
        .map((lc) => handleLyric(lc))
        .map((lc) => ({
          ...lc,
          time: transforStandardTimeStringtTotime(lc.time as string),
        }))
        .filter((lc) => lc.text || lc.time)
      lyricStore.lyricList = lyricList.value
    })

    return {
      ...toRefs(data),
      toggleSound,
      handleCanplay,
      audioRef,
      togglePlaying,
      audioTimeUpdate,
      totalTimeString,
      currentTimeString,
      handleStatusBarClick,
      isPlaying,
      playPercent,
      songid,
      pbarRef,
      currentSong,
    }
  },
})
</script>

<style lang="less" scoped>
.player-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  height: 0;
  .player-wrap {
    position: absolute;
    zoom: 1;
    top: -53px;
    left: 0;
    width: 100%;
    height: 53px;
    margin: 0 auto;
    .main-wrap-bg {
      height: 53px;
      zoom: 1;
      margin-right: 67px;
      background: url('../../assets/img/playbar.png') repeat-x;
      background-position: 0 0;
    }
    .main-wrap {
      font-size: 12px;
      box-sizing: border-box;
      position: absolute;
      left: 50%;
      top: 6px;
      z-index: 15;
      width: 980px;
      height: 47px;
      margin: 0 auto;
      margin-left: -490px;
    }
  }
}
.updn {
  .left {
    position: absolute;
    top: -14px;
    right: 15px;
    width: 52px;
    height: 67px;
    background: url('../../assets/img/playbar.png') no-repeat;
    background-position: 0 -380px;
    .lock {
      display: block;
      width: 18px;
      height: 18px;
      margin: 6px 0 0 17px;
      background: url('../../assets/img/playbar.png') no-repeat;
      background-position: -100px -380px;
      cursor: pointer;
      &:hover {
        background-position: -100px -400px;
      }
    }
  }
  .right {
    position: absolute;
    top: -1px;
    right: 0;
    width: 15px;
    height: 54px;
    pointer-events: none;
    background: url('../../assets/img/playbar.png') no-repeat;
    background-position: -52px -393px;
  }
}
.btns {
  width: 137px;
  padding-top: 6px;
  float: left;
  span {
    display: block;
    float: left;
    width: 28px;
    height: 28px;
    margin-right: 8px;
    margin-top: 5px;
    text-indent: -9999px;
    background: url('../../assets/img/playbar.png') no-repeat;
    cursor: pointer;
  }
  .prev {
    background-position: 0 -130px;
    &:hover {
      background-position: -30px -130px;
    }
  }
  .pause {
    width: 36px;
    height: 36px;
    margin-top: 0;
    background-position: 0 -204px;
    &:hover {
      background-position: -40px -204px;
    }
  }
  .play {
    background-position: 0 -165px;
    display: block;
    width: 36px;
    height: 36px;
    margin-top: 0;
    &:hover {
      background-position: -40px -165px;
    }
  }
  .next {
    background-position: -110px -130px;
  }
}
.head {
  width: 34px;
  height: 34px;
  float: left;
  position: relative;
  margin: 6px 15px 0 0;
  .img {
    width: 100%;
    height: 100%;
    display: inline-block;
    background-color: rgb(5, 5, 5);
  }
  .mask {
    position: absolute;
    top: 0px;
    left: 0px;
    display: block;
    width: 34px;
    height: 35px;
    background-position: 0 -80px;
  }
}
.play {
  width: 581px;
  float: left;
  .words {
    height: 28px;
    overflow: hidden;
    color: #e8e8e8;
    text-shadow: 0 1px 0 #171717;
    line-height: 28px;
    .name {
      color: #e8e8e8;
      text-decoration: none;
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      max-width: 300px;
      height: 28px;
      text-shadow: 0 1px 0 #171717;
      line-height: 28px;
      &:hover {
        text-decoration: underline;
      }
    }
    .by a {
      max-width: 220px;
      margin-left: 15px;
      color: #9b9b9b;
      float: left;
      text-decoration: none;
      height: 28px;
      overflow: hidden;
      color: #e8e8e8;
      text-shadow: 0 1px 0 #171717;
      line-height: 28px;
      &:hover {
        text-decoration: underline;
      }
    }
    .src {
      float: left;
      width: 14px;
      height: 15px;
      margin: 7px 0 0 13px;
      background: url('../../assets/img/playbar.png') no-repeat;
      background-position: -110px -103px;
    }
  }
  .pbar {
    width: 466px;
    position: relative;
    .barbg {
      width: 466px;
      height: 9px;
      background-position: right 0;
      background: url('../../assets/img/statbar.png') no-repeat;
    }
    .time {
      position: absolute;
      top: -3px;
      right: -84px;
      color: #797979;
      text-shadow: 0 1px 0 #121212;
    }
  }
}
.rdy {
  width: 100%;
  height: 9px;
  background: url('../../assets/img/statbar.png') no-repeat;
  background-position: right -30px;
}
.cur {
  position: absolute;
  top: 0;
  left: 0;
  height: 9px;
  background: url('../../assets/img/statbar.png') no-repeat;
  background-position: left -66px;
  .btn {
    position: absolute;
    top: -7px;
    right: -13px;
    width: 22px;
    height: 24px;
    margin-left: -11px;
    background: url('../../assets/img/iconall.png') no-repeat;
    background-position: 0 -250px;
    display: block;
    &:hover {
      background-position: 0 -280px;
    }
  }
}
.open {
  width: 87px;
  float: left;
  .icn {
    float: left;
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
    outline: none;
    text-decoration: none;
    text-indent: -9999px;
    color: #333;
  }
  .icon-pic {
    position: relative;
    background: url('../../assets/img/DLV.png') no-repeat 0 0;
    &:hover {
      background-position-y: -25px;
    }
  }
  .icon-add {
    background: url('../../assets/img/playbar.png') no-repeat;
    background-position: -88px -163px;
    &:hover {
      background-position: -88px -189px;
    }
  }
  .icon-share {
    background: url('../../assets/img/playbar.png') no-repeat;
    background-position: -114px -163px;
    &:hover {
      background-position: -114px -189px;
    }
  }
}
.ctrl {
  position: relative;
  z-index: 10;
  zoom: 1;
  width: 113px;
  padding-left: 13px;
  background: url('../../assets/img/playbar.png') no-repeat;
  background-position: -147px -238px;
  float: left;
  box-sizing: content-box;
  .sound {
    position: absolute;
    top: -113px;
    left: 9px;
    clear: both;
    width: 32px;
    height: 113px;
    .volumn-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 32px;
      height: 113px;
      background: url('../../assets/img/playbar.png') no-repeat;
      background-position: 0 -503px;
    }
  }
  .icn {
    float: left;
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
    text-indent: -9999px;
    background: url('../../assets/img/playbar.png') no-repeat;
    cursor: pointer;
  }
  .icon-sound {
    background-position: -2px -248px;
    &:hover {
      background-position: -31px -248px;
    }
  }
  .loop {
    background-position: -3px -344px;
    &:hover {
      background-position: -33px -344px;
    }
  }
  .add {
    float: left;
    width: 59px;
    height: 36px;
    position: relative;
    .tip {
      position: absolute;
      top: -51px;
      left: -65px;
      clear: both;
      width: 152px;
      height: 49px;
      background: url('../../assets/img/playbar.png') no-repeat;
      background-position: 0 -287px;
      text-align: center;
      color: #fff;
      line-height: 37px;
      display: none;
    }
    .playlist {
      display: block;
      float: none;
      width: 38px;
      padding-left: 21px;
      background: url('../../assets/img/playbar.png') no-repeat;
      background-position: -42px -68px;
      line-height: 27px;
      text-align: center;
      box-sizing: border-box;
      color: #666;
      text-shadow: 0 1px 0 #080707;
      text-indent: 0;
      text-decoration: none;
      box-sizing: content-box;
      word-break: break-word;
      &:hover {
        background-position: -42px -98px;
      }
    }
  }
}
.vol-show {
  position: absolute;
  top: 11px;
  left: 14px;
  width: 4px;
  height: 93px;
  padding: 4px 0;
  box-sizing: content-box;
  top: 7px;
  .volumn-cur {
    width: 4px;
    position: absolute;
    height: 100px;
    top: auto;
    bottom: 4px;
    left: 0;
    background: url('../../assets/img/playbar.png') no-repeat;
    background-position: -40px bottom;
    overflow: hidden;
  }
  .volumn-btn {
    position: absolute;
    top: 0;
    left: -7px;
    display: block;
    width: 18px;
    height: 20px;
    background: url('../../assets/img/iconall.png') no-repeat;
    background-position: -40px -250px;
    cursor: pointer;
  }
}
</style>
