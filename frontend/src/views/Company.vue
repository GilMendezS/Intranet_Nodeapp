<template>
    <v-flex xs12>
        <v-company-tabs></v-company-tabs>
    </v-flex>
    
</template>

<script>
import CompanyTabs from '../components/company/CompanyTabs.vue';
export default {
    components: {
        'v-company-tabs':CompanyTabs
    },
    mounted () {
        this.$store.dispatch('rfcs/loadRfcs');
        this.$store.dispatch('areas/loadAreas');
        this.$store.dispatch('users/loadUsers');
        this.$store.dispatch('positions/loadPositions');
        this.$store.dispatch('departments/loadDepartments');
    }
}
</script>
