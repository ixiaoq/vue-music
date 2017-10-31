<template>
  <div class="home">
      <h1>{{ welcomeMsg }}</h1>
  </div>
</template>

<script>
import axios from "axios"

export default {
    name: "home",
    data () {
        return {
            welcomeMsg: "welcome to you",
        }
    }
}
</script>

<style lang="less" scope>

.home {
    overflow: hidden;
}

h1 {
    margin-top: 50%;
}

</style>
