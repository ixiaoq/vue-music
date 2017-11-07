<template>
  <div class="audio">
    
		<div class="mini-face">
			<div class="music-img">
				<img src="../../assets/tonghuazhen.jpg">
			</div>
			<div class="music-name">
				<p>我们都一样</p>
				<p>我们</p>
			</div>
			<div class="music-play">
				<img src="../../assets/icon-play.png">
			</div>
			<div class="music-list">
				<img src="../../assets/icon-list.png">
			</div>
		</div>

    <audio :src="'http://ws.stream.qqmusic.qq.com/108756031.m4a?fromtag=46'" 
			ref="audio" 
			@timeupdate="timeupdate" 
			@ended="ended"></audio>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "search",
	
  computed: {
    ...mapState({
      currentMusicUrl(state) {
        return state.search.currentMusicUrl;
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
			console.log(this.$refs.audio.seeking);
			// console.log(newTime.timeStamp);
		},
		ended () {
			console.log("播放完成");
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

  .mini-face {
		display: flex;
		height: 40px; 

		.music-img { 
			width: 40px;
		}
		.music-name {
			padding: 0 10px;
			flex: 1;
			text-align: left;
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
