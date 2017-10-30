<template>
  <div class="audio">
      <audio :src="currentMusicUrl" autoplay controls></audio>
  </div>
</template>

<script>

export default {
    name: "search",
    props: ["currentMusicUrl"]
}
</script>

<style lang="less" scope>

.audio {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    audio {
        width: 100%;
    }
}

</style>
