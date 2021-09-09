<template>
  <div>
      <div class="topNav">
      <div class="topLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao1"></use>
        </svg>
      </div>
      <div class="topCenter">
        <span class="navBtn" @click="$router.push('me')">我的</span>
        <span class="navBtn active">发现</span>
        <span class="navBtn">云村</span>
        <span class="navBtn">视频</span>
      </div>
      <div class="topRight" @click="$router.push('/searchview')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
      <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gedan"></use>
      </svg> -->
    </div>
  </div>
</template>

<script>
export default {
    name:'topNav'
}
</script>

<style lang="less" scoped>
.topNav{
    width: 7.5rem;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon{
        width: 0.5rem;
        height: 0.5rem;
    }
    .topCenter{
        width: 4.5rem;
        display: flex;
        justify-content: space-around;
        .active{
            font-weight: 900;
        }
    }
}
span{
    font-size: 0.35rem;
}
</style>