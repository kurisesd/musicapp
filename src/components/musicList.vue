<template>
  <div class="musicList">
      <div class="musicListTop">
          <div class="title">发现好歌单</div>
          <div class="more">查看更多</div>
      </div>
      <div class="mlist">
          <div class="swiper-container" id="musicSwiper">
            <div class="swiper-wrapper">
                <router-link :to="{path:'/listview',query:{id:item.id}}" class="swiper-slide" v-for="(item,index) in state.musicList" :key="index">
                    <img :src="item.picUrl" :alt="item.name">
                    <span class="name">{{item.name}}</span>
                    <span class="count">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-icon-"></use>
                        </svg>
                        <span>{{changeValue(item.playCount)}}</span>
                    </span>
                </router-link> 
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css' 
import Swiper from 'swiper';
import {getMusicList} from '@/api/index.js'
import {reactive,onMounted,onUpdated} from 'vue'

//vue3的setup方式实现好歌单
export default {
    setup(){
        let state = reactive({musicList:[]})
        function changeValue(num){
            let res = 0
            if(num >= 100000000){
                res = num/100000000
                res = res.toFixed(2) + '亿'
            }else if(num >= 10000){
                res = num/10000
                res = res.toFixed(2) + '万'
            }
            return res
        }
        onMounted(async ()=>{
            let result =  await getMusicList()
            state.musicList = result.data.result;
            //获取歌单
        })
        onUpdated(()=>{
            var swiper = new Swiper('#musicSwiper', {
            slidesPerView: 3,
            spaceBetween: 10,
            freeMode: true, 
            //轮播图下方的点
            /* pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }, */
            });
        })
        return {
            state,changeValue
        }
    }
}

/* export default {
    name:'musicList',
    data(){
        return{
            musicList:[]
        }
    },
    mounted:async function(){
      let result =  await getMusicList()
      this.musicList = result.data.result
    },
    updated(){
        var swiper = new Swiper('#musicSwiper', {
        slidesPerView: 3,
        spaceBetween: 10,
        freeMode: true, */
        //轮播图下方的点
        /* pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }, */
    /*   });
    },
    methods:{
        changeValue(num){
            let res = 0
            if(num >= 100000000){
                res = num/100000000
                res = res.toFixed(2) + '亿'
            }else if(num >= 10000){
                res = num/10000
                res = res.toFixed(2) + '万'
            }
            return res
        }
    }
} */
</script>

<style lang="less" scoped>
.musicList{
    width: 7.5rem;
    padding: 0 0.4rem;
    .musicListTop{
        display: flex;
        justify-content: space-between;
        height: 1.0rem;
        align-items: center;
        .title{
            font-size: 0.4rem;
            font-weight: 900;
        }
        .more{
            border: 1px solid #ccc;
            height: 0.5rem;
            width: 1.2rem;
            border-radius: 0.2rem;
            font-size: 0.24rem;
            text-align: center;
            line-height: 0.5rem;
        }
    }
    .mlist{
        .swiper-container{
            width: 100%;
            height: 3.2rem; 
        }
        .swiper-slide{
            display: flex;
            flex-direction: column;
            position: relative;
            img{
                width: 100%;
                height: auto;
                border-radius: 0.1rem; 
            }
            .name{
                height: 0.6rem;
                width: 100%;
                font-size: 0.25rem;
            }
            .count{
                position: absolute;
                right: 0.1rem;
                top: 0.1rem;
                font-size: 0.24rem;
                color: #ccc;
                display: flex;
                align-items: center;
                .icon{
                    fill: #ccc;
                }
            }
        }
    }
}
</style>