<template>
  <div class="audio">

		<div class="mini-face">
			<div class="music-img">
				<img :src="musicList[playId].picUrl">
			</div>
			<div class="music-name">
				<p class="title">{{ musicList[playId].songName }}</p>
				<p class="name">{{ musicList[playId].singerName }}</p>
			</div>
			<div class="music-play" @click="play()">
				<img src="../../assets/icon-play.png" v-if="!isPlay">
				<img src="../../assets/icon-pause.png" v-if="isPlay">
			</div>
			<div class="music-list">
				<img src="../../assets/icon-list.png">
			</div>

			<audio :src="musicList[playId].songUrl"
				ref="audio"
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
	
  mounted(){
    this.$store.dispatch('addDom',{name:'audio', dom: this.$refs.audio})
	},
	
  computed: {
    ...mapState({
			isPlay () {
				return this.$store.state.audio.isPlay;
			},
			playId () {
				return this.$store.state.audio.playId;
			},
			musicList () {
				return this.$store.state.audio.currentPlayMusicList;
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
		timeupdate (newTime) {
			this.$store.dispatch("getCurrentTime", newTime.timeStamp);
		},
		// 下一曲
		ended () {
			this.$store.dispatch("nextSong", this.playId);
		},
		play () {
			this.$store.dispatch("changePlay");
			this.isPlay ? this.$refs.audio.play() : this.$refs.audio.pause();
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
	height: 50px;
	padding: 5px 10px;
  z-index: 99;
	overflow: hidden;
	background: #ddd;

  .mini-face {
		display: flex;
		height: 40px;

		.music-img {
			width: 40px;
			border-radius: 50%;
			box-shadow: 0 0 2px rgba(0,0,0,.2);
			overflow: hidden;
		}
		.music-name {
			padding: 0 10px;
			flex: 1;
			text-align: left;
			.title {
				font-size: 14px;
				margin-bottom: 3px;
			}
			.name {
				font-size: 12px;
			}
		}
		.music-play {
			width: 40px;
			padding: 5px;
		}
		.music-list {
			width: 40px;
			margin-left: 30px;
		}
  }
}
</style>
