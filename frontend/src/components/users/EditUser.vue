<template>
    <v-container>
        <v-layout row>
            <v-flex sm8>
                <v-card>
                    <v-card-text>
                        <v-flex xs12 sm10 offset-sm1>
                            <h3>Datos del usuario</h3>
                            <v-form >
                                <v-container>
                                    <v-layout row wrap>
                                            
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field
                                                v-model="user.name"
                                                label="Nombre"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field
                                                v-model="user.lastname"
                                                label="Apellidos"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field
                                                v-model="user.email"
                                                label="Email"
                                                type="email"
                                            ></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field
                                                v-model="user.employee_number"
                                                label="Número de empleado"
                                                type="text"
                                            ></v-text-field>
                                        </v-flex>
                                        
                                        <v-flex xs12 sm6 md4>
                                            <v-select
                                                v-model="user.area_id"
                                                :items="itemAreas"
                                                item-value="id"
                                                item-text="text"
                                                label="Area"
                                            >

                                            </v-select>
                                        </v-flex>  
                                        <v-flex xs12 sm6 md4>
                                            <v-select
                                                v-model="user.department_id"
                                                :items="filteredDepartments"
                                                item-value="id"
                                                item-text="text"
                                                label="Departamento"
                                            >

                                            </v-select>
                                        </v-flex>  
                                        <v-flex xs12 sm6 md4>
                                            <v-select
                                                v-model="user.position_id"
                                                :items="filteredPositions"
                                                item-value="id"
                                                item-text="text"
                                                label="Puesto"
                                            >

                                            </v-select>
                                        </v-flex>  
                                        <v-flex xs12>
                                            <v-expansion-panel>
                                                <v-expansion-panel-content>
                                                <v-icon slot="actions" color="error">vpn_key</v-icon>
                                                <div slot="header">Password</div>
                                                <v-card>
                                                    <v-card-text class="grey lighten-3">
                                                        <v-text-field
                                                            v-model="newPassword"
                                                            label="Cambiar contraseña"
                                                            type="password"
                                                        ></v-text-field>
                                                    </v-card-text>
                                                </v-card>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            
                                <v-btn
                                    class="blue white--text"
                                    @click="onSubmit"
                                    :disabled="invalidForm"
                                >
                                Actualizar
                                </v-btn>
                            </v-form>
                        </v-flex>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex sm4>
                <v-card class="ml-3">
                    <v-card-text>
                        <h3>Roles</h3>
                        <v-checkbox
                        @change="onRolesChanged"
                        v-for="role in roles"
                        :key="role.id"
                        :value="role.id"
                        v-model="rolesUser"
                        :label="role.title"
                        ></v-checkbox>
                    </v-card-text>
                </v-card>
            </v-flex>
            
           <v-btn
                absolute
                dark
                fab
                top
                router
                to='/users'
                right
                color="cyan"
            >
                <v-icon>arrow_back</v-icon>
            </v-btn>
        </v-layout>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import User from '@/models/user.js';
export default {
    props: ['id'],
    data: () => ({
        newPassword: '',
        rolesUser: []
    }),
    mounted(){
        this.$store.dispatch('areas/loadAreas');
        this.$store.dispatch('departments/loadDepartments');
        this.$store.dispatch('positions/loadPositions');
        this.$store.dispatch('roles/loadRoles');
        this.getUser();
    },
    methods: {
        getUser(){
            this.$store.dispatch('users/loadUser', this.id);
        },
        onSubmit(){
            this.$store.dispatch('users/updateUserInfo', this.newPassword);
        },
        onRolesChanged(){
            this.$store.dispatch('users/modifyRoles', {
                id: this.user.id,
                roles: this.rolesUser
            })
        }
    },
    computed: {
        ...mapGetters({
            'areas': 'areas/getAreas',
            'user': 'users/getEditingUser',
            'departments': 'departments/getDepartments',
            'positions': 'positions/getPositions',
            'roles': 'roles/getRoles'
        }),
        itemAreas(){
            return this.areas.map( a => ({id: a.id, text: a.title}));
        },
        filteredDepartments(){
            return this.departments.filter( d => d.area_id == this.user.area_id).map( d => ({id: d.id, text: d.title}));
        },
        filteredPositions(){
            return this.positions.filter( p => p.department_id == this.user.department_id).map( p => ({id:p.id, text: p.title}) );
        },
        customRoles(){
            return this.roles.map( r => ({id: r.id, text: r.title}) );
        },
        invalidForm(){
            return this.user.name == '' 
                || this.user.lastname == '' 
                || this.user.email == ''
                || this.user.password == '' 
                || this.user.area_id == '' || this.user.department_id == ''
                || this.user.position_id == '';
        }
    },
    watch: {
        user(){
            this.rolesUser = this.user.roles.map( r => r.id);
        }
    }
}
</script>
