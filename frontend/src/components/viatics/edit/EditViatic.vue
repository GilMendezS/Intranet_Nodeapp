<template>
    <div>
        <v-search-viatic></v-search-viatic>
        <v-edit-viatic-as-admin></v-edit-viatic-as-admin>
    </div>
</template>
<script>
import Search from './Search.vue';
import EditForm from './EditForm.vue';
export default {
    components: {
        'v-search-viatic': Search,
        'v-edit-viatic-as-admin': EditForm
    },
    mounted(){
        this.$store.dispatch('viatics/loadStatusesViatics')
    }
}
</script>

