<template>
    <v-layout>
        <v-flex>
            <v-viatics-tabs></v-viatics-tabs>
        </v-flex>
    </v-layout>
</template>

<script>
import ViaticsTabs from '../components/viatics/ViaticsTabs.vue';
export default {
    components: {
        'v-viatics-tabs': ViaticsTabs
    },
    mounted(){
        
    },
    
}
</script>
