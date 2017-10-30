<template>
  <div id="app">
    <my-heand></my-heand>
    <transition>
      <router-view/>
    </transition>
    <div class="audio">
      <audio :src="currentMusicUrl" autoplay controls></audio>
  </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import MyHeand from "./components/Heand"
  import MyAudio from "./components/audio/MyAudio"
  
  export default {
    name: 'app',
    data () {
      return {
        isAudio: false,
        text: "林中鸟"
      }
    },
    components: {
      MyHeand,
      MyAudio
    },

    computed: {
      ...mapState({
        currentMusicUrl (state) {
          return state.search.currentMusicUrl;
        }
      })
    }

  }

</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

html, body {
  font-size: 14px;
  height: 100%;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

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
