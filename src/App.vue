<template>
  <div id="app">
    <router-view></router-view>
    
    <my-audio v-show="isAudio"></my-audio>
    <audio-list ref="audioList"></audio-list>
    <audio-play-page ref="audioPlayPage"></audio-play-page>
  </div>
</template>

<script>
  import MyAudio from "./components/audio/Audio"
  import AudioList from "./components/audio/AudioList"
  import AudioPlayPage from "./components/audio/AudioPlayPage"
  
  export default {
    name: 'app',
    data () {
      return {
        isAudio: true,
        text: "林中鸟"
      }
    },
    components: {
      MyAudio,
      AudioList,
      AudioPlayPage
    }
  }

</script>

<style lang="less">

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
    font-size: 100px;
  }
  body {
    max-width: 750px;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
  }

  img {
    display: block;
    width: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .txt_hide{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-break: break-all;
  }

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
img[lazy=loaded] {
  animation: fadeIn 1s;
}

img[lazy=error] {
  border-radius: 2px;
  animation: fadeIn 1s;
}

</style>
