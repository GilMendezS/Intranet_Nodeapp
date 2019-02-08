<template>
    <v-card>
        <v-card-title>
            <h3>Registrar</h3>
        </v-card-title>
        <v-card-text>
            <v-flex xs12 row>
                <v-form >
                    <v-container>
                        <v-layout row>
                            <v-flex xs6>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-select
                                            :items="filteredProjects"
                                            item-value='id'
                                            item-text='text'
                                            label='Proyecto'
                                            v-model="hour.project_id"
                                        >
                                        </v-select>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            v-model="hour.hours"
                                            label="Horas"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-textarea
                                            name="acvivity"
                                            v-model="hour.activity"
                                            label="Actividad"
                                        >
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-textarea
                                            name="comments"
                                            v-model="hour.comments"
                                            label="Comentarios"
                                        >
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-flex xs12 >
                                    <h4>Fecha</h4>
                                    <v-date-picker
                                        v-model='hour.date'>
                                    </v-date-picker>
                                </v-flex> 
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
            </v-flex>
        </v-card-text>
    </v-card>

</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import Hour from '../../models/hour.js';

export default {
    components: {
        
    },
    data: () => ({
        hour: new Hour(),
    }),
    methods: {
        onSubmit(){
            this.$store.dispatch('hours/addHour', this.hour);
        }
    },
    computed: {
        invalidForm(){
            return this.hour.project_id == '' || this.hour.hours == '' || this.hour.date == '';
        },
        filteredProjects(){
            return this.projectsUser.map( p => ({
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
