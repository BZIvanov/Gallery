<template>
  <v-app>
    <div>
      <v-toolbar fixed color="primary" dark app>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title class="hidden-xs-only">
          <router-link to="/" tag="span" style="cursor: pointer">
            VueShare
          </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field flex prepend-icon="mdi-card-search" placeholder="Search posts" color="accent" single-line hide-details></v-text-field>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
          <v-btn text v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
            <v-icon class="hidden-sm-only" left>{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    
    <main>
      <v-container class="mt-4">
        <router-view/>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  computed: {
    horizontalNavItems() {
      return [
        { icon: "mdi-chat", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/signin" },
        { icon: "mdi-creation", title: "Sign Up", link: "/signup" }
      ];
    }
  }
};
</script>
