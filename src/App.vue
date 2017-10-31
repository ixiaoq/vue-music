<template>
  <div id="app">
    <my-heand></my-heand>
    <transition>
      <router-view/>
    </transition>
    <my-audio v-show="isAudio"></my-audio>
  </div>
</template>

<script>
  import MyHeand from "./components/Heand"
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
      MyHeand,
      MyAudio
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
  overflow: hidden;
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

</style>
