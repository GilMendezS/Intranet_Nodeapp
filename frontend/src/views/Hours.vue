<template>
    <v-flex>
        <v-hours-tabs></v-hours-tabs>
    </v-flex>
</template>

<script>
import HoursTabs from '../components/hours/HoursTabs.vue';
export default {
    components: {
        'v-hours-tabs': HoursTabs
    },
    mounted(){
        this.$store.dispatch('projects/loadProjectsUser');
        this.$store.dispatch('hours/loadCurrentHours');
    }
}
</script>
