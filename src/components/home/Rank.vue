<template>
  <div class="rank" >
    <div class="rank-item" v-for="item in topList" :key="item.id" @click="getRandList(item.id)" v-if="item.id !== 201">
      <div class="rank-img">
        <img v-lazy="item.picUrl">
        <span>{{ parseInt((item.listenCount / 10000))+'万' }}</span>
      </div>
      <div class="rnak-content">
        <p class="title">{{ item.topTitle }}</p>
        <div class="song-item" 
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
  padding: 0.20rem;
  text-align: left;
  background: #eee;

  .rank-item {
    display: flex;
    margin-bottom: 0.20rem;
    border-radius: 0.1rem;
    background: #fff;
    overflow: hidden;
    &:last-of-type {
      margin-bottom: 0;
    }

    .rank-img {
      position: relative;
      width: 1.8rem;
      height: 1.8rem;
      img {
        height: 100%;
        width: 100%;
      }
      span {
        position: absolute;
        left: 0.10rem;
        bottom: 0;
        color: #fff;
        line-height: 0.40rem;
        height: 0.40rem;
        font-size: 0.24rem;
        text-align: right;
      }
    }
    .rnak-content {
      flex: 1;
      display: flex;
      padding: 0.1rem 0.2rem;
      text-align: left;
      justify-content: space-around;
      flex-direction: column;
      .title {
        font-size: 0.36rem;
        height: 0.50rem;
        line-height: 0.50rem;
        font-weight: normal;
        color: #000000;
      }
      .song-item {
        width: 4.8rem;
        height: 0.30rem;
        line-height: 0.30rem;
        font-size: 0.28rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
        .singername {
          font-size: 0.24rem;
          color: #666;
        }
      }
    }
    
    
  }
  
}
</style>
