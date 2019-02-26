<template>
    <v-card>
        <v-card-title>
            <h3>Registrar</h3>
        </v-card-title>
        <v-card-text>
            
                <v-form >
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12 md6>
                                <v-select
                                    no-data-text='No tienes proyectos activos con permisos para registrat viáticos'
                                    :items="filteredProjects"
                                    item-value='id'
                                    item-text='text'
                                    label='Proyecto'
                                    v-model="viatic.project_id"
                                >
                                </v-select>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                    v-model="viatic.money_requested"
                                    label="Monto"
                                    type='number'
                                    step='0.01'
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                    v-model="viatic.origin"
                                    label="Origen"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-text-field
                                    v-model="viatic.destiny"
                                    label="Destino"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md6>
                                <h4>Salida</h4>
                                <v-date-picker
                                    
                                    landscape='landscape'
                                    v-model='viatic.departure'>
                                </v-date-picker>
                                
                            </v-flex>
                            <v-flex xs12 md6>
                                <h4>LLegada</h4>
                                <v-date-picker
                                    landscape='landscape'
                                    v-model='viatic.arrive'>
                                </v-date-picker>
                                
                            </v-flex>
                            <v-flex xs12>
                                 <v-textarea
                                    name="comments"
                                    v-model="viatic.comments"
                                    label="Comentarios"
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
                </v-form>
            
        </v-card-text>
    </v-card>

</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import Viatic from '../../models/viatic.js';

export default {
    components: {
        
    },
    data: () => ({
        viatic: new Viatic(),
        landscape: true
    }),
    methods: {
        onSubmit(){
            this.$store.dispatch('viatics/addViatic', this.viatic);
        }
    },
    computed: {
        invalidForm(){
            return this.viatic.project_id == '' 
            || this.viatic.money_requested == '' 
            || this.viatic.origin == ''
            || this.viatic.destiny == ''
            || this.viatic.departure == ''
            || this.viatic.arrive == ''
        },
        filteredProjects(){
            return this.projectsUser.filter(p => p.project_user.can_add_viatics != false).map( p => ({
                id: p.id,
                text: `${p.code} - ${p.name}`
            }))
        },
        ...mapGetters({
            'projectsUser': 'projects/getProjectsAuthenticatedUser'
        })
    },
}
</script>
<style scoped>
</style>
