<template>
    <v-container>
        <v-layout row>
            <v-card>
                <v-card-title>
                    <h3>Editar datos de proyecto</h3>
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
                                    <v-flex xs12 sm6 md3>
                                        <v-text-field
                                            v-model="project.budget"
                                            label="Presupuesto"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3>
                                        <v-select
                                            v-model="project.user_id"
                                            :items="posibleResponsables"
                                            item-value="id"
                                            item-text="text"
                                            label="Responsable"
                                        >

                                        </v-select>
                                    </v-flex>  
                                    <v-flex xs12 sm6 md3>
                                        <v-select
                                            v-model="project.type_id"
                                            :items="itemTypes"
                                            item-value="id"
                                            item-text="text"
                                            label="Tipo de proyecto"
                                        >

                                        </v-select>
                                    </v-flex>  
                                    <v-flex xs12 sm6 md3>
                                        <v-select
                                            v-model="project.status_id"
                                            :items="itemStatuses"
                                            item-value="id"
                                            item-text="text"
                                            label="Estatus del proyecto"
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
                            Actualizar
                            </v-btn>
                        </v-form>
                    </v-flex>
                </v-card-text>
            </v-card>
           
        </v-layout>
    </v-container>
              
    
</template>
<script>
import { mapGetters } from 'vuex';
import Project from '../../../models/project.js';
export default {
    data: () => ({
    }),
    mounted(){
        
    },
    methods: {
        onSubmit(){
            this.$store.dispatch('projects/updateProject', this.project)
        }
    },
    computed: {
        ...mapGetters({
            'users': 'users/getUsers',
            'types': 'projects/getTypes',
            'statuses': 'projects/getStatuses',
            'project': 'projects/getCurrentProject'
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
        itemStatuses(){
            return this.statuses.map( s => ({id: s.id, text:s.title}))
        },
        invalidForm(){
            return this.project.code == '' || this.project.name == '' || this.project.client == ''
                || this.project.budget == '' || this.project.type_id == '' || this.project.user_id == '';
        }
    }
}
</script>
