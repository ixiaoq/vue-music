<template>
  <div class="search">
      <div class="head-search">
          <input v-model="inputMessage" placeholder="单曲">
          <span @click="search(inputMessage)">搜索</span>
      </div>
      <ul>
          <li v-for="item in serarchList" :key="item.id">
              <img style="width: 50px;" :src="item.al.picUrl" @click="requestUrl(item.id)"> {{ item.al.name }}
          </li>
      </ul>
      <audio :src="audioUrl" autoplay controls></audio>
  </div>
</template>

<script>
import axios from "axios"

export default {
    name: "search",
    data () {
        return {
            inputMessage: "",
            serarchList: [],
            showTotal: 10,
            audioUrl: "",
            lyric: []
        }
    },
    methods: {
        search (msg) {
            if (!msg) return;

            var url = "https://api.imjad.cn/cloudmusic/";
            var data = {
                type: "search",
                s: msg
            };

            axios
            .get(url, {
                params: data
            })
            .then(res => {
                if (res.data.code === 200 && res.data.result.songCount) {
                    var musicList = res.data.result.songs;
                    musicList.length = this.showTotal;
                    this.serarchList = musicList
                }
            });
        },
        requestUrl (id) {
            var url = "https://api.imjad.cn/cloudmusic/";
            var data = {
                type: "song",
                id: id
            };

            axios
            .get(url, {
                params: data
            })
            .then(res => {
                if (res.data.code === 200) {
                    this.audioUrl = res.data.data[0].url;
                }
            });

            var lyricData = {
                type: "lyric",
                id: id  //林中鸟
            }

            axios
            .get(url, {
                params: lyricData
            })
            .then(res => {
                if (res.data.code === 200) {
                    this.lyric = res.data.lrc.lyric.split('\n');
                }
            });

        }
    }
}
</script>

<style lang="less" scope>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.head-search {
    height: 40px;
    background: red;
    padding: 5px 10px;

    input {
        width: 85%;
        height: 100%;
        padding: 0 10px;
        background: #fff;
        outline: none;
        border: 1px solid #ccc;
        border-radius: 15px;
    }

    span {
        display: inline-block;
        width: 13%;
        height: 100%;
        padding: 5px;
        vertical-align: top;
    }
}

ul {
    list-style: none;
    text-align: left;
    padding: 6px 10px;
    
    li {
        margin-bottom: 6px;
    }
}

audio {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}

</style>
