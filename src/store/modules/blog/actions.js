import {
    ADD_NEW_BLOG,
    DELETE_BLOG,
    DELETE_BLOG_COMMENTS,
    HIDE_BLOG_MODAL,
    REMOVE_CURRENT_BLOG,
    SET_BLOGS_DATA,
    SET_CURRENT_BLOG,
    SHOW_BLOG_MODAL,
    TOGGLE_BLOG_VIEW_LOADING,
    TOGGLE_LOADING,
    TOGGLE_MODAL_LOADING,
    UPDATE_BLOG,
    UPDATE_BLOG_COMMENTS
} from "./mutation-types";

export async function getAllBlog({commit}) {
    commit(TOGGLE_LOADING, true)
    const data = localStorage.getItem('BLOG_DATA') || '[]'
    commit(SET_BLOGS_DATA, JSON.parse(data))
    commit(TOGGLE_LOADING, false)
}

export async function getBlogByUuid({commit, dispatch}, blogUuid) {
    commit(TOGGLE_BLOG_VIEW_LOADING, true)
    dispatch('getAllBlog')
    commit(SET_CURRENT_BLOG, blogUuid)
    commit(TOGGLE_BLOG_VIEW_LOADING, false)
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

export async function removeCurrentBlog({commit}) {
    commit(REMOVE_CURRENT_BLOG)
}

export async function addComment({state, commit}, params) {
    commit(UPDATE_BLOG_COMMENTS, params)
    saveBlogData(state.blogs)
}

export async function deleteComment({state, commit}, params) {
    commit(DELETE_BLOG_COMMENTS, params)
    saveBlogData(state.blogs)
}

function saveBlogData(data = []) {
    localStorage.setItem('BLOG_DATA', JSON.stringify(data))
}