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
import moment from "moment";

export default {
    [SET_BLOGS_DATA](state, payload) {
        state.blogs = [...payload].sort((a, b) => {
            const aValue = moment(a.updatedAt).valueOf()
            const bValue = moment(b.updatedAt).valueOf()

            if (aValue < bValue) {
                return 1
            }
            if (aValue > bValue) {
                return -1
            }
            return 0
        })
    },
    [TOGGLE_LOADING](state, payload) {
        state.loading = payload
    },
    [SHOW_BLOG_MODAL](state, payload) {
        state.modal.show = true
        state.modal.data = {...payload}
    },
    [HIDE_BLOG_MODAL](state) {
        state.modal.show = false
        state.modal.data = {}
    },
    [TOGGLE_MODAL_LOADING](state, payload) {
        state.modal.loading = payload
    },
    [ADD_NEW_BLOG](state, payload) {
        state.blogs.unshift(payload)
        state.blogs = [...state.blogs]
    },
    [UPDATE_BLOG](state, payload) {
        const index = state.blogs.findIndex(b => b.uuid === payload.uuid)
        state.blogs[index] = {...payload}
        state.blogs = [...state.blogs]

        const blog = state.blogView.currentBlog
        if (Object.keys(blog).length && blog.uuid === payload.uuid) {
            state.blogView.currentBlog = {...payload}
        }
    },
    [DELETE_BLOG](state, blogUuid) {
        state.blogs = state.blogs.filter(b => b.uuid !== blogUuid)
        state.blogs = [...state.blogs]
    },
    [TOGGLE_BLOG_VIEW_LOADING](state, payload) {
        state.blogView.loading = payload
    },
    [SET_CURRENT_BLOG](state, blogUuid) {
        const blog = state.blogs.find(b => b.uuid === blogUuid)
        state.blogView.currentBlog = {...blog}
    },
    [REMOVE_CURRENT_BLOG](state) {
        state.blogView.currentBlog = {}
    },
    [UPDATE_BLOG_COMMENTS](state, payload) {
        const index = state.blogs.findIndex(b => b.uuid === payload.blogUuid)
        state.blogs[index].comments.unshift(payload)
        state.blogs = [...state.blogs]

        if (state.blogView.currentBlog.uuid === payload.blogUuid &&
            !state.blogView.currentBlog.comments.find(c => c.uuid === payload.uuid)) {
            state.blogView.currentBlog.comments.unshift(payload)
        }
    },
    [DELETE_BLOG_COMMENTS](state, payload) {
        const index = state.blogs.findIndex(b => b.uuid === payload.blogUuid)
        const filteredComments = state.blogs[index].comments.filter(c => c.uuid !== payload.uuid)
        state.blogs[index].comments = [...filteredComments]
        state.blogs = [...state.blogs]

        if (state.blogView.currentBlog.uuid === payload.blogUuid) {
            state.blogView.currentBlog.comments = [...filteredComments]
        }
    },
}
