import {SET_BLOGS_DATA, TOGGLE_LOADING} from "./mutation-types";

export async function getAllBlog({commit}) {
    commit(TOGGLE_LOADING, true)
    const data = localStorage.getItem('BLOG_DATA') || '[]'
    commit(SET_BLOGS_DATA, JSON.parse(data))
    commit(TOGGLE_LOADING, false)
}