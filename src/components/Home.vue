<template>
  <div class="page-home">
    <v-search></v-search>
		<div class="main">
			<div class="head_empty_srcoll"></div>
			<v-tabbar>
				<v-tabbar-item id="recommend" title="推荐"></v-tabbar-item>
				<v-tabbar-item id="rank" title="排行榜"></v-tabbar-item>
			</v-tabbar>


			<router-view></router-view>
			
			<div class="footer_empty_srcoll"></div>
		</div>
  </div>
</template>

<script>
import vSearch from "./search/Search";
import vTabbar from "./home/Tabbar";
import vTabbarItem from "./home/TabbarItem";

export default {
  name: "Home",
  data () {
    return {
      input: "林中鸟"
    };
	},
	
  components: {
		vSearch,
		vTabbar,
		vTabbarItem
	},

	created () {
		this.$store.dispatch("getHomeData");
	}

};
</script>

<style lang="less" scope>
.page-home {
  height: 100%;
	overflow-y: auto;
	
	.main {
		.head_empty_srcoll {
			height: 1rem;
		}

		nav {
			display: flex;
			height: 1rem;
			line-height: 1rem;
			font-size: 0.32rem;
			div {
				flex: 1;
				a {
					display: block;
					position: relative;
					color: #999;
				}
				a.active {
					color: red;
				}
			}
		}

		.footer_empty_srcoll {
			height: 1rem;
		}
	}
	
}


</style>
