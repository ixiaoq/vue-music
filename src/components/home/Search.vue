<template>
	<div class="home-search">
		<div class="back" v-show="isback" @click="back"><span></span></div>
		<input v-model="searchMessage" placeholder="歌曲/歌手/专辑" >
		<div class="search" v-show="isSearch" @click="search(searchMessage)">搜索</div>
	</div>
</template>

<script>
export default {
	name: "search",
	
  data() {
    return {
      isback: false,
      isSearch: false,
      searchMessage: "",
      navClass: true,
      input: "林中鸟"
    };
	},
	
  methods: {
    search(msg) {
      if (!msg) return;
      this.$store.dispatch("searchMusic", msg);
    },
    back() {
      this.$router.go(-1);
    },
    navActive() {
      this.navClass = !this.navClass;
    }
	},
	
  watch: {
    searchMessage() {
      this.isSearch = this.searchMessage ? true : false;
    }
  }
};
</script>

<style lang="less" scope>

	.home-search {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 55px;
		padding: 6px;
		z-index: 50;
		background: white;
		font-size: 16px;

		.back {
			display: flex;
			align-items: center;
			justify-content: center;
			span {
				position: relative;
				width: 16px;
				height: 16px;
				border-width: 0 0 2px 2px;
				border-style: solid;
				border-color: #666;
				transform: rotate(45deg);
				&:before {
					content: "";
					position: absolute;
					bottom: 0;
					left: 1px;
					width: 20px;
					border-top: 2px solid #666;
					transform-origin: left bottom;
					transform: rotate(-45deg);
				}
			}
		}

		input {
			padding-left: 40px;
			background: #ddd;
			outline: none;
			border: none;
			border-radius: 5px;
			flex: 1;
			font-size: 16px;
		}

		.back,
		.search {
			flex: 0 0 45px;
			line-height: 43px;
		}
	}


</style>
