import {REMOVE_CURRENT_USER, SET_CURRENT_USER} from "./mutation-types";

export default {
    [SET_CURRENT_USER](state, payload) {
        state.currentUser = {...payload}
    },
    [REMOVE_CURRENT_USER](state) {
        state.currentUser = {}
    }
}
