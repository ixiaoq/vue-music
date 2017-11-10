<template>
	<div class="recommend">
		<swiper class="mySwipe" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in homeData.focus" :key="index">
        <img class="swiper-img" :src="item.pic" />
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper> 

		<div class="hot-list">
      <h3 class="hot-title">热门歌单</h3>
      <div class="list-content">
          <div class="hotdiss-item" 
            v-for="(item, index) in homeData.hotdiss.list"
						:key="index"
						v-if="index < hotShow">
            <div class="item-img">
              <img v-lazy="item.imgurl"/>
              <div class="item-listennum">
                <div class="icon">
                  <i class="icon-erji"></i>
                </div>
                <span class="listennum">{{(item.listennum/10000).toFixed(1)+'万'}}</span>
              </div>
            </div>
            <span class="item-tag item-dissname">{{item.dissname}}</span>
            <span class="item-tag item-author">{{item.author}}</span>
          </div>
      </div>
    </div>

	</div>
</template>

<script>
import { mapState } from "vuex";

import { swiper, swiperSlide } from "vue-awesome-swiper";
require("swiper/dist/css/swiper.css");

export default {
  name: "Recommend",
  data() {
    return {
			hotShow: 12,
      swiperOption: {
        autoplay: 3000,
        loop: true,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        autoplayDisableOnInteraction: false
      }
    };
  },

  components: {
    swiper,
    swiperSlide
  },
  
  mounted () {
    this.$store.dispatch("changeHomePage", "recommend");
  },

  computed: {
    homeData() {
      return this.$store.state.home.homeData;
    }
  }
};
</script>

<style lang="less" scope>
.recommend {
  .swiper-img {
    width: 100%;
  }
  .swiper-pagination-bullet-active {
    background-color: #fff;
	}
	
	.hot-list {
		h3 {
			height: 50px;
			line-height: 50px;
      font-weight: normal;
      font-size: 0.16rem;
		}

		.list-content {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.hotdiss-item {
				width: 32%;
				margin-bottom: 10px;

				.item-listennum {
					position: relative;
					display: flex;
					.listennum {
            padding: 0 5px;
            font-size: 0.12rem;
					}
				}

				.item-tag {
					display: block;
					padding: 0 5px;
					text-align: left;
					font-size: 0.14rem;
				}
				.item-dissname{
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.item-author {
					font-size: 12px;
				}
			}
		}
	}

}
</style>
