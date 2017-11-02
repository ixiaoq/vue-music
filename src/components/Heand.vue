<template>
    <div class="head-search">
        <span @click="back">后退</span>
        <input v-model="searchMessage" placeholder="歌曲名">
        <span @click="search(searchMessage)">搜索</span>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "MyHeand",
    data () {
        return {
            searchMessage: "",
            input: "林中鸟"
        }
    },
    methods: {
        search (msg) {
            if (!msg) return;
            this.$store.dispatch("searchMusic", msg);
            this.$router.push("search");
        },
        back () {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scope>

.head-search {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: red;
    padding: 5px 0px;

    input {
        width: 70%;
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

</style>
