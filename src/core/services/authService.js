import router from "../../router/router";

export default {
    loggedIn() {
        return !!localStorage.getItem('AUTH_TOKEN');
    },

    logout() {
        localStorage.removeItem('AUTH_TOKEN');
        router.push({name: 'login'});
    },

    setToken(token) {
        localStorage.setItem('AUTH_TOKEN', token);
    },
}