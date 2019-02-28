<template>
     <v-card>
        
        <v-card-text>
                <v-form >
                    <v-container>
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
                        @click="onSubmit"
                        
                    >
                    Finalizar
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
        onSubmit(){
            
        }
    },
    computed: {
        ...mapGetters({
            'viatic': 'viatics/getEditingViatic'
        })
    },
    
}
</script>

