<template>
  <div class="playlist">
      <div class="playlistTop">
          <div class="left">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              <div class="text">
                  <div class="title">播放全部</div>
                  <div class="num">(共{{playlist.tracks.length}}首)</div>
              </div>
          </div>
          <div class="btn">
              + 收藏 ({{changeValue(playlist.subscribedCount)}})
          </div>
      </div>
      <div class="list">
          <div class="playItem" v-for="(item,index) in playlist.tracks" :key="index">
              <div class="left">
                  <div class="index">{{index+1}}</div>
                  <div class="content" @click="setPlayIndex(index)">
                      <div class="title">{{item.name}}</div>
                      <div class="anthor">
                        <!-- <span class="tag" v-for="(tag,i) in playlist.tags" :key="i">{{tag}}</span> -->
                        <span class="explain">{{item.al.name}}</span>
                      </div>
                  </div>
              </div>
              <div class="right">
                <svg class="icon" aria-hidden="true" @click="setPlayIndex(index)">
                    <use xlink:href="#icon-bofang2"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao-dian"></use>
                </svg>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name:'playList',
    props:['playlist'],
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
        },
        ...mapMutations(['setPlayIndex'])
    }
}
</script>

<style lang="less" scoped>
.playlist{
    width: 7.5rem;
    padding: 0 0.4rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    margin-top: 0.4rem;
    .playlistTop{
        display: flex;
        justify-content: space-between;
        height: 1.0rem;
        align-items: center;
        .left{
            display: flex;
            align-items: center;
            .icon{
                width: 0.5rem;
                height: 0.5rem;
                margin-right: 0.2rem;
            }
            .title{
                font-size: 0.4rem;
                font-weight: 900;
            }
            .num{
                font-size: 0.3rem;
                color: #666;
            }
            .text{
                display: flex;
                align-items: center;
            }
        }
        .btn{
            font-size: 0.3rem;
            color: #fff;
            background-color: orangered;
            line-height: 0.6rem;
            padding: 0.1rem;
            border-radius: 0.4rem;
        }
    }
    .list{
        .playItem{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1rem;
            margin-top: 0.2rem;
            .left{
                display: flex;
                align-items: center;
                color: #666;
                .index{
                    width: 0.4rem;
                }
                .content{
                    margin-left: 0.4rem;
                }
                .title{
                    font-size: 0.3rem;
                    color: black;
                    font-weight: 900; 
                    margin-bottom: -0.1rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1; //这边的1指的是一行
                    -webkit-box-orient: vertical;
                }
                .anthor{
                    .explain{
                        font-size: 0.2rem;
                        white-space: nowrap;  /*强制span不换行*/
                        display: inline-block;  /*将span当做块级元素对待*/
                        width: 200px;  /*限制宽度*/
                        overflow: hidden;  /*超出宽度部分隐藏*/
                        text-overflow: ellipsis;  /*超出部分以点号代替*/
                        line-height: 0.9;  /*数字与之前的文字对齐*/
                    }
                    .tag{
                        margin-right: 0.1rem;
                        font-size: 0.1rem;
                        color: orangered;
                        border: 1px solid orangered;
                    }
                }
            }
            .right{
                .icon{
                    margin: 0 0.1rem;
                    width: 0.4rem;
                    height: 0.4rem;
                }
            }
        }
    }
}

</style>