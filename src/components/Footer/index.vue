<template>
  <div class="footer-wrap">
    <div class="main-wrap">
      <div class="entry-wrap">
        <ul class="entry-ul">
          <li>
            <span class="foot-logo logo-openplatform" />
            <span class="foot-logo-text">音乐开放平台</span>
          </li>
          <li>
            <span class="foot-logo logo-trade" /><span class="foot-logo-text">
              云村交易所
            </span>
          </li>
          <li>
            <span class="foot-logo logo-amped" /><span class="foot-logo-text">
              Amped Studio
            </span>
          </li>
          <li>
            <span class="foot-logo logo-xstudio" /><span class="foot-logo-text">
              X Studio虚拟歌手
            </span>
          </li>
          <li>
            <span class="foot-logo logo-auth" /><span class="foot-logo-text">
              用户认证
            </span>
          </li>
          <li>
            <span class="foot-logo logo-musician" />
            <span class="foot-logo-text"> 音乐交易平台 </span>
          </li>
          <li>
            <span class="foot-logo logo-cloudsong" />
            <span class="foot-logo-text"> 云推歌 </span>
          </li>
          <li>
            <span class="foot-logo logo-reward" />
            <span class="foot-logo-text">赞赏</span>
          </li>
        </ul>
      </div>
      <div class="tips-text-wrap">
        <div class="tip-link">
          <a class="tip-a" href="/">服务条款</a>
          <span class="line">|</span>
          <a class="tip-a" href=""> 隐私政策</a>
          <span class="line">|</span>
          <a class="tip-a" href="">儿童隐私政策</a>
          <span class="line">|</span>
          <a class="tip-a" href=""> 版权投诉</a>
          <span class="line">|</span>
          <a class="tip-a" href=""> 投资者关系</a>
          <span class="line">|</span>
          <a class="tip-a" href="">广告合作 </a>
          <span class="line">|</span>
          <a class="tip-a" href=""> 联系我们 </a>
        </div>
        <div class="info-link">
          <a class="tip-a mr3.5" href="/">廉正举报</a>
          <span class="ttext">
            不良信息举报邮箱: 51jubao@service.netease.com
          </span>
          <span class="ttext">客服热线：95163298</span>
        </div>
        <div class="info-text">
          <span class="ttext">互联网宗教信息服务许可证：浙（2022）0000120</span>
          <span class="ttext">增值电信业务经营许可证：浙B2-20150198</span>
          <a class="tip-a" href="/">
            粤B2-20090191-18 工业和信息化部备案管理系统网站
          </a>
        </div>
        <div class="info-link">
          <span class="ttext pr3.5">网易公司版权所有©1997-2023</span>
          <span class="ttext">
            杭州乐读科技有限公司运营：浙网文[2021] 1186-054号
          </span>
          <a class="tip-a" href="">
            <span class="police-logo" /><span>
              浙公网安备 33010902002564号
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped lang="less">
// .footer-wrap {
//   position: fixed;
//   bottom: 0px;
//   left: 0px;
//   z-index: 99;
// }
.footer-wrap {
  font-size: 12px;
  border-top: 1px solid #000;
  position: relative;
  height: 325px;
  overflow: hidden;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
}
.main-wrap {
  width: 980px;
  margin: 0 auto;
}
.entry-ul {
  margin-top: 33px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  & > li {
    width: 45px;
    & > .foot-logo-text {
      display: inline-block;
      width: 100px;
      margin-top: 10px;
      margin-left: -27.5px;
      font-weight: 400;
      font-size: 12px;
      text-align: center;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
.foot-logo {
  width: 45px;
  display: block;
  float: none;
  width: 45px;
  height: 45px;
  margin: 0 auto;
  background: url('../../assets/img/foot_entry.png') no-repeat;
  background-size: 220px 220px;
  cursor: pointer;
}
.logo-openplatform {
  background-position: -170px -5px;
  &:hover {
    background-position: -5px -115px;
  }
}
.logo-trade {
  background-position: -5px -170px;
  &:hover {
    background-position: -60px -170px;
  }
}
.logo-amped {
  background-position: -5px -60px;
  &:hover {
    background-position: -60px -5px;
  }
}
.logo-xstudio {
  background: url('../../assets/img/xStudio.png') no-repeat;
  background-size: 45px;
  &:hover {
    background: url('../../assets/img/xStudioHover.png') no-repeat;
    background-size: 45px;
  }
}
.logo-auth {
  background-position: -60px -60px;
  &:hover {
    background-position: -115px -5px;
  }
}
.logo-musician {
  background-position: -115px -115px;
  &:hover {
    background-position: -5px -5px;
  }
}
.logo-cloudsong {
  background: url('../../assets/img/cloudSong.png') no-repeat;
  background-size: 45px;
  &:hover {
    background: url('../../assets/img/cloudSongHover.png') no-repeat;
    background-size: 45px;
  }
}
.logo-reward {
  background-position: -170px -115px;
  &:hover {
    background-position: -60px -115px;
  }
}
.tips-text-wrap {
  padding-top: 60px;
  line-height: 24px;
  margin: 0 auto;
  text-align: center;
}
.line {
  margin: 0 8px 0 8px;
  color: #d9d9d9;
}
.tip-a {
  color: #666;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.ttext {
  color: #666;
}
.police-logo {
  width: 14px;
  height: 14px;
  background: url('../../assets/img/police.png') no-repeat;
  background-size: cover;
  display: inline-block;
  margin-right: 2px;
  vertical-align: -2px;
}
</style>
