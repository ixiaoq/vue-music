<template>
  <div class="audio-paly-page" v-show="isPlayState">
		<div class="back" @click="back()">
      <img src="../../assets/icon-back.svg" alt="">
    </div>

		<!-- <img src="//img1.imgtn.bdimg.com/it/u=1575482126,280707056&fm=214&gp=0.jpg" alt=""> -->

    <div class="top-bar">
      <swiper class="mySwipe" :options="swiperOption" ref="mySwiper">  <!-- :options="swiperOption"  -->
        <!-- slides -->
        <swiper-slide class="swipe-item">
          <img :src="playMusicList[playId].picUrl">
        </swiper-slide>
        <swiper-slide class="swipe-item">
          <div class="lyric">歌词</div>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper> 
    </div>

    <div class="control-bar">
      <div class="time-line">
        <div class="t-d">
          <span class="line" :style="{width: currentT.w + '%'}">
            <span class="dot" @click="setPlayTime()"></span>
          </span>
        </div>
        <span class="start-time">{{ currentT.ct }} </span>
        <span class="end-time">{{ currentT.tt }}</span>
      </div>
      <div class="songs-info">
        <p class="songs-name">{{ playMusicList[playId].songName }}</p>
        <p class="singer">{{ playMusicList[playId].singerName }}</p>
      </div>
      <div class="control-interface">
        <div class="top">
          <div><img src="../../assets/icon-shangyiqu.png" @click="up()"></div>
          <div>
            <img src="../../assets/icon-play.png" v-if="!isPlay" @click="play()">
				    <img src="../../assets/icon-pause.png" v-if="isPlay" @click="play()">
          </div>
          <div><img src="../../assets/icon-xiayiqu.png" @click="next()"></div>
        </div>
        <div class="bot">
          <div><img src="../../assets/icon-SEQUENTIAL.png" @click="changeMode()"></div>
          <div><img src="../../assets/icon-like.png"></div>
          <div><img src="../../assets/icon-volue-right.png" @click="isVolume()"></div>
          <div><img src="../../assets/icon-list.png"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");

export default {
  name: "audioPlatPage",
  data() {
    return {
      swiperOption: {
        // autoplay: 3000,
        pagination: ".swiper-pagination",
        freeMode: false,
        zoom: true
      }
    };
  },
  computed: {
    ...mapState({
      isPlayState() {
        return this.$store.state.audio.audioPlayPageState;
      },
      audioDOM() {
        return this.$store.state.audio.DOM.audio;
      },
      currentT() {
        var tt = this.$store.state.audio.currentTime.totalT;
        var ct = this.$store.state.audio.currentTime.currentT;
        var w = 0;
        if (tt != ct) w = (ct / tt * 100).toFixed(2);

        // 格式化时间
        function format(num) {
          if (isNaN(num)) return "00:00";

          var t = parseInt(num / 60);
          t = t > 9 ? t : "0" + t;
          var r = parseInt(num % 60);
          r = (r > 9 ? r : "0" + r)
          return t + ":" + r;
        }

        tt = format(tt);
        ct = format(ct);

        // console.log(ct, tt, w);
        return { tt, ct, w };
      },
      isPlay() {
        return this.$store.state.audio.isPlay;
      },
      playId() {
        return this.$store.state.audio.playId;
      },
      playMusicList() {
        return this.$store.state.audio.playMusicList;
      },
      mode() {
        return this.$store.state.audio.audioPlayMode;
      }
    })
  },

  methods: {
    back() {
      this.$store.commit("GLOBAL_AUDIO_STATE", 1);
    },
    up() {
      this.$store.commit("UP_SONG", this.playId);
    },
    next() {
      this.$store.dispatch("nextSong", this.playId);
    },
    play() {
      this.$store.dispatch("changePlayState");
      this.isPlay ? this.audioDOM.play() : this.audioDOM.pause();
    },
    setPlayTime() {
      this.audioDOM.currentTime = 255;
    },
    changeMode() {},
    isVolume() {}
  }
};
</script>

<style lang="less" scope>
.audio-paly-page {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 98;
  display: flex;
  flex-direction: column;
  max-width: 7.5rem;
  font-size: 0.2rem;
  background: white;

  .back {
    position: absolute;
    left: 0.1rem;
    top: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 98;
    width: 0.4rem;
    height: 0.4rem;
    color: #fff;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    box-shadow: 0 0 0.1rem 0.05rem rgba(0, 0, 0, 0.2);

    img {
      width: 90%;
      height: 90%;
    }
  }

  .top-bar {
    position: relative;
    flex: 1;

    .mySwipe {
      width: 100%;
      height: 100%;

      img {
        height: 100%;
      }
      .swipe-item {
        overflow: hidden;
      }
      .lyric {
        font-size: 0.2rem;
        color: red;
      }
    }
  }

  .control-bar {
    flex: 0 0 2.5rem;
  }

  .time-line {
    position: relative;
    height: 0.3rem;
    padding-right: 0.15rem;
    font-size: 0.16rem;

    .t-d {
      // width: 100%;

      .line {
        position: relative;
        z-index: 50;
        display: block;
        width: 0%;
        height: 0.02rem;
        background-color: red;
      }
      .dot {
        position: absolute;
        right: -0.15rem;
        top: 0;
        bottom: 0;
        margin: auto 0;
        display: block;
        width: 0.15rem;
        height: 0.15rem;
        border-radius: 50%;
        background-color: white;
        border: 0.01rem solid red;
        border-radius: 50%;
      }
    }

    .start-time {
      position: absolute;
      left: 0.05rem;
      top: 0.1rem;
    }
    .end-time {
      position: absolute;
      right: 0.05rem;
      top: 0.1rem;
    }
  }

  .songs-info {
    height: 0.7rem;
    .songs-name {
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.2rem;
    }
    .singer {
      height: 0.3rem;
      font-size: 0.16rem;
    }
  }

  .control-interface {
    display: flex;
    flex-direction: column;

    .top {
      display: flex;
      justify-content: center;
      height: 1rem;
      padding: 0.28rem 0;
      div {
        flex: 1;
        &:first-of-type {
          text-align: right;
        }
        &:last-of-type {
          text-align: left;
        }
      }
      img {
        display: inline-block;
        width: auto;
        height: 100%;
      }
    }
    .bot {
      display: flex;
      flex-direction: row;
      height: 0.5rem;
      padding: 0.1rem 0;
      border-top: 0.01rem solid #f0f0f0;
      div {
        flex: 1;
      }

      img {
        display: inline-block;
        width: auto;
        height: 100%;
      }
    }
  }
}
</style>
