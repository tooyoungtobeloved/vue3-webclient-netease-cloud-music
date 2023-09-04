<template>
  <div class="playlist-bd">
    <div class="listbdc">
      <ul class="slist-ul">
        <li>
          <div class="col col-1">
            <div class="playicn" />
          </div>
          <div class="col col-2">Again</div>
          <div class="col col-3">
            <div class="icons">
              <i class="icn icn-del">删除</i>
              <i class="icn icn-dl">下载</i>
              <i class="icn icn-share">分享</i>
              <i class="icn icn-add">收藏</i>
            </div>
          </div>
          <div class="col col-4">王极</div>
          <div class="col col-5">02:02</div>
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
export default defineComponent({
  components: { Lyric, ScrollBar },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
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
</style>
