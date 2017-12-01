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
          <div class="lyric">
            <img src="//img1.imgtn.bdimg.com/it/u=1575482126,280707056&fm=214&gp=0.jpg" alt="">
          </div>
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
      <div class="control-play">
          <div>
            <i class="icon-up" @click="up()"></i>
          </div>
          <div>
            <i :class="!isPlay ? 'icon-play' : 'icon-pause'" @click="play()"></i>
          </div>
          <div>
            <i class="icon-next" @click="next()"></i>
          </div>
        </div>
      <div class="control-icon">
          <div><i :class="'mode__' + mode" @click="chagnePlayMode(mode)"></i></div>
          <div><i class="icon-collect" @click="myCollect()"></i></div>
          <div><i :class="!isAudioMuted ? 'icon-muted-r' : 'icon-muted-l'" @click="isMuted()"></i></div>
          <div><i class="icon-open" @click="openList()"></i></div>
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
      },
      isAudioMuted: false
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
    // 切换播放模式
    chagnePlayMode(num) {
      num++;
      if (num >= 3) num = 0;
      this.$store.commit("AUDIO_PLAY_MODE", num);
    },
    myCollect() {
      alert('不管用!');
    },
    isMuted() {
      this.audioDOM.muted = !this.audioDOM.muted;
      this.isAudioMuted = !this.isAudioMuted;
    },
    openList() {
      alert('其实你打开了!');
      this.$store.commit("AUDIO_SONGS_LIST_STATE");
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
    left: 0.2rem;
    top: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 98;
    width: 0.8rem;
    height: 0.8rem;
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
        font-size: 0.32rem;
        color: red;
      }
    }
  }

  // 控制部分
  .control-bar {
    flex: 0 0 5.5rem;
  }

  .time-line {
    position: relative;
    height: 0.5rem;
    padding-right: 0.3rem;
    font-size: 0.28rem;
    .t-d {
      &:before {
        content: "";
        position: absolute;
        left: 0; right: 0;
        height: 0.05rem;
        background: #999;
      }
      .line {
        position: relative;
        z-index: 50;
        display: block;
        width: 0%;
        height: 0.05rem;
        background-color: red;
      }
      .dot {
        position: absolute;
        right: -0.3rem;
        top: 0;
        bottom: 0;
        margin: auto 0;
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        background-color: white;
        border: 0.01rem solid red;
        border-radius: 50%;
      }
    }

    .start-time {
      position: absolute;
      left: 0.1rem;
      top: 0.2rem;
    }
    .end-time {
      position: absolute;
      right: 0.1rem;
      top: 0.2rem;
    }
  }

  .songs-info {
    height: 1.5rem;
    .songs-name {
      height: 1rem;
      line-height: 1rem;
      font-size: 0.40rem;
    }
    .singer {
      height: 0.5rem;
      font-size: 0.32rem;
    }
  }

  .control-play {
    display: flex;
    justify-content: center;
    height: 2.5rem;
    padding: 0.75rem 0;
    div {
      flex: 1;
      &:first-of-type {
        text-align: right;
      }
      &:last-of-type {
        text-align: left;
      }
    }
    .icon-play {
      background-image: url(../../assets/icon-play.png);
    }
    .icon-pause {
      background-image: url(../../assets/icon-pause.png);
    }
    .icon-up {
      background-image: url(../../assets/icon-shangyiqu.png);
    }
    .icon-next {
      background-image: url(../../assets/icon-xiayiqu.png);
    }
  }
  .control-icon {
    display: flex;
    height: 1rem;
    border-top: 0.01rem solid #f0f0f0;
    div {
      padding: 0.1rem 0;
      flex: 1;
    }
    .mode__0 {
      background-image: url(../../assets/icon-RANDOM.png);
    }
    .mode__1 {
      background-image: url(../../assets/icon-SEQUENTIAL.png);
    }
    .mode__2 {
      background-image: url(../../assets/icon-RANDOM.png);
    }
    .icon-collect {
      background-image: url(../../assets/icon-like.png);
    }
    .icon-muted-l {
      background-image: url(../../assets/icon-volue-left.png);
    }
    .icon-muted-r {
      background-image: url(../../assets/icon-volue-right.png);
    }
    .icon-open {
      background-image: url(../../assets/icon-list.png);
    }
  }
  
    i {
      display: inline-block;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
}
</style>
