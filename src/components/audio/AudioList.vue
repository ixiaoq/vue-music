<template>
  <div class="audio-list" v-show="isAudioList">
		<header>
			<div class="playing_mode" @click="chagnePlayMode(mode)">
				<img src="../../assets/icon-SEQUENTIAL.png">
			</div>
			<p>{{ playModeText[mode] }}</p>
			<div class="finish" @click="closeList()">确定</div>
		</header>
		
		<section class="audio-song-container">
			<div class="h-empty"></div>

			<ul class="audio-song-list">
				<li class="song-item" 
					v-bind:class="[ playId == index ? 'active' : '']"
					v-for="(item, index) in playMusicList" 
					:key="item.id" 
					@click="playCurrentMusic(index)">
					<div class="song-name">{{ item.songName }}</div>
					<div class="song-singer">{{ item.singerName }}</div>
					<span class="icon">
						<img src="../../assets/icon-...black.png" alt="">
					</span>
				</li>
			</ul>

			<div class="f-empty"></div>
		</section>
		
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "audioList",
  data() {
    return {
      playModeText: ["顺序播放", "随机播放", "单曲循环"]
    };
	},
  computed: {
    ...mapState({
      isPlay() {
        return this.$store.state.audio.isPlay;
      },
      playId() {
        return this.$store.state.audio.playId;
      },
      playMusicList() {
        return this.$store.state.audio.playMusicList;
      },
      isAudioList() {
        return this.$store.state.audio.audioListPageState;
      },
      mode() {
        return this.$store.state.audio.audioPlayMode;
      }
    })
  },

  methods: {
    // 播放当前歌曲
    playCurrentMusic(id) {
			this.$store.dispatch("nextSong", id);
    },
    // 关闭播放列表
    closeList() {
      this.$store.commit("AUDIO_SONGS_LIST_STATE");
    },
    // 切换播放模式
    chagnePlayMode(num) {
      num++;
      if (num >= 3) num = 0;
      this.$store.commit("AUDIO_PLAY_MODE", num);
    }
  }
};
</script>

<style lang="less" scope>
.audio-list {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: white;
}

header {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  display: flex;
  width: 100%;
  line-height: 0.3rem;
  padding: 0.05rem 0;
  font-size: 0.16rem;
  overflow: hidden;
  border-bottom: 0.01rem solid #f0f0f0;
  background: white;

  .playing_mode {
    width: 0.3rem;
    margin-left: 0.1rem;
  }
  p {
    flex: 1;
    margin-left: 0.08rem;
    text-align: left;
  }
  .finish {
    padding: 0 0.1rem;
  }
}

.audio-song-container {
  position: relative;
  flex: 1;
  height: 100vh;
  overflow-y: auto;

  .audio-song-list {
    padding: 0.05rem 0;
    text-align: left;

    .song-item {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 0.05rem 0.1rem;
      border-bottom: 0.01rem dotted #fff;
      background: #f0f0f0;
      &:last-of-type {
        border-bottom: none;
      }
      .song-name {
        width: 90%;
        height: 0.2rem;
        line-height: 0.2rem;
        font-size: 0.18rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .song-singer {
        width: 90%;
        height: 0.2rem;
        line-height: 0.2rem;
        font-size: 0.14rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .icon {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0.15rem;
        margin: auto 0;
        width: 0.15rem;
        height: 0.2rem;
      }
    }
    .active {
      border-left: 0.02rem solid red;
      background: #fff;
    }
  }
}

.h-empty {
  height: 0.4rem;
}
.f-empty {
  height: 0.5rem;
}
</style>
