<template>
  <div class="search-music-list">
      搜索结果：
      <ul>
        <li v-for="item in searchMusicList" :key="item.id" @click="requestUrl(item.id)">
            <img style="width: 50px;" 
                :src="item.al.picUrl"
            > {{ item.al.name }}
        </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    name: "SearchList",
    data () {
        return {
            showTotal: 10,
            text: "林中鸟"
        }
    },
    computed: {
        ...mapGetters(["searchMusicList"])
    },
    methods: {
        requestUrl (id) {
            if (!id) return;
            this.$store.dispatch("currentMusicUrl", id);
            this.$store.dispatch("currentMusicLyric", id);
        }
    }
}
</script>

<style lang="less" scope>

.search-music-list {
    height: 100%;
    padding: 46px 10px 32px;
    text-align: left;
    overflow-y: auto;
}

ul {
    margin-top: 5px;
    list-style: none;
    text-align: left;
    
    li {
        margin-bottom: 5px;
    }
}

</style>
