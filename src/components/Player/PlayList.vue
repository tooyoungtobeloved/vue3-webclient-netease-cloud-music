<template>
  <div class="playlist-wrap">
    <div class="playlist-hd">
      <div class="playlist-hdc">
        <h4 class="list-num">播放列表</h4>
        <a href="/" class="addall">
          <span class="icon addallicon" />
          收藏全部
        </a>
        <span class="line" />
        <a href="" class="clear">
          <span class="icon clearicon" />
          清除
        </a>
        <span class="title">危险关系 </span><span class="close">关闭</span>
      </div>
    </div>
    <PlayListBody />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlayListBody from './PlayListBody.vue'
export default defineComponent({
  components: { PlayListBody },
  setup() {
    return {}
  },
})
</script>

<style scoped lang="less">
.playlist-wrap {
  position: absolute;
  bottom: 47px;
  width: 986px;
  height: 301px;
  left: 50%;
  margin-left: -493px;
  background-color: #eee;
}
.playlist-hd {
  padding: 0px 5px;
  background: url('../../assets/img/playlist_bg.png') no-repeat;
  background-position: 0 0;
}
.playlist-hdc {
  position: relative;
  height: 41px;
  .list-num {
    position: absolute;
    left: 25px;
    top: 0;
    height: 39px;
    line-height: 39px;
    font-size: 14px;
    color: #e2e2e2;
    margin: 0px;
  }
  .addall,
  .clear {
    position: absolute;
    left: 490px;
    top: 12px;
    height: 15px;
    line-height: 15px;
    cursor: pointer;
    color: #ccc;
    text-decoration: none;
    font-size: 12px;
    &:hover {
      color: #e2e2e2;
      text-decoration: underline;
    }
    &:hover .clearicon {
      background-position: -51px -20px;
    }
    .icon {
      float: left;
      margin: 1px 6px 0 0;
      height: 16px;
      background: url('../../assets/img/playlist.png') no-repeat;
    }
    .addallicon {
      width: 16px;
      background-position: -24px 0;
    }
    .clearicon {
      width: 13px;
      background-position: -51px 0;
    }
  }
  .addall {
    left: 398px;
    &:hover {
      color: #e2e2e2;
      text-decoration: underline;
    }
    &:hover .addallicon {
      background-position: -24px -20px;
    }
  }
  .line {
    position: absolute;
    top: 13px;
    left: 477px;
    height: 15px;
    border-left: 1px solid #000;
    border-right: 1px solid #2c2c2c;
  }
  .title {
    position: absolute;
    left: 595px;
    top: 0;
    width: 346px;
    text-align: center;
    height: 39px;
    line-height: 39px;
    color: #fff;
    font-size: 14px;
  }
  .close {
    position: absolute;
    top: 6px;
    right: 8px;
    width: 30px;
    height: 30px;
    overflow: hidden;
    text-indent: -999px;
    cursor: pointer;
    background: url('../../assets/img/playlist.png') no-repeat;
    background-position: -195px 9px;
    &:hover {
      background-position: -195px -21px;
    }
  }
}
</style>
