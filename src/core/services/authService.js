import router from "../../router/router";

export default {
    loggedIn() {
        return !!localStorage.getItem('AUTH_TOKEN');
    },
    logout() {
        localStorage.removeItem('AUTH_TOKEN');
        localStorage.removeItem('CURRENT_USER');
        router.push({name: 'login'});
    },
    setToken(token) {
        localStorage.setItem('AUTH_TOKEN', token);
    },
    setUser(data) {
        localStorage.setItem('CURRENT_USER', JSON.stringify(data));
    },
    getUser() {
        return localStorage.getItem('CURRENT_USER');
    },
}