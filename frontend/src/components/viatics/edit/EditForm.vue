<template>
     <v-card v-show="viatic.id">
        <v-card-title>
            <h3>Editar</h3>
        </v-card-title>
        <v-card-text>
            <v-form >
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 md4>
                            <v-text-field
                                v-model="viatic.project.code"
                                label="Proyecto"
                                readonly="readonly"
                                :disabled="readonly"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-text-field
                                v-model="viatic.user.name"
                                label="Solicitante"
                                readonly="readonly"
                                :disabled="readonly"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-text-field
                                v-model="viatic.authorizator.name"
                                label="Autoriza"
                                readonly="readonly"
                                :disabled="readonly"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-text-field
                                v-model="viatic.money_requested"
                                label="Solicitado"
                                type="number"
                                readonly="readonly"
                                :disabled="readonly"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-text-field
                                v-model="viatic.money_reposited"
                                label="Depositado"
                                type="number"
                                readonly="readonly"
                                :disabled="readonly"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-text-field
                                v-model="viatic.money_checked"
                                label="Comprobado"
                                type="number"
                                readonly="readonly"
                                :disabled="readonly"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-text-field
                                v-model="viatic.origin"
                                label="Origen"
                                readonly="readonly"
                                :disabled="readonly"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-text-field
                                v-model="viatic.destiny"
                                label="Destino"
                                readonly="readonly"
                                :disabled="readonly"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                             <v-date-picker
                                readonly="readonly"
                                :disabled="readonly"
                                v-model='viatic.departure'>
                            </v-date-picker>
                        </v-flex>
                        <v-flex xs12 md6>
                             <v-date-picker
                                readonly="readonly"
                                :disabled="readonly"
                                v-model='viatic.arrive'>
                            </v-date-picker>
                        </v-flex>
                        <v-flex xs12>
                            <v-select
                                v-model="viatic.status_id"
                                :items="filteredStatuses"
                                item-value="id"
                                item-text="text"
                                label="Estatus"
                            >
                            </v-select>
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
                >
                Actualizar
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        readonly: true
    }),
    methods: {
        onSubmit(){
            this.$store.dispatch('viatics/changeStatusViatic', this.viatic);
        }
    },
    computed: {
        ...mapGetters({
            'viatic': 'viatics/getViaticFoundIt',
            'statuses': 'viatics/getStatuses'
        }),
        filteredStatuses(){
            return this.statuses.map( s => ({
                id: s.id,
                text: s.title
            }))
        }
    }
}
</script>

