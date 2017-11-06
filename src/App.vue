<template>
  <div id="app">
    <router-view/>
    <my-audio v-show="isAudio"></my-audio>
  </div>
</template>

<script>
  import MyAudio from "./components/audio/MyAudio"
  
  export default {
    name: 'app',
    data () {
      return {
        isAudio: true,
        text: "林中鸟"
      }
    },
    components: {
      MyAudio
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
    font-size: 14px;
  }
  body {
    max-width: 750px;
    margin: 0 auto;
  }

  a {
    text-decoration: none;
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


</style>
