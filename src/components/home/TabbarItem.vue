<template>
	<div class="tabbar-item"  @click="changeHomeState()">
		<router-link :to="{name: id, params: {id: id}}" :class="{'active': isShow}">{{ title }} </router-link>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
		id: {
			type: String,
			required: true
		},
		
		title: {
			type: String,
			required: true
		}
	},
	
	computed: {
		isShow () {
			return this.id == this.$store.state.home.honePageState;
		}
	},

	methods: {
		changeHomeState () {
			this.$store.dispatch("changeHomePage", this.id);
		}
	},
	
};
</script>

<style lang="less">
.tabbar-item {
  flex: 1;
  a {
    display: block;
    position: relative;
		color: #999;

    &.active {
      color: red;
    }
  }
}
</style>
