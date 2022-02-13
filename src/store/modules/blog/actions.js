import {
    ADD_NEW_BLOG,
    DELETE_BLOG,
    HIDE_BLOG_MODAL,
    SET_BLOGS_DATA,
    SHOW_BLOG_MODAL,
    TOGGLE_LOADING,
    TOGGLE_MODAL_LOADING,
    UPDATE_BLOG
} from "./mutation-types";

export async function getAllBlog({commit}) {
    commit(TOGGLE_LOADING, true)
    const data = localStorage.getItem('BLOG_DATA') || '[]'
    commit(SET_BLOGS_DATA, JSON.parse(data))
    commit(TOGGLE_LOADING, false)
}

export async function showBlogModal({commit}, params = {}) {
    commit(SHOW_BLOG_MODAL, params)
}

export async function hideBlogModal({commit}) {
    commit(HIDE_BLOG_MODAL)
}

export async function createNewBlog({state, commit}, params) {
    commit(TOGGLE_MODAL_LOADING, true)
    commit(ADD_NEW_BLOG, params)
    saveBlogData(state.blogs)
    commit(TOGGLE_MODAL_LOADING, false)
    return {success: true}
}

export async function updateBlog({state, commit}, params) {
    commit(TOGGLE_MODAL_LOADING, true)
    commit(UPDATE_BLOG, params)
    saveBlogData(state.blogs)
    commit(TOGGLE_MODAL_LOADING, false)
    return {success: true}
}

export async function deleteBlog({state, commit}, blogUuid) {
    commit(DELETE_BLOG, blogUuid)
    saveBlogData(state.blogs)
    return {success: true}
}

function saveBlogData(data = []) {
    localStorage.setItem('BLOG_DATA', JSON.stringify(data))
}