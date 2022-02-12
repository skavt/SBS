import authService from "../../../core/services/authService";
import {REMOVE_CURRENT_USER, SET_CURRENT_USER} from "./mutation-types";

export async function login({state, commit}, params) {
    if (state.email === params.email && state.password === params.password) {
        authService.setToken(state.authToken)
        const user = {
            firstName: 'Admin',
            lastName: 'Admin',
            imageUrl: '/assets/avatar.svg'
        }
        commit(SET_CURRENT_USER, user)
        return {
            success: true,
            body: {}
        }
    }
    return {
        success: false,
        body: {
            password: 'Username or Password is incorrect'
        }
    }
}

export async function logout({commit}) {
    authService.logout()
    commit(REMOVE_CURRENT_USER)
}