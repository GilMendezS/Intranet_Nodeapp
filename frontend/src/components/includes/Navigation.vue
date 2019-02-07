<template>
    <div>
        <v-navigation-drawer
        absolute
        temporary
        v-model="drawer"
        v-if="userIsAuthenticated"
        >
            <v-list>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>list_alt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Proyectos</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>attach_money</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Viáticos</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>watch_later</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Horas</v-list-tile-title>
                </v-list-tile>
                <v-list-group
                    prepend-icon="account_circle"
                    value="true"
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-title>Empresa</v-list-tile-title>
                    </v-list-tile>
                        
                    <v-list-group
                    no-action
                    sub-group
                    value="true"
                    >
                    <v-list-tile slot="activator">
                        <v-list-tile-title>Administración de usuarios</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile
                        v-for="(admin, i) in admins"
                        :key="i"
                        
                    >
                        <v-list-tile-title v-text="admin[0]"></v-list-tile-title>
                        <v-list-tile-action>
                        <v-icon v-text="admin[1]"></v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    </v-list-group>

                    <v-list-group
                    sub-group
                    no-action
                    >
                    <v-list-tile slot="activator">
                        <v-list-tile-title>Administración de áreas</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile
                        v-for="(crud, i) in cruds"
                        :key="i"
                        
                    >
                        <v-list-tile-title v-text="crud[0]"></v-list-tile-title>
                        <v-list-tile-action>
                        <v-icon v-text="crud[1]"></v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                    </v-list-group>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <!--toolbar-->
        <v-toolbar app class="blue white--text">
            <v-toolbar-side-icon v-if="userIsAuthenticated" @click="changeDrawerState"></v-toolbar-side-icon>
            <v-toolbar-title>GMS</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn v-if="userIsAuthenticated" flat @click="onLogout"> Salir <i class="fa fa-power-off"></i></v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
    
</template>
<script>
import { mapGetters } from 'vuex';
  export default {
    data: () => ({
        drawer: false,
        admins: [
            ['Usuarios registrados', 'people_outline'],
        ],
        cruds: [
            ['Ver estructura', 'business']
        ]
    }),
    methods: {
        onLogout(){
            this.$store.dispatch('auth/logoutUser')
        },
        changeDrawerState(){
            this.drawer = !this.drawer;
        }
    },
    computed: {
        ...mapGetters({
            'userIsAuthenticated': 'auth/isAuthenticated'
        })
    },
  }
</script>
