<template>
  <div class="rank" >
    <div class="rank-item" v-for="item in rankList" :key="item.id">
      <div class="rank-img"><img :src="item.picUrl">{{ item.topTitle }}</div>
    </div>
    {{ rankList }}
  </div>
</template>

<script>
export default {
  name: "rank",

  data () {
    return {
      rankList: require("../../data/rank.json").data.topList
    }
  }
}

</script>

<style lang="less" scope>

.rank {
  text-align: left;

  .rank-item {
  }
  .rank-img {
    float: left;
    width: 10rem;
  }
  img {
    width: 100%;
  }
}

</style>
