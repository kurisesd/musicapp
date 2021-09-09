<template>
  <div class="listViewTop">
      <img class="bg" :src="playlist.coverImgUrl">
      <div class="listViewTopNav">
          <div class="back" @click="$router.go(-1)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fanhui"></use>
            </svg>
            <span>歌单</span>
          </div>
          <div class="right">
              <svg class="icon search" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
              </svg>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao-dian"></use>
              </svg>
          </div>
      </div>
      <div class="content">
          <div class="contentLeft">
            <img :src="playlist.coverImgUrl">
            <span class="count">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon-"></use>
                </svg>
                <span>{{changeValue(playlist.playCount)}}</span>
            </span>
          </div>
          <div class="contentRight">
              <h3>{{playlist.name}}</h3>
              <div class="author">
                    <img :src="playlist.creator.avatarUrl" class="header">
                    <span>{{playlist.creator.nickname}}</span>
              </div>
              <div class="description">
                  {{playlist.description}}
              </div>
          </div>
      </div>
      <div class="iconList">
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun"></use>
            </svg>
            <span>{{playlist.commentCount}}</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{playlist.shareCount}}</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai"></use>
            </svg>
            <span>下载</span>
        </div>
        <div class="iconItem">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-checkbox"></use>
            </svg>
            <span>多选</span>
        </div>
       </div>
  </div>
</template>

<script>
export default {
    name:'listViewTop',
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
        }
    }
}
</script>

<style lang="less" scoped>
.listViewTop{
    width: 7.5rem;
    padding: 0 0.4rem;
    .bg{
        position: fixed;
        left: 0;
        top: 0;
        width: 7.5rem;
        height: auto;
        z-index: -1;
        filter: blur(40px);//图片模糊度
    }
    .listViewTopNav{
        display: flex;
        justify-content: space-between;//左右对齐布局
        height: 1.2rem;
        //align-items：垂直方向对齐
        align-items: center;
        font-size: 0.35rem;
        .icon{
            width: 0.7rem;
            height: 0.7rem;
            fill:#fff;
        }
        span{
            margin-left: 0.4rem;
            margin-top: 0.1rem;
        }
        .search{
            margin-right: 0.45rem;
        }
    }
    .back,.right{
        display: flex;
        color: #fff;
    }
    .content{
        display: flex;
        justify-content: space-between;
        padding: 0.6rem 0;
        .contentLeft{
            position: relative;
            img{
                width: 2.8rem;
                height: 2.8rem;
                border-radius: 0.1rem;
            }
            .count{
                position: absolute;
                right: 0.1rem;
                top: 0.1rem;
                font-size: 0.24rem;
                color: #aaa;
                display: flex;
                align-items: center;
                font-weight: 900;
                .icon{
                    fill: #ccc;
                }
            }
        }
        .contentRight{
            width: 3.5rem;
            h3{
                color: #fff;
                font-size: 0.4rem;
            }
            .author{
                display: flex;
                align-items: center;
                margin: 0.2rem 0;
                img{
                    width: 0.6rem;
                    height: 0.6rem;
                    border-radius: 0.3rem;
                    margin-right: 0.2rem;
                }
                span{
                    color: #ccc;
                    font-size: 0.28rem;
                }
            }
            .description{
                font-size: 0.24rem;
                color: #ccc;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                //文字多出的省略并只显示两行
            }
        }
    }
    .iconList{
        display: flex;
        justify-content: space-between;
        .iconItem{
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                width: 0.6rem;
                height: 0.6rem;
                fill: #fff;
            }
            span{
                font-size: 0.28rem;
                padding-top: 0.2rem;
                color: #fff;
            }
        }
    }
}
</style>