<template>
    <v-container>
        <v-layout>
            <v-flex xs4 class="mr-5">
                <v-details-viatic></v-details-viatic>
            </v-flex>
            <v-flex xs8>
                <v-authorize-viatic >
                </v-authorize-viatic>
                <v-finalize-viatic v-if="canFinalizeViatic"></v-finalize-viatic>
            </v-flex>
        </v-layout>
    </v-container>
    
    
</template>
<script>
import DetailsViatic from '../DetailsViatic.vue'
import { mapGetters } from 'vuex';
import Finalize from './Finalize.vue';
import Authorize from './Authorize.vue';
export default {
    props: ['id'],
    components: {
        'v-authorize-viatic': Authorize,
        'v-finalize-viatic': Finalize,
        'v-details-viatic': DetailsViatic
    },
    mounted(){
        this.$store.dispatch('viatics/loadViatic', {id: this.id, toEdit: true})
    },
    computed: {
        ...mapGetters({
            'viatic': 'viatics/getEditingViatic',
            'currentUser': 'auth/getUser',
            'rolesCurrentUser': 'auth/getRolesNamesCurrentUser'
        }),
        canFinalizeViatic(){
            return this.viatic.status_id == 8 && this.rolesCurrentUser.includes('admin');
        }
    }
}
</script>
