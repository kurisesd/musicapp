<template>
  <div class="playController">
      <div class="left" @click="show=!show">
          <img :src="playlist[playCurrentIndex].al.picUrl" alt="">
          <div class="content">
              <div class="title">{{playlist[playCurrentIndex].al.name}}</div>
              <div class="tips">横滑可以切换上下一首歌</div>
          </div>
      </div>
      <div class="right">
          <svg v-if="paused" class="icon" aria-hidden="true" @click="play">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg v-else class="icon" aria-hidden="true" @click="play">
            <use xlink:href="#icon-iconfront-"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofangliebiao"></use>
          </svg>
      </div>
      <playMusic 
      @isBack="showMusic" 
      @cut="showList"
      v-show="show" 
      :paused="paused"
      :play="play"
      :playDetail="playlist[playCurrentIndex]"
      />
      <audio ref="audio" :src="`http://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import playMusic from '@/components/playMusic.vue'
export default {
    name:'playController',
    data(){
      return{
        paused:true,
        show:false
      }
    },
    components:{
      playMusic
    },
    computed:{
        ...mapState(['playlist','playCurrentIndex'])
    },
    mounted(){
      /* console.log(this.$refs.audio) */
      this.$store.dispatch('reqLyric',{id:this.playlist[this.playCurrentIndex].id})
    },
    updated(){
      console.log(this.playlist[this.playCurrentIndex])
      this.$store.dispatch('reqLyric',{id:this.playlist[this.playCurrentIndex].id})
    },
    methods:{
      //播放方法
      play(){
        //暂停时点击播放，否则暂停
        if(this.$refs.audio.paused){
          this.$refs.audio.play()
          this.paused = false
          this.UpdateTime()
        }else{
          this.$refs.audio.pause()
          this.paused = true
          clearInterval(this.$store.state.id)
        }
      },
      showMusic(data){
        this.paused = data
        this.show = !this.show
        this.play()
      },
      showList(data){
        this.paused = data
        this.play()
      },
      //滚动歌词时更新时间
      UpdateTime(){
        this.$store.state.id = setInterval(()=>{
          this.$store.commit('setCurrentTime',this.$refs.audio.currentTime)
        },1000)
        console.log('时间是：',this.$refs.audio.currentTime)
      }
    },
}
</script>

<style lang="less">
.playController{
  width: 100%;
  height: 1.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  background-color: #fff;
  .left{
    display: flex;
    padding: 0 0.2rem;
    img{
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
    }
    .content{
      padding: 0 0.2rem;
      .title{
        font-size: 0.3rem;
      }
      .tips{
        margin-top: 0.1rem;
        font-size: 0.2rem;
        color: #999;
      }
    }
  }
  .right{
    .icon{
      margin: 0 0.2rem;
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
</style>