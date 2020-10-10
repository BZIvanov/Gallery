<template>
  <v-app>
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
  data: () => ({
    //
  }),
};
</script>
