<template>
  <div class="playlist-bd">
    <div class="listbdc">
      <ul class="slist-ul">
        <li
          v-for="song in playlist"
          :key="song.id"
          class="songItem"
          :class="[song.id === currentSongId ? 'curs' : '', 'playlistItem']"
          @click="playSong(song.id)"
        >
          <div class="col col-1">
            <div :class="['playicn', song.id === currentSongId ? 'db' : '']" />
          </div>
          <div class="col col-2">
            {{ song.name }}
          </div>
          <div class="col col-3">
            <div class="icons">
              <i class="icn icn-del">删除</i>
              <i class="icn icn-dl">下载</i>
              <i class="icn icn-share">分享</i>
              <i class="icn icn-add">收藏</i>
            </div>
          </div>
          <div class="col col-4">
            {{ song.singer }}
          </div>
          <div class="col col-5">
            {{ song.duration }}
          </div>
          <div class="col col-6">
            <a href="/" class="icn icn-src">来源</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="bline" />
    <div class="msk2" />
    <Lyric />
    <ScrollBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Lyric from './Lyric.vue'
import ScrollBar from './ScrollBar.vue'
import { usePlaylistStore } from '@/stores/playlist'
export default defineComponent({
  components: { Lyric, ScrollBar },
  setup() {
    const playlistStore = usePlaylistStore()
    const { currentSongId } = storeToRefs(playlistStore)
    function formatMs(ms: number): string {
      const s = Math.trunc(ms / 1000)
      return (
        Math.trunc(s / 60)
          .toString()
          .padStart(2, '0') +
        ':' +
        (s % 60).toString().padStart(2, '0')
      )
    }
    const playlist = playlistStore.playlist.map((item) => {
      return {
        title: item.title,
        duration: formatMs(item.duration),
        name: item.name,
        id: item.id,
        singer: item.artists.map((art) => art.name).join('/'),
      }
    })
    function playSong(id: number): void {
      playlistStore.currentSongId = id
      console.log(playlistStore.currentSongId)
    }
    return {
      playlist,
      playSong,
      currentSongId,
    }
  },
})
</script>

<style lang="less" scoped>
.songItem:hover {
  background-color: rgba(0, 0, 0, 0.4);
}
.playlist-bd {
  position: absolute;
  left: 0;
  top: 41px;
  width: 976px;
  box-sizing: content-box;
  padding: 0 5px;
  height: 260px;
  overflow: hidden;
  background: url('../../assets/img/playlist_bg.png');
  background-position: -1014px 0;
  background-repeat: repeat-y;
}
.listbdc {
  position: absolute;
  left: 2px;
  top: 0;
  z-index: 4;
  height: 260px;
  width: 553px;
  overflow: hidden;
}
.slist-ul {
  color: #ccc;
  overflow: hidden;
  li:hover .icons,
  li:hover .col-1 .playicn {
    display: block;
  }
  .col {
    float: left;
    padding-left: 10px;
    height: 28px;
    line-height: 28px;
    overflow: hidden;
    cursor: pointer;
    box-sizing: content-box;
    font-size: 12px;
  }
  .col-1 {
    width: 10px;
    .playicn {
      display: none;
      margin-top: 8px;
      width: 10px;
      height: 13px;
      background: url('../../assets/img/playlist.png') no-repeat;
      background-position: -182px 0;
    }
    .playicn.db {
      display: block;
    }
  }
  .col-2,
  .col-4 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .col-2 {
    width: 256px;
  }
  .col-3 {
    width: 78px;
    position: relative;
  }
  .col-4 {
    width: 70px;
  }
  .col-5 {
    width: 35px;
    color: #666;
  }
  .col-6 {
    width: 37px;
    padding-left: 6px;
    .icn {
      width: 14px;
      margin-left: 0;
      background: url('../../assets/img/playlist.png') no-repeat;
      background-position: -80px 0px;
      float: right;
      overflow: hidden;
      margin: 7px 0 0 10px;
      text-indent: -9999px;
      height: 16px;
    }
  }
}
.icons {
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 23px;
  display: none;
  .icn {
    float: right;
    overflow: hidden;
    margin: 7px 0 0 10px;
    text-indent: -9999px;
    height: 16px;
    background: url('../../assets/img/playlist.png') no-repeat;
  }
  .icn-del {
    width: 13px;
    background-position: -51px 0;
  }
  .icn-dl {
    width: 14px;
    background-position: -57px -50px;
  }
  .icn-share {
    width: 14px;
    background-position: 0 0;
  }
  .icn-add {
    width: 16px;
    background-position: -24px 0;
  }
}
.msk2 {
  position: absolute;
  left: 560px;
  top: 0;
  z-index: 3;
  width: 420px;
  height: 250px;
  background: #121212;
  opacity: 0.01;
}
.bline {
  position: absolute;
  left: 555px;
  top: -1px;
  z-index: 2;
  width: 6px;
  height: 260px;
  background: #000;
  opacity: 0.5;
}
.curs {
  background-color: rgba(0, 0, 0, 0.3);
}
.playlistItem {
  float: left;
  width: 100%;
}
</style>
