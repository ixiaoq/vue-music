<template>
	<div>
		<a href="javascript:;" :class="{'active': isActive}" @click="navActive()"> {{ title }} </a>
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
		isActive: {
			type: Boolean,
			required: true
		}
	},

  methods: {
    navActive: () => {
			console.log(this);
			this.$emit("changeclass", this.isActive);
		}
  }
};
</script>

<style lang="less">
div {
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
