<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand>Simple Blog Site</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown v-if="isSmallScreen" right no-caret>
        <template slot="button-content">
          <i class="fas fa-bars"/>
        </template>
        <b-dropdown-item href="#">
          <span v-if="currentUser" class="d-flex align-items-center">
            <b-img :src="currentUser.imageUrl" class="img-fluid rounded-circle mr-2" width="25px" height="25px"/>
            {{ currentUser.lastName }}, {{ currentUser.firstName }}
          </span>
        </b-dropdown-item>
        <hr/>
        <b-dropdown-item @click="logout()" href="#">
          <div class="d-flex justify-content-between align-items-center">
            Logout
            <i class="fas fa-sign-out-alt"/>
          </div>
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown v-else right no-caret>
        <template slot="button-content">
          <span v-if="currentUser" class="d-flex align-items-center">
            <b-img :src="currentUser.imageUrl" class="img-fluid rounded-circle mr-2" width="25px" height="25px"/>
            {{ currentUser.lastName }}, {{ currentUser.firstName }}
            <i class="fas fa-caret-down ml-2"/>
          </span>
        </template>
        <!--        <b-dropdown-item :active="this.$route.name == 'profile'" to="/profile"> Profile</b-dropdown-item>-->
        <b-dropdown-item @click="logout()" href="#">
          <span class="d-flex justify-content-between align-items-center">
            Logout
            <i class="fas fa-sign-out-alt"/>
          </span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import {createNamespacedHelpers} from "vuex";
import {getAuthUser} from "../../../store/modules/auth/actions";

const {mapState, mapActions} = createNamespacedHelpers('auth')
export default {
  name: "Navbar",
  data() {
    return {
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    ...mapState(['currentUser']),
    isSmallScreen() {
      return this.windowWidth <= 480
    },
  },
  methods: {
    ...mapActions(['logout', 'getAuthUser']),
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    this.getAuthUser();
  },
}
</script>

<style lang="scss">

.navbar {
  padding: 15px;

  > .navbar-nav {
    > .nav-item {
      > .nav-link {
        color: white;
        font-size: 14px;
        outline: none;
      }

      > .nav-link:hover {
        font-size: 14px;
      }
    }
  }
}

</style>