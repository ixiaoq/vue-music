<template>
  <div class="home">
      <Rank/>
  </div>
</template>

<script>
import Rank from './home/Rank'

export default {
    name: "Home",
    data () {
        return {
            welcomeMsg: "welcome to you",
        }
    },
    components: {
        Rank
    }
}
</script>

<style lang="less" scope>

.home {
    height: 100%;
    overflow-y: auto;
}

h1 {
    margin-top: 50%;
}

</style>
