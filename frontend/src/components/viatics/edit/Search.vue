<template>
    <v-card>
        <v-card-title>
            <h4>Cargar Viático</h4>
            
        </v-card-title>
        <v-card-text>
            <v-form submit.prevent="onSubmit">
                <v-layout row wrap>
                    <v-flex xs12 md6>
                            <v-text-field
                            v-model="search"
                            label="Folio"
                            type='number'
                            step='1'
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                        <v-btn
                            class="blue white--text"
                            @click="onSubmit"
                            :disabled="invalidForm"
                        >

                            Cargar datos <v-icon>search</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        search: '',
    }),
    methods: {
        onSubmit(){
            this.$store.dispatch('viatics/setEmptyViatic')
            this.$store.dispatch('viatics/loadViatic', {
                id: this.search,
                toEdit: false
            })
        }
    },
    computed: {
        invalidForm(){
            return this.search == ''
        },
    }
}
</script>

