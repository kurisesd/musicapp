<template>
  <div class="playMusic">
      <div class="bg" :style="{backgroundImage:`url(${playDetail.al.picUrl})`}"></div>
      <div class="playTop">
          <div class="back" @click="back">
              <svg class="iconBack" aria-hidden="true" @click="play">
                <use xlink:href="#icon-fanhui"></use>
              </svg>
          </div>
          <div class="center">
              <div class="title">
                  <marquee behavior="scroll" direction="left">
                      {{playDetail.al.name}}
                  </marquee>
              </div>
          </div>
          <div class="share">
              <svg class="icon" aria-hidden="true" @click="play">
                <use xlink:href="#icon-fenxiang"></use>
              </svg>
          </div>
      </div>
      <div class="playContent" v-show="!isLyric">
          <img class="needle" :class="{active:!paused}" src="@/assets/img/needle-ab.png" alt="">
          <img class="disc" src="@/assets/img/d7e4e3a244701ee85fecb5d4f6b5bd57.png" alt="">
          <img class="playImg" :src="playDetail.al.picUrl" alt="">
      </div>
      <!-- 歌词区域 -->
      <div class="playLyric" v-show="isLyric" ref="playLyric">
          <!-- 以换行分割单词进行显示 -->
          <p :class="{active:(currentTime*1000 >= item.pre&&currentTime*1000 < item.time)}" v-for="(item,index) in $store.getters.lyricList" :key="index">{{item.lyric}}</p>
      </div>
      <div class="progress"></div>
      <div class="playFooter">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunhuan"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
          <svg v-if="paused" class="icon play" aria-hidden="true" @click="play">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          <svg v-else class="icon play" aria-hidden="true" @click="play">
            <use xlink:href="#icon-poweroff-circle-fill"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="goPlay(1)">
            <use xlink:href="#icon-xiayigexiayishou"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofangliebiao"></use>
          </svg>
      </div>
  </div>
</template>

<script>
import {watch} from 'vue'
import {mapState} from 'vuex'
export default {
    name:'playMusic',
    props:['playDetail','paused','play'],
    data(){
        return{
            isLyric:true
        }
    },
    methods:{
        back(){
            this.$emit('isBack',!this.paused)
        },
        cut(){
            this.$emit('cut',!this.paused)
        },
        goPlay(num){
            let index = this.playCurrentIndex + num
            if(index < 0){
                index = this.playlist.length - 1
            }
            else if(index == this.playlist.length){
                index = 0
            }
            this.$store.commit('setPlayIndex',index)
        }
    },
    computed:{
        ...mapState(['lyric','currentTime','playCurrentIndex','playlist']),     
    },
    watch:{
        //歌词随滚动条滚动
        currentTime(newValue){
            /* console.log('newValue是：',newValue) */
            console.log([this.$refs.playLyric])
            let p = document.querySelector('p.active')
            let offsetTop = p.offsetTop;
            this.$refs.playLyric.scrollTop = p.offsetTop;
        }
    }
}
</script>

<style lang="less" scoped>
.playMusic{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    .bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-size: auto 100%;
        filter: blur(50px);
        background-position: center;
    }
    .playTop{
        display: flex;
        width: 7.5rem;
        height: 1.2rem;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        padding: 0 0.4rem;
        .icon{
            fill: #fff;
            width: 0.5rem;
            height: 0.5rem;
        }
        .iconBack{
            width: 0.7rem;
            height: 0.7rem;
            fill: #fff;
        }
        .center{
            .title{
                font-size: 0.4rem;
                 marquee{
                    flex: 1;
                    width: 5rem;
                }
            }
        }
    }
    .playContent{
        position: relative;
        width: 7.5rem;
        height: 7.5rem;
        left: 0;
        top: 1.5rem;
        .needle{
            width: 2.2rem;
            height: auto;
            position: absolute;
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(-20deg);
            z-index: 10;
            transition: all 1s;
        }
        .needle.active{
            width: 2.2rem;
            height: auto;
            position: absolute;
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(0deg);
            z-index: 10;
            transition: all 1s;
        }
        .disc{
            width: 5.2rem;
            height: auto;
            position: absolute;
            left: calc(50% - 2.6rem);
            top: 1.8rem;
        }
        .playImg{
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            left: calc(50% - 1.6rem);
            top: 2.8rem;
        }
    }
    .playFooter{
        width: 7.5rem;
        height: 1.5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        .icon{
            width: 0.5rem;
            height: 0.5rem;
            fill: #fff;
        }
        .play.icon{
            width: 0.9rem;
            height: 0.9rem;
        }
    }
   .playLyric{
        position: relative;
        width: 7.5rem;
        height: 8.0rem;
        left: 0;
        top: calc(50% - 4rem);
        overflow: scroll;
        text-align: center;
        color: #fff;
        font-size: 0.35rem;
        .active{
            color: red;
        }
   }
}
</style>