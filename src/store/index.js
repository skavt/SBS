import Vuex from "vuex";
import Vue from 'vue';

import auth from './modules/auth'
import blog from './modules/blog'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        blog,
    }
});