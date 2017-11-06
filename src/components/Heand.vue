<template>
    <div class="head-search">
        <span v-show="isback" @click="back">后退</span>
        <input @focus="focus" @blur="blur" v-model="searchMessage" placeholder="歌曲/歌手/专辑" >
        <!-- <span v-show="isSearch" @click="search(searchMessage)">搜索</span> -->
    </div>
</template>

<script>

export default {
    name: "MyHeand",
    data () {
        return {
            isback: false,
            isSearch: true,
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
        },
        focus () {
            this.isSearch = true;
        },
        focus () {
            this.isSearch = false;
        }
    }
}
</script>

<style lang="less" scope>

.head-search {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 55px;
    padding: 6px;
    background: white;
    font-size: 16px;

    input {
        padding: 0 10px;
        background: #ddd;
        outline: none;
        border: none;
        border-radius: 5px;
        flex: 1;
        font-size: 16px;
    }

    span {
        flex: 0 0 50px;
        line-height: 43px;
    }
}

</style>
