<template>
  <div class="rank" >
    <div class="rank-item" v-for="item in topList" :key="item.id" @click="getRandList(item.id)" v-if="item.id !== 201">
      <div class="rank-img">
        <img v-lazy="item.picUrl">
        <span>{{ parseInt((item.listenCount / 10000))+'万' }}</span>
      </div>
      <div class="rnak-content">
        <p class="title">{{ item.topTitle }}</p>
        <div class="song-item txt_hide" 
          v-for="( song, index ) in item.songList" :key="song.id">
          {{ index + 1 }} {{ song.songname }} - <span class="singername">{{ song.singername }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rank",

  mounted () {
    this.$store.dispatch("getTopList");
    this.$store.dispatch("changeHomePage", "rank");
  },
  
  computed: {
    topList() {
      return this.$store.state.home.topListData;
    }
  },

  methods: {
    getRandList (id) {
      this.$router.push("/rank/" + id);
    }
  }

};
</script>

<style lang="less" scope>
.rank {
  padding: 0.10rem;
  text-align: left;
  font-size: 0.14rem;
  background: #eee;

  .rank-item {
    display: flex;
    margin-bottom: 0.10rem;
    border-radius: 0.08rem;
    background: #fff;
    overflow: hidden;

    .rank-img {
      position: relative;
      width: 1rem;
      height: 1rem;
      img {
        height: 100%;
        width: 100%;
      }
      span {
        position: absolute;
        left: 5px;
        bottom: 0;
        color: #fff;
        line-height: 20px;
        height: 20px;
        font-size: 12px;
        text-align: right;
      }
    }
    .rnak-content {
      flex: 1;
      display: flex;
      padding: 0.05rem 0.1rem 0;
      text-align: left;
      justify-content: space-around;
      flex-direction: column;
      .title {
        font-size: 16px;
        font-weight: normal;
        color: #000000;
      }
      .song-item {
        height: 0.20rem;
        line-height: 0.20rem;
        font-size: 0.14rem;
        overflow: hidden;
        
        .singername {
          font-size: 0.12rem;
          color: #666;
        }
      }
    }
    
    
  }
  
}
</style>
