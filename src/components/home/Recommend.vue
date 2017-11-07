<template>
	<div class="recommend">
		{{ name }}
		{{ currentPage }}
	</div>
</template>

<script>

export default {
	name: "recommend",
	data () {
		return {
			name: "page recommend"
		}
	},

	computed: {
		currentPage () {
			console.log(this);
			return this.$route.params.id
		}
	}

};

</script>

<style lang="less" scope>


</style>
