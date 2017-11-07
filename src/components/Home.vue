<template>
  <div class="page-home">
    <v-search />
		<div class="main">
			<div class="top_scroll"></div>
			<v-tabbar>
				<v-tabbar-item id="recommend" title="推荐" :current-id="currentName"></v-tabbar-item>
				<v-tabbar-item id="rank" title="排行榜" :current-id="currentName"></v-tabbar-item>
			</v-tabbar>

			<router-view/>
			
			<div class="bottom_srcoll"></div>
		</div>
  </div>
</template>

<script>
import vSearch from "./home/Search";
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
	
  computed: {
    currentName() {
			return this.$route.params.id;
    }
	}

};
</script>

<style lang="less" scope>
.page-home {
  height: 100%;
	overflow-y: auto;
	
	.main {
		.top_scroll {
			height: 55px;
		}

		nav {
			display: flex;
			height: 50px;
			line-height: 50px;
			font-size: 16px;
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

		.bottom_srcoll {
			height: 40px;
		}
	}
	
}


</style>
