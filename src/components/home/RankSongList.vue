<template>
  <div class="rank-song-list" >
    <div class="back" @click="back()">
      <img src="../../assets/icon-back.svg" alt="">
    </div>

		<div class="rank-pic">
			<img v-lazy="rankData.picAlbum" alt="">
		</div>

		<div class="title">
			<div class="play_all" @click="playAll()">播放<br>全部</div>
			<h3>{{ rankData.title }}</h3>
			<p>{{ rankData.updateTime }}</p>
		</div>

		<div class="songs-content" :style="{'background': color, 'color': isDark}">
			<div class="song-item" v-for="(item, index) in rankData.songList" :key="item.id" @click="playSingle(index)">
				<div class="num">{{ index + 1 }}</div>
				<div class="content">
					<p class="name txt_hide">{{ item.data.songname }}</p>
					<p class="singer txt_hide">{{ item.data.singer[0].name + " -- " + item.data.albumname }}</p>
				</div>
			</div>
		</div>

		<div class="footer"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import common from '../../api/common'

export default {
	name: "RankSongList",
	data () {
		return {
			audioList: []
		}
	},

  created() {
    this.$store.dispatch("getRankSong", this.$route.params.id);
  },

  computed: {
    color() {
      if (this.topListData !== null) {
        var fixed = "00000" + this.rankData.color.toString(16);
        return "#" + fixed.substr(fixed.length - 6);
      } else {
        return "#ffffff";
      }
    },
    isDark() {
      var grayLevel = this.r * 0.299 + this.g * 0.587 + this.b * 0.114;
      return grayLevel < 192 ? "#ffffff" : "#000000";
    },
    r() {
      return parseInt(this.color.slice(1, 3), 16);
    },
    g() {
      return parseInt(this.color.slice(3, 5), 16);
    },
    b() {
      return parseInt(this.color.slice(5, 7), 16);
    },
    rgb() {
      let color = this.color;
      let r = parseInt(color.slice(1, 3), 16);
      let g = parseInt(color.slice(3, 5), 16);
      let b = parseInt(color.slice(5, 7), 16);
      return "rgb(" + r + "," + g + "," + b + ")";
    },

    rankData() {
			let data = this.$store.state.home.rankData;
      return data;
    }
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    getList() {
      let songList = this.rankData.songList;
      let arr = [];
      for (let i = 0; i < songList.length; i++) {
				let data = songList[i].data;
        let songId = data.songid;
        let songName = data.songname;
        let singerArr = data.singer;
        let albummId = data.albummid;
				let music = common.creatAudioObj(songId, songName, singerArr, albummId);
				music.index = i;
        arr.push(music);
      }
      this.audioList = arr;
		},
		playSingle (id) {
			this.getList();
			this.$store.dispatch("playSingle", this.audioList[id]);
		},
		playAll () {
			this.getList();
			this.$store.dispatch("playAllSong", this.audioList);
			
		}
  }
};
</script>

<style lang="less" scope>
.rank-song-list {
  position: relative;
  height: 100%;
  font-size: 0.16rem;
  text-align: left;
  overflow-y: auto;

  .back {
    position: absolute;
    left: 0.1rem; top: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.4rem;
    height: 0.4rem;
    color: #fff;
    background: rgba(255, 255, 255,.5);
    border-radius: 50%;
    box-shadow: 0 0 0.10rem 0.05rem rgba(0, 0, 0,.2);

    img {
      width: 90%;
      height: 90%;
    }
  }

  .rank-pic {
    height: 3.5rem;
    overflow: hidden;
  }

  .title {
    position: relative;
    height: 1rem;
    margin-top: -1rem;
    padding: 0.1rem;
    color: #fff;
    background-image: -webkit-linear-gradient(
      top,
      transparent,
      currentColor 100%
    );
    h3 {
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.2rem;
    }
    p {
		}
		.play_all {
			float: right;
			width: 0.50rem;
			height: 0.50rem;
			border-radius: 50%;
			background: #000;
			text-align: center;
		}
  }
  .songs-content {
    padding: 0.1rem 0;
    color: #fff;
    .song-item {
      display: flex;
      align-items: center;
      text-align: center;
      // padding: 0 0.1rem;
      &:last-of-type .content {
        border-bottom: none;
      }
      .num {
        width: 0.4rem;
        text-align: center;
      }
      .content {
        flex: 1;
        text-align: left;
        margin-left: 0.1rem;
        padding: 0.08rem 0.1rem 0.08rem 0;
        border-bottom: 1px solid #fff;
        .name {
          margin-bottom: 0.05rem;
          font-size: 0.18rem;
        }
        .singer {
          font-size: 0.14rem;
        }
      }
    }
  }
  .footer {
    height: 0.5rem;
  }
}
</style>
