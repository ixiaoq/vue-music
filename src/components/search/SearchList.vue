<template>
    <div class="search-list">
			<div class="head">
				<div class="back-go" @click="back()"></div>
				<div class="icon-search" ></div>
				<div class="search-text" @click="getSearch()">搜索</div>
				<input class="search-ipt" type="text" placeholder="歌曲/歌手/专辑"  ref="search">
			</div>

			<div class="empty-scroll"></div>

			<div class="search-main">
				<div class="single-title">
					<i class="icon-single"></i>
					<span>{{ title.song }}</span>
				</div>
				<ul>
					<li v-for="(item, index) in searchList.song.itemlist" :key="index" @click="playSong(item)">
						<div class="name">{{ item.name }}</div>
						<div class="singer">{{ item.singer }}</div>
					</li>
				</ul>
				<div class="album-title">
					<i class="icon-album"></i>
					<span>{{ title.album }}</span>
				</div>
				<ul>
					<li v-for="(item, index) in searchList.album.itemlist" :key="index">
						<div class="pic">
							<img :src="item.pic" alt="">
						</div>
						<div class="name">{{ item.name }}</div>
						<div class="singer">{{ item.singer }}</div>
					</li>
				</ul>
				<div class="mv-title">
					<i class="icon-mv"></i>
					<span>{{ title.mv }}</span>
				</div>
				<ul>
					<li v-for="(item, index) in searchList.mv.itemlist" :key="index">
						<div class="name">{{ item.name }}</div>
						<div class="singer">{{ item.singer }}</div>
					</li>
				</ul>
			</div>

			<div class="empty-scroll"></div>

		</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "SearchList",
  data() {
    return {
			title: {
				song: '单曲',
				album: '专辑',
				mv: 'MV'
			}
		}
  },

	mounted(){
		this.$refs.search.focus();
	},

	computed: {
		...mapState({
			searchList () { 
				return this.$store.state.search.searchList;
			}
		})
	},

	methods: {
		back() {
			this.$router.go(-1);
		},

		getSearch(){
			this.$store.dispatch("getSearch", this.$refs.search.value);
		},

		playSong(item) {
			// this.$store.dispatch("playSingle", item);
		}
	}
};
</script>

<style lang="less" scoped>
.search-list {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 100%;
  height: 100%;
  font-size: 0.32rem;
  text-align: left;
	overflow-y: auto;
	
	.head {
		position: fixed;
		display: block;
		width: 100%;
		height: 1rem;
		padding: 0.1rem 0.2rem;
		background: white;
		box-shadow: 0 0 0.05rem rgba(0, 0, 0, 0.2);

		.back-go {
			position: absolute;
			left: 0.1rem; top: 0.1rem;
			width: 0.4rem;
			height: 0.8rem;
			background: url(../../assets/icon-back.svg) no-repeat center center / contain;
		}

		.icon-search {
			position: absolute;
			left: 1rem; top: 0.1rem;
			width: 0.60rem;
			height: 0.8rem;
			background: url(../../assets/icon-search.png) no-repeat center center / contain;
		}

		.back-go {
			position: absolute;
			left: 0.1rem; top: 0.1rem;
			width: 0.70rem;
			height: 0.8rem;
			background: url(../../assets/icon-back.svg) no-repeat center center / contain;
		}

		.search-text {
			position: absolute;
			right: 0.1rem; top: 0.1rem;
			width: 1rem;
			height: 0.8rem;
			line-height: 0.8rem;
			text-align: center;
		}

		.search-ipt {
			flex: 1;
			display: block;
			width: 75%;
			margin-left: 0.8rem;
			line-height: 0.7rem;
			padding: 0.06rem 0.05rem 0 0.6rem;
			font-size: 0.32rem;
			text-align: left;
			color: #666;
			outline: none;
			border: none;
			border-bottom: 0.01rem solid #ddd;
		}
	}
	
	.search-main {
		& > div {
			display: flex;
			align-items: center;
			height: 0.8rem;
			padding: 0 0.20rem;
			line-height: 0.8rem;
			background: #f0f0f0;
		}

		i {
			display: inline-block;
			width: 0.5rem;
			height: 0.5rem;
			margin-right: 0.1rem;
			background-repeat: no-repeat;
			background-size: contain;
		}
		.icon-single {
			background-image: url(../../assets/icon-music.png);
		}
		.icon-album {
			background-image: url(../../assets/icon-album.png);
		}
		.icon-mv {
			background-image: url(../../assets/icon-mv.png);
		}

		ul {
			overflow: hidden;
		}
		li {
			padding:0.08rem 0.20rem;
			border-bottom: 0.01rem solid #f0f0f0;
			.pic {
				float: left;
				width: 0.8rem;
				height: 0.8rem;
				margin-right: 0.2rem;
				border-radius: 0.1rem;
				overflow: hidden;
			}
			.name {
				font-size: 0.36rem;
			}
			.singer {
				font-size: 0.28rem;
			}
		}
	}
	
	.empty-scroll {
		flex: 0 0 1rem;
	}

	.search-main {
		flex: 1;
		overflow-y: auto;
	}
	

}
</style>

