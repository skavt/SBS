<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand>Simple Blog Site</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item class="logout" @click="logout">
        Logout
        <i class="fas fa-sign-out-alt"/>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import {createNamespacedHelpers} from "vuex";

const {mapActions} = createNamespacedHelpers('auth')
export default {
  name: "Navbar",
  methods: {
    ...mapActions(['logout']),
  },
}
</script>

<style lang="scss" scoped>

.navbar {
  padding: 15px;

  > .navbar-nav {
    > .nav-item {
      > .nav-link {
        color: white;
        font-size: 14px;
      }

      > .nav-link:hover {
        color: grey;
        font-size: 14px;
      }
    }
  }
}

</style>