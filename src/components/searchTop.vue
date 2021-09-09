<template>
  <div class="searchTop">
      <div class="searchTopNav">
          <div class="back" @click="$router.go(-1)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fanhui"></use>
            </svg>
          </div>
          <div class="right">
             <input type="text" v-model="searchKeyword" :placeholder="placeholder" @keydown.enter="saveKeyWord">
          </div>
      </div>
      <div class="history" v-show="searchSongs.length == 0">
          <div class="historyLeft">
              历史
          </div>
          <div class="historyRight">
              <div @click="historySearch(item)" class="keywordItem" v-for="(item,index) in keywordList" :key="index">{{item}}</div>
              <button type="button"  @click="Refresh">清空历史记录</button>

          </div>
      </div>

    <div class="searchSongs" v-show="searchSongs.length !== 0">
      <div class="searchSongsTop">
          <div class="left">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              <div class="text">
                  <div class="title">播放全部</div>
                  <div class="num">(共{{searchSongs.length}}首)</div>
              </div>
          </div>
         
      </div>
      <div class="list">
          <div class="playItem" v-for="(item,index) in searchSongs" :key="index">
              <div class="left">
                  <div class="index">{{index+1}}</div>
                  <div class="content">
                      <div class="title">{{item.name}}</div>
                      <div class="anthor">
                        
                        <span class="explain">{{item.album.name}}</span>
                      </div>
                  </div>
              </div>
              <div class="right">
                <svg class="icon" aria-hidden="true" @click="setPlay(item,index)">
                    <use xlink:href="#icon-bofang2"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao-dian"></use>
                </svg>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import {searchMusic} from '@/api/index.js'
export default {
    name:'listViewTop',
    data(){
        return{
            placeholder:"陈奕迅",
            keywordList:[],
            searchKeyword:'',
            searchSongs:[]
        }
    },
    beforeMount(){
        this.keywordList = localStorage.keywordList? JSON.parse(localStorage.keywordList): []
    },
    methods:{
        saveKeyWord: async function(){
            this.keywordList.push(this.searchKeyword)
            //清除重复搜索结果
            this.keywordList = Array.from(new Set(this.keywordList))
            //限定历史记录个数
            if(this.keywordList.length > 0){
                this.keywordList = this.keywordList.slice(this.keywordList.length - 10, this.keywordList.length)
            }
            localStorage.keywordList = JSON.stringify(this.keywordList)
            let result = await searchMusic(this.searchKeyword)
            this.searchSongs = result.data.result.songs
        },
        Refresh(){
            window.localStorage.clear();
            this.keywordList = []
        },
        historySearch(keyword){
            this.searchKeyword = keyword;
            this.saveKeyWord()
        },
        //搜索内容播放实现
        setPlay(item,index){
            item.al = item.album;
            item.al.name = item.name
            item.al.picUrl = item.album.artist.img1v1Url
            this.$store.commit('pushPlayList',item)
            this.$store.commit('setPlayIndex',this.$store.state.playlist.length-1)
        }
    }
}
</script>

<style lang="less" scoped>
.searchTop{
    width: 7.5rem;
    height: calc(100vh - 1.0rem);
    overflow: scroll;
    padding: 0 0.4rem;
    .searchTopNav{
        display: flex;
        width: 100%;
        height: 1.0rem;
        padding: 0 0.4rem;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        .icon{
            width: 0.5rem;
            height: 0.5rem;
        }
        .right{
            padding: 0 0 0 0.4rem;
            flex: 1;
            input{
                border: none;
                outline: none;
                border-bottom: 1px solid #666;
                width: 100%;
                height: 0.5rem;
            }
        }
    }
    .history{
        display: flex;
        margin-top: 1.2rem;
        .historyLeft{
            width: 1.2rem;
            height: 0.6rem;
            font-weight: 900;
            margin: 0.2rem 0;
            font-size: 0.35rem;
            line-height: 0.6rem;
        }
        .historyRight{
            color: #666;
            display: flex;
            flex-wrap: wrap;
            flex: 1;
            .keywordItem{
                background-color: #eee;
                height: 0.6rem;
                padding: 0 0.2rem;
                border-radius: 0.4rem;
                line-height: 0.6rem;
                margin: 0.2rem 0.1rem;
                font-size: 0.35rem;
            }
            button{
                background-color: #eee;
                border-radius: 0.4rem;
                height: 0.6rem;
                line-height: 0.6rem;
                font-size: 0.30rem;
                color: gray;
                padding: 0 0.2rem;
                margin: 0.2rem 0.1rem;

            }
        }
    }
    .searchSongs{
    width: 7.5rem;
    padding: 0 0.4rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    position: fixed;
    top: 1.0rem;
    bottom: 1.2rem;
    overflow: scroll;
    .searchSongsTop{
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
}
</style>