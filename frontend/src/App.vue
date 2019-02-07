<template>
  <v-app>
    <v-navigation></v-navigation>
    <main>
      <v-content>
        <v-container fluid>
          <v-layout row wrap >
            <v-dialog/>
            <router-view></router-view>
          </v-layout>
        </v-container>
      </v-content>
    </main>
    
  </v-app>
</template>

<script>
import Navbar from './components/includes/Navbar.vue';
import Navigation from './components/includes/Navigation.vue';

export default {
  name: 'App',
  components: {
    'v-navbar': Navbar,
    'v-navigation':Navigation
  },
  data () {
    return {

    }
  },
  methods: {
    
  },
  computed: {
    message() {
      return this.$store.getters['message'];
    }
  },
  watch: {
    message(){
      if (this.message != ''){
        this.$toasted.info(this.message)
      }
    }
  }
  
}
</script>
