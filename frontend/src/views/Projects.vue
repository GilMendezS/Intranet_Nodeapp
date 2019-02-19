<template>
    <v-layout>
        <v-flex>
            <v-projects-tabs></v-projects-tabs>
        </v-flex>
    </v-layout>
</template>

<script>
import ProjectsTabs from '../components/projects/ProjectsTabs.vue';
export default {
    mounted(){
        
    },
    components: {
        'v-projects-tabs':ProjectsTabs
    }
}
</script>
