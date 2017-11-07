<template>
	<div class="tabbar-item">
		<router-link :to="id" :class="{'active': isShow}">{{ title }} </router-link>
	</div>
</template>

<script>

export default {
  props: {
		id: {
			type: String,
			required: true
		},
		
		title: {
			type: String,
			required: true
		},

		currentId: {
			type: String,
			required: true
		}
	},

	computed: {
		isShow () {
			return this.id === this.currentId
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
