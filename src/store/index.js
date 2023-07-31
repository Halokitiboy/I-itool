import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{
        videoInfo:{}
    },
    mutations:{
        setVideoInfo(state, provider){
            state.videoInfo = provider
        }
    },
});
export default store