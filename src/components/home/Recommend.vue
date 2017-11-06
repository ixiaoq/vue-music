<template>
	<div class="recommend">
		{{ $route.params.id }}
	</div>
</template>

<script>

export default {
	name: "recommend",
	
  data() {
    return {
			navClass: true,
      input: "林中鸟"
    };
	}
};
</script>

<style lang="less" scope>
.home {
  height: 100%;
	overflow-y: auto;
	
	
}


</style>
