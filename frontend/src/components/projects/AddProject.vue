<template>
    <v-container>
        <v-layout row>
            <v-card>
                <v-card-title>
                    <h3>Registrar projecto</h3>
                </v-card-title>
                <v-card-text>
                     <v-flex xs12 sm10 offset-sm1>
                        <v-form >
                            <v-container>
                                <v-layout row wrap>
                                        
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                            v-model="project.code"
                                            label="PRY"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                            v-model="project.name"
                                            label="Nombre"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                            v-model="project.client"
                                            label="Cliente"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field
                                            v-model="project.budget"
                                            label="Presupuesto"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-select
                                            v-model="project.user_id"
                                            :items="posibleResponsables"
                                            item-value="id"
                                            item-text="text"
                                            label="Responsable"
                                        >

                                        </v-select>
                                    </v-flex>  
                                    <v-flex xs12 sm6 md4>
                                        <v-select
                                            v-model="project.type_id"
                                            :items="itemTypes"
                                            item-value="id"
                                            item-text="text"
                                            label="Tipo de proyecto"
                                        >

                                        </v-select>
                                    </v-flex>  
                                    <v-flex xs12>
                                        <v-textarea
                                            name="comments"
                                            label="Comentarios"
                                            v-model="project.extra_comments"
                                            hint="comentarios del proyecto"
                                            >
                                        </v-textarea>
                                    </v-flex>
                                    
                                </v-layout>
                            </v-container>
                        
                            <v-btn
                                class="blue white--text"
                                @click="onSubmit"
                                :disabled="invalidForm"
                            >
                            Registrar
                            </v-btn>
                            <v-btn
                                class="red white--text"
                                router
                                to='/projects'
                                
                            >
                            Cancelar
                            </v-btn>
                        </v-form>
                    </v-flex>
                </v-card-text>
            </v-card>
           <v-btn
                absolute
                dark
                fab
                top
                router
                to='/projects'
                right
                color="cyan"
            >
                <v-icon>arrow_back</v-icon>
            </v-btn>
        </v-layout>
    </v-container>
              
    
</template>
<script>
import {mapGetters} from 'vuex';
import Project from '../../models/project.js';
export default {
    data: () => ({
        project : new Project(),
    }),
    mounted(){
        this.$store.dispatch('users/loadUsers');
        this.$store.dispatch('projects/loadTypes');
    },
    methods: {
        onSubmit(){
            this.$store.dispatch('projects/addProject', this.project)
        }
    },
    computed: {
        ...mapGetters({
            'users': 'users/getUsers',
            'types': 'projects/getTypes'
        }),
        posibleResponsables(){
            return this.users.map( u => {
                return {
                    id: u.id,
                    text: `${u.name} ${u.lastname}`
                }
            })
        },
        itemTypes(){
            return this.types.map( t => {
                return {
                    id: t.id,
                    text: t.title
                }
            })
        },
        invalidForm(){
            return this.project.code == '' || this.project.name == '' || this.project.client == ''
                || this.project.budget == '' || this.project.type_id == '' || this.project.user_id == '';
        }
    }
}
</script>
