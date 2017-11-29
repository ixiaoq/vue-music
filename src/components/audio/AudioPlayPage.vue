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
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper> 
    </div>

    <div class="control-bar">
      <div class="time-line">
        <div class="t-d">
          <span class="line">
            <span class="dot"></span>
          </span>
        </div>
        <span class="start-time">00:00</span>
        <span class="end-time">04:20</span>
      </div>
      <div class="songs-info">
        <p class="songs-name">{{ playMusicList[playId].songName }}</p>
        <p class="singer">{{ playMusicList[playId].singerName }}</p>
      </div>
      <div class="control-interface">
        <div class="top">
          <span><img src="../../assets/icon-shangyiqu.png"></span>
          <span><img src="../../assets/icon-play.png"></span>
          <span><img src="../../assets/icon-xiayiqu.png"></span>
        </div>
        <div class="bot">
          <span><img src="../../assets/icon-SEQUENTIAL.png"></span>
          <span><img src="../../assets/icon-like.png"></span>
          <span><img src="../../assets/icon-volue-right.png"></span>
          <span><img src="../../assets/icon-list.png"></span>
          <span><img src="../../assets/icon-singer.png"></span>
        </div>
      </div>
    </div>

    <!-- <div @click="setPlayTime()">设置</div> -->

  </div>
</template>

<script>
import { mapState } from "vuex";

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
      // isPlay() {
      //   return this.$store.state.audio.isPlay;
      // },
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
    next() {
      this.$store.dispatch("nextSong", 2);
    },
    setPlayTime() {
      this.audioDOM.currentTime = 200;
      console.log(this.audioDOM.seekable);
      console.log(this.audioDOM.seeked);
    }
  }
};
</script>

<style lang="less" scope>
.audio-paly-page {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  display: flex;
  flex-direction: column;
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
      height: 100%;

      img {
        width: auto;
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
    flex: 0 0 2rem;
  }

  .time-line {
    position: relative;
    height: 0.30rem;
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
    height: 0.6rem;
    .songs-name { 
      height: 0.30rem;
      font-size: 0.20rem;
    }
    .singer { 
      font-size: 0.16rem;
    }
  }

  .control-interface {
    
    .top {
      display: flex;
      justify-content: center;
      height: 0.6rem;
      padding: 0.12rem 0;
      span {
        flex: 1;
        margin: 0 0.2rem;

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
      justify-content: center;
      height: 0.5rem;
      padding: 0.1rem 0;
      border-top: 0.01rem solid #f0f0f0;
      span {
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
