<template>
  <div class="global-topbar">
    <div class="top">
      <div class="wrap">
        <h1 class="logo m0">
          <router-link to="/#"> 网易云音乐 </router-link>
        </h1>
        <ul class="header-ul inline-block">
          <li class="float-left">
            <span class="h-8 font-size-4">
              <router-link class="navlink" to="/discover">
                发现音乐 <sub />
              </router-link>
            </span>
          </li>
          <li class="float-left">
            <div>
              <span class="h-7 font-size-4">
                <router-link class="navlink" to="/my">
                  我的音乐 <sub />
                </router-link>
              </span>
            </div>
          </li>
          <li class="float-left">
            <div>
              <span class="h-7 font-size-4">
                <router-link class="navlink" to="/friend">
                  关注
                  <sub />
                </router-link>
              </span>
            </div>
          </li>
          <li class="float-left">
            <div>
              <span class="h-7 font-size-4">
                <router-link class="navlink" to="/a"> 商城 </router-link>
              </span>
            </div>
          </li>
          <li class="float-left">
            <div>
              <span class="h-7 font-size-4">
                <router-link class="navlink" to="/b"> 音乐人 </router-link>
              </span>
            </div>
          </li>
          <li class="float-left">
            <div>
              <span class="h-7 font-size-4">
                <router-link class="navlink" to="/c"> 云推荐 </router-link>
              </span>
            </div>
          </li>
          <li class="float-left">
            <div>
              <span class="h-7 font-size-4">
                <router-link class="navlink" to="/d">
                  下载客户端<sub />
                </router-link>
              </span>
            </div>
          </li>
        </ul>
        <div class="tophead float-right">
          <router-link to="/login" class="login"> 登录 </router-link>
        </div>
        <div class="creator float-right">创作者中心</div>
        <div class="search clear">
          <span :class="['search-wrap', focus ? 'focus' : '']">
            <label for="searchinput">音乐/视频/电台/用户</label>
            <input
              id="searchinput"
              type="text"
              @focus="handleInputFocus"
              @blur="handleInputBlur"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="topmenu-bar" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const focus = ref<boolean>(false)
    const handleInputBlur = () => {
      focus.value = false
    }
    const handleInputFocus = () => {
      focus.value = true
    }
    return {
      handleInputBlur,
      handleInputFocus,
      focus,
    }
  },
})
</script>

<style lang="less" scoped>
.wrap {
  width: 1100px;
  margin: 0 auto;
}
.top {
  position: relative;
  z-index: 1000;
  height: 70px;
  box-sizing: border-box;
  background: #242424;
  border-bottom: 1px solid #000;
}
.navlink {
  padding: 0 19px;
  text-align: center;
  line-height: 70px;
  text-decoration: none;
  color: #ccc;
  font-size: 14px;
  float: left;
  height: 70px;
  box-sizing: border-box;
  position: relative;
  &:hover {
    background-color: #000;
    color: #fff;
  }
}
.header-ul a.current {
  background-color: #000;
  color: #fff;
}
.navlink sub {
  display: none;
  left: 50px;
  top: 64px;
  background-color: red;
  width: 12px;
  height: 7px;
  margin-left: -6px;
  position: absolute;
  background: url('../../assets/img/topbar.png') no-repeat;
  background-position: -226px 0;
  overflow: hidden;
}
.navlink.current sub {
  display: block;
}
.topmenu-bar {
  height: 5px;
  display: none;
  z-index: 90;
  background-color: #c20c0c;
  border-bottom: none;
}
.logo {
  float: left;
  width: 176px;
  height: 69px;
  background: url('../../assets/img/topbar.png') no-repeat;
  background-position: 0px 0px;
  box-sizing: border-box;
}
.logo a {
  float: left;
  width: 157px;
  height: 100%;
  padding-right: 20px;
  text-indent: -9999px;
}
.search {
  float: right;
  width: 158px;
  height: 32px;
  position: relative;
  zoom: 1;
  margin-top: 19px;
  background: url('../../assets/img/topbar.png') no-repeat;
  background-position: 0 -99px;
  background-color: #fff;
  border-radius: 32px;
  float: right;
  width: 158px;
  height: 32px;
}
.search-wrap {
  display: block;
  position: relative;
  margin: 8px 0 0 30px;
  font-size: 12px;
  & > label {
    display: block;
    position: absolute;
    top: 2px;
    left: 0;
    width: 90%;
    color: #9b9b9b;
    cursor: text;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
  }
  #searchinput {
    border: none;
    width: 95%;
    margin: 0;
    padding: 0;
    background: transparent;
    color: #333;
    line-height: 16px;
    outline: none;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
  }
}
.search-wrap.focus > label {
  display: none;
}
.creator {
  color: #ccc;
  width: 90px;
  height: 32px;
  margin: 19px 0 0 12px;
  box-sizing: border-box;
  padding-left: 16px;
  border: 1px solid #4f4f4f;
  line-height: 33px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: #fff;
    text-decoration: none;
    border: 1px solid #ccc;
  }
}
.tophead {
  color: #787878;
  height: 45px;
  margin: 19px 0 0 20px;
  padding: 0 22px 0 0;
  font-size: 12px;
}
.login {
  display: block;
  width: 28px;
  margin-top: 9px;
  color: #787878;
  text-decoration: none;
  &:hover {
    color: #999;
  }
}
</style>
