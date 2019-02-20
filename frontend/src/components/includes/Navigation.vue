<template>
    <div>
        <v-navigation-drawer
        absolute
        temporary
        v-model="drawer"
        v-if="userIsAuthenticated"
        >
            <v-list>
                <v-list-tile
                    v-if="canSeeProjectsModule"
                    router
                    to="/projects"
                >
                    <v-list-tile-action>
                        <v-icon>list_alt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Proyectos</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                    v-if="canSeeViaticsModule"
                    router
                    to="/viatics"
                >
                    <v-list-tile-action>
                        <v-icon>attach_money</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Viáticos</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                    v-if="canSeeHoursModule"
                    router
                    to='/hours'
                >
                    <v-list-tile-action>
                        <v-icon>watch_later</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Horas</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                    v-if="canSeeCompanyModule"
                    router
                    to='/company'
                >
                    <v-list-tile-action>
                        <v-icon>domain</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Empresa</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                    v-if="canSeeUsersModule"
                    router
                    to='/users'
                >
                    <v-list-tile-action>
                        <v-icon>group</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Usuarios</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                    @click="onLogout"
                >
                    <v-list-tile-action>
                        <v-icon>power_settings_new</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Salir</v-list-tile-title>
                </v-list-tile>
                
            </v-list>
        </v-navigation-drawer>
        <!--toolbar-->
        <v-toolbar app class="blue white--text">
            <v-toolbar-side-icon v-if="userIsAuthenticated" @click="changeDrawerState"></v-toolbar-side-icon>
            <v-toolbar-title>GMS</v-toolbar-title>
            <v-spacer></v-spacer>
            
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
        ],
        menu: [
            {title: 'Proyectos', icon: 'list_alt', link: '/projects'},
            {title: 'Viáticos', icon: 'attach_money', link: '/viatics'},
            {title: 'Horas', icon: 'watch_later', link: '/hours'},
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
            'roles': 'auth/getRolesCurrentUser',
            'userIsAuthenticated': 'auth/isAuthenticated',
            'rolesNames': 'auth/getRolesNamesCurrentUser'
        }),
        canSeeViaticsModule(){
            return true;
        },
        canSeeProjectsModule(){
            const roles_with_permissions = ['admin','supervisor','pm','super-pm'];
            return this.rolesNames.some( r => roles_with_permissions.includes(r));
        },
        canSeeUsersModule(){
            const roles_with_permissions = ['admin'];
            return this.rolesNames.some( r => roles_with_permissions.includes(r));
        },
        canSeeCompanyModule(){
            const roles_with_permissions = ['admin','supervisor'];
            return this.rolesNames.some( r => roles_with_permissions.includes(r));
        },
        canSeeHoursModule(){
            const roles_with_permissions = ['supervisor','pm','engineer','super-pm'];
            return this.rolesNames.some( r => roles_with_permissions.includes(r));
        }
        
    },
  }
</script>
