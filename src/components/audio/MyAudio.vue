<template>
  <div class="audio" >
    <audio :src="currentMusicUrl" autoplay controls></audio>
  </div>
</template>

<script>
    import { mapState } from "vuex"

    export default {
        name: "search",
        props: ["currentMusicUrl"],
        computed: {
        ...mapState({
            currentMusicUrl (state) {
            return state.search.currentMusicUrl;
            }
        })
        }
    }
</script>

<style lang="less" scope>

.audio {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 32px;
    overflow: hidden;
    audio {
        width: 100%;
    }
}

</style>
