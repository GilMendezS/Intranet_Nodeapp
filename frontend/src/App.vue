<template>
  <v-app>
    <!--v-navigation-drawer app></v-navigation-drawer-->
    <v-navbar/>
    <v-content>
      <v-container fluid>
         <v-layout row wrap >
          <router-view></router-view>
         </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/includes/Navbar.vue';

export default {
  name: 'App',
  components: {
    'v-navbar': Navbar
  },
  data () {
    return {
      //
    }
  }
}
</script>
