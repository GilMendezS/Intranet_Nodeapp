<template>
    <v-toolbar app class="blue white--text">
        <!--v-toolbar-side-icon></v-toolbar-side-icon-->
        <v-toolbar-title>GMS</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-if="userIsAuthenticated" flat @click="onLogout"> Salir <i class="fa fa-power-off"></i></v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    methods: {
        onLogout(){
            this.$store.dispatch('auth/logoutUser')
        }
    },
    computed: {
        ...mapGetters({
            'userIsAuthenticated': 'auth/isAuthenticated'
        })
    }
}
</script>
