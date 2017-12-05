<template>
  <div class="rank-song-list" >
    <div class="back" @click="back()">
      <img src="../../assets/icon-back.svg" alt="">
    </div>

		<div class="rank-pic">
			<img v-lazy="rankData.picAlbum" alt="">
		</div>

		<div class="title" :style="{'color': color}">
			<div class="play_all" @click="playAll()"></div>
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

		<div class="empty_scroll"></div>
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
      this.$store.commit("PLAY_INDEX_SONG", 0);
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
  font-size: 0.32rem;
  text-align: left;
  overflow-y: auto;

  .back {
    position: fixed;
    left: 0.2rem; top: 0.2rem;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.8rem;
    height: 0.8rem;
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
    height: 7.5rem;
    overflow: hidden;
  }

  .title {
    position: relative;
    height: 2rem;
    margin-top: -2rem;
    padding: 0.2rem;
    color: #fff;
    background-image: -webkit-linear-gradient(top, transparent, currentColor 100%);
    h3 {
      height: 0.8rem;
      font-size: 0.50rem;
      color: #fff;
    }
    p {
      font-size: 0.38rem;
      color: #fff;
		}
		.play_all {
      position: relative;
			float: right;
			width: 1rem;
      height: 1rem;
      border: 0.02rem solid #fff;
			border-radius: 50%;
      text-align: center;
      &:before {
        content: "";
        position: absolute;
        left: 0.32rem; top: 0.18rem; 
        display: block;
        border: 0.30rem solid transparent;
        border-left: 0.50rem solid #fff;
      }
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
        width: 0.8rem;
        text-align: center;
      }
      .content {
        flex: 1;
        text-align: left;
        padding: 0.15rem 0.2rem 0.15rem 0;
        border-bottom: 0.01rem solid #fff;
        .name {
          margin-bottom: 0.1rem;
          font-size: 0.32rem;
        }
        .singer {
          font-size: 0.24rem;
        }
      }
    }
  }
  .empty_scroll {
    height: 1rem;
  }
}
</style>
