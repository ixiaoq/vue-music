<template>
  <div class="audio" v-show="isGlobalAudio">
    <div class="time-line" id="time-line"></div>
		<div class="mini-face" @click.stop="openPlayPage()">
			<div class="music-img">
				<img :src="playMusicList[playId].picUrl">
			</div>
			<div class="music-name">
				<p class="title">{{ playMusicList[playId].songName }}</p>
				<p class="name">{{ playMusicList[playId].singerName }}</p>
			</div>
			<div class="music-play" @click.stop="play()">
        <i :class="!isPlay ? 'icon-play' : 'icon-pause'"></i>
			</div>
			<div class="music-list" @click.stop="openList()">
				<i class="icon-open"></i>
			</div>

			<audio :src="playMusicList[playId].songUrl"
				ref="audio"
        @loadedmetadata="playMusic"
				@timeupdate="timeupdate"
				@ended="ended">
			</audio>
		</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "search",

  mounted() {
		this.$store.dispatch("addDom", { name: "audio", dom: this.$refs.audio });
  },

  computed: {
    // ...mapState([
    //   'isGlobalAudio',
    //   'isPlay',
    //   'playId',
    //   'playMusicList'
    // ])
    ...mapState({
      isGlobalAudio() {
        return this.$store.state.audio.isGlobalAudio;
      },
      audioDOM() {
        return this.$store.state.audio.DOM.audio;
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
      isAudioPlay() {
        return this.$store.state.audio.isAudioPlay;
      },
      playMode() {
        return this.$store.state.audio.audioPlayMode;
      }
    })
  },

  /**
	 * loop		设置或返回音频是否应在结束时再次播放。
	 * muted	设置或返回是否关闭声音。
	 * paused	设置或返回音频是否暂停。
	 * volume	设置或返回音频的音量。
	 * ended	返回音频的播放是否已结束。
	 * duration	返回音频的长度（以秒计）。
	 * currentTime	设置或返回音频中的当前播放位置（以秒计）。
	 * preload   预加载  none | metadata | auto
	 * readyState	返回音频当前的就绪状态。
	 *
	 */
  methods: {
    // 播放进度
    timeupdate() {
      var totalT = this.audioDOM.duration;
      var currentT = this.audioDOM.currentTime;
      var w = currentT / totalT * 100;
      document.getElementById("time-line").style.width = w + "%";

      if (this.playMode == 2) {
        this.audioDOM.loop = true;
      } else {
        this.audioDOM.loop = false;
      }
      this.$store.commit("AUDIO_AUTO_PLAY");
      this.$store.commit("AUDIO_CURRENT_TIME", {currentT, totalT});
    },
    // 下一曲
    ended() {
      this.$store.commit("AUDIO_CURRENT_TIME", {currentT: 0, totalT: 0});
      
      if (this.playMode == 2) {
        return;
      }

      this.$store.dispatch("nextSong", this.playId);
    },
    play() {
      this.$store.dispatch("changePlayState");
      this.isPlay ? this.audioDOM.play() : this.audioDOM.pause();
    },
    openList() {
      this.$store.commit("AUDIO_SONGS_LIST_STATE");
    },
    openPlayPage() {
      this.$store.commit("AUDIO_PLAY_PAGE_STATE");
    },
    playMusic() {
      if (!this.isAudioPlay) return this.$store.commit("AUDIO_AUTO_PLAY");
      this.$store.dispatch("changePlayState", true);
      this.audioDOM.play();
    }
  }
};
</script>

<style lang="less" scope>
.audio {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  z-index: 99;
  overflow: hidden;
  background: #ddd;

  .time-line {
    position: absolute;
    left: 0; top: 0;
    width: 0;
    height: 0.02rem;
    background: red;
    box-shadow: 0 0 0.1rem rgba(255, 255, 255, 0.6);
  }

  .mini-face {
    display: flex;
    height: 100%;
    padding: 0.10rem;

    .music-img {
      flex: 0 0 0.80rem;
      border-radius: 50%;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }
    .music-name {
      padding: 0 0.20rem;
      max-width: 4.6rem;
      flex: 1;
      text-align: left;
      .title {
        width: 100%;
        margin-bottom: 0.06rem;
        font-size: 0.32rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .name {
        font-size: 0.24rem;
      }
    }
    i {
        display: block;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
      }
    .music-play {
      flex: 0 0 0.80rem;
      padding: 0.10rem;
      .icon-play {
        background-image: url(../../assets/icon-play.png);
      }
      .icon-pause {
        background-image: url(../../assets/icon-pause.png);
      }
    }
    .music-list {
      flex: 0 0 0.80rem;
      margin-left: 0.30rem;
      .icon-open {
        background-image: url(../../assets/icon-list.png);
      }
    }
  }
}
</style>
