<template>
     <v-card>
        <v-card-text>
                <v-form >
                    <v-container>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field
                                    v-if="viatic.status_id == 5"
                                    v-model="viatic.money_deposited"
                                    label="Dinero"
                                    type='number'
                                    step='0.01'
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
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
                        @click="onApproved"
                        
                    >
                    Autorizar
                    </v-btn>
                    <v-btn
                        class="orange white--text"
                        @click="onRejected"
                    >
                    Rechazar
                    </v-btn>
                </v-form>
            
        </v-card-text>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        
    }),
    methods: {
        onApproved(){
            this.$store.dispatch('viatics/approveViatic', this.viatic);
        },
        onRejected(){
            this.$store.dispatch('viatics/denyViatic', this.viatic);
        }
    },
    computed: {
        ...mapGetters({
            'viatic': 'viatics/getEditingViatic'
        })
    },
    
}
</script>

