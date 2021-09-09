<template>
  <div>
      <listViewTop :playlist="state.playlist" ></listViewTop>
      <playList :playlist="state.playlist"></playList>
  </div>
</template>

<script>
import {getPlaylistDetail} from '@/api/index.js';
import {onMounted,reactive} from 'vue'
import {useRoute} from 'vue-router'
import listViewTop from '@/components/listViewTop.vue'
import playList from '@/components/playList.vue'
import store from '@/store/index.js'
export default {
    name:'listView',
    components:{
        listViewTop,
        playList
    },
    setup(){
        const route = useRoute()
        let state = reactive({
            list:[],
            playlist:{
                creator:{},
                tracks:[]
            }
        })
        onMounted(async () => {
            let id = route.query.id
            let result = await getPlaylistDetail(id);
            state.playlist = result.data.playlist
            store.commit('setPlayList',state.playlist.tracks)
            console.log(result)
        })
        return{
            state
        }
    }
}
</script>

<style>

</style>