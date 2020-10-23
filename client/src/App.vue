<template>
  <v-app style="background: #E3E3EE">
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-app-bar color="accent" dark flat>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-app-bar>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          ripple
          v-for="item in sideNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="user" @click="handleSignoutUser">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>Signout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div>
      <v-app-bar fixed color="primary" dark app>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <v-toolbar-title class="hidden-xs-only">
          <router-link to="/" tag="span" style="cursor: pointer">
            VueShare
          </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
          flex
          prepend-icon="mdi-card-search"
          placeholder="Search posts"
          color="accent"
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            text
            v-for="item in horizontalNavItems"
            :key="item.title"
            :to="item.link"
          >
            <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>

          <v-btn text to="/profile" v-if="user">
            <v-icon class="hidden-sm-only" left>mdi-account-box</v-icon>
            <v-badge
              right
              color="blue darken-2"
              :class="{ bounce: badgeAnimated }"
            >
              <span slot="badge" v-if="userFavorites.length">{{
                userFavorites.length
              }}</span>
              Profile
            </v-badge>
          </v-btn>

          <v-btn text v-if="user" @click="handleSignoutUser">
            <v-icon class="hidden-sm-only" left>mdi-exit-to-app</v-icon>
            Signout
          </v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </div>

    <main>
      <v-container class="mt-10">
        <transition name="fade">
          <router-view />
        </transition>

        <v-snackbar
          v-model="authSnackbar"
          color="success"
          :timeout="5000"
          bottom
          left
        >
          <div
            style="display: flex; align-items: center; justify-content: space-between;"
          >
            <v-icon class="mr-3">mdi-check-circle</v-icon>
            <h3>You are now signed in!</h3>
            <v-btn dark text @click="authSnackbar = false">Close</v-btn>
          </div>
        </v-snackbar>

        <v-snackbar
          v-if="authError"
          v-model="authErrorSnackbar"
          color="info"
          :timeout="5000"
          bottom
          left
        >
          <div
            style="display: flex; align-items: center; justify-content: space-between;"
          >
            <v-icon class="mr-3">mdi-cancel</v-icon>
            <h3>{{ authError.message }}</h3>
            <v-btn dark text to="/signin">Sign in</v-btn>
          </div>
        </v-snackbar>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false,
      badgeAnimated: false,
    };
  },
  watch: {
    user(newValue, oldValue) {
      if (oldValue === null) {
        this.authSnackbar = true;
      }
    },
    authError(value) {
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    },
    userFavorites(value) {
      if (value) {
        this.badgeAnimated = true;
        setTimeout(() => (this.badgeAnimated = false), 1000);
      }
    },
  },
  computed: {
    ...mapGetters(['authError', 'user', 'userFavorites']),
    horizontalNavItems() {
      let items = [
        { icon: 'mdi-chat', title: 'Posts', link: '/posts' },
        { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-creation', title: 'Sign Up', link: '/signup' },
      ];
      if (this.user) {
        items = [{ icon: 'mdi-chat', title: 'Posts', link: '/posts' }];
      }
      return items;
    },
    sideNavItems() {
      let items = [
        { icon: 'mdi-chat', title: 'Posts', link: '/posts' },
        { icon: 'mdi-lock-open', title: 'Sign In', link: '/signin' },
        { icon: 'mdi-creation', title: 'Sign Up', link: '/signup' },
      ];
      if (this.user) {
        items = [
          { icon: 'mdi-chat', title: 'Posts', link: '/posts' },
          { icon: 'mdi-star', title: 'Create Post', link: '/post/add' },
          { icon: 'mdi-account-box', title: 'Profile', link: '/profile' },
        ];
      }
      return items;
    },
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch('signoutUser');
    },
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.bounce {
  animation: bounce 1s both;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>
