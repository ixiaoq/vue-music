<template>
	<div @click="changeList()">
		<a href="javascript:;" :class="{'active': isShow}"> {{ title }} </a>
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

  methods: {
    changeList () {
			this.$router.push(this.id);
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
