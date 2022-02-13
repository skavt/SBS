import {SET_BLOGS_DATA, TOGGLE_LOADING} from "./mutation-types";

export default {
    [SET_BLOGS_DATA](state, payload) {
        state.blogs = [...state.blogs, ...payload]
    },
    [TOGGLE_LOADING](state, payload) {
        state.loading = payload
    },
}
