<template>
	<div class="home-search">
		<div class="icon-search" ></div>
		<router-link :to="'/search'" class="search-temp" >歌曲/歌手/专辑</router-link>
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
  height: 1rem;
  padding: 0.1rem 0.20rem;
  z-index: 50;
	background: white;
	box-shadow: 0 0 0.05rem rgba(0, 0, 0, 0.2);

  .icon-search {
		position: absolute;
		left: 0.3rem; top: 0.1rem;
    width: 0.7rem;
    height: 0.8rem;
    background: url(../../assets/icon-search.png) no-repeat center center / contain;
  }

  .search-temp {
		flex: 1;
		line-height: 0.8rem;
    padding-left: 0.8rem;
		background: #ddd;
    border-radius: 0.40rem;
		font-size: 0.32rem;
		text-align: left;
		color: #666;
  }
}
</style>
