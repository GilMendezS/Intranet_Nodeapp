<template>
    <div>
        <v-projects-tabs></v-projects-tabs>
    </div>
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
