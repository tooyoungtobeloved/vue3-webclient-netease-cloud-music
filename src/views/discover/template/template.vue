<template>
  <div class="discover-nav-wrap">
    <div class="discover-nav">
      <ul class="nav-ul clear">
        <li>
          <router-link to="/discover/recommend">
            <span>推荐</span>
          </router-link>
        </li>
        <li>
          <router-link to="/discover/toplist">
            <span>排行榜</span>
          </router-link>
        </li>
        <li>
          <router-link to="/discover/playlist">
            <span>歌单</span>
          </router-link>
        </li>
        <li>
          <router-link to="/discover/djradio">
            <span>主播电台</span>
          </router-link>
        </li>
        <li>
          <router-link to="/discover/artist">
            <span>歌手</span>
          </router-link>
        </li>
        <li>
          <router-link to="/discover/album">
            <span>新碟上架</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.discover-nav-wrap {
  background-color: #c20c0c;
  border-bottom: 1px solid #a40011;
  height: 35px;
  z-index: 90;
}
.discover-nav {
  height: 34px;
  width: 1100px;
  margin: 0 auto;
  font-size: 12px;
  & li {
    float: left;
    height: 34px;
    text-align: center;
    cursor: pointer;
  }
  & span {
    display: inline-block;
    height: 20px;
    padding: 0 13px;
    margin: 7px 17px 0;
    border-radius: 20px;
    line-height: 21px;
    color: #fff;
  }
}
.nav-ul {
  float: left;
  padding-left: 180px;
}
.current span {
  background-color: #9b0909;
}
</style>
