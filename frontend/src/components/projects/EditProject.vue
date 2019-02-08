<template>
    <v-flex xs12>
        <v-edit-project-tabs></v-edit-project-tabs>
        <v-btn absolute
              dark
              fab
              top
              right
              router
              to='/projects'
              color="red">
            <v-icon dark>arrow_back</v-icon>
        </v-btn>
    </v-flex>
</template>

<script>
import { mapGetters } from 'vuex';
import EditProjectTabs from './edit/EditProjectTabs.vue';
export default {
    props: ['id'],
    components: {
        'v-edit-project-tabs':EditProjectTabs
    },
    mounted(){
        this.getProject();
        this.$store.dispatch('users/loadUsers');
        this.$store.dispatch('projects/loadTypes');
        this.$store.dispatch('projects/loadStatuses');
    },  
    methods: {
        getProject(){
            this.$store.dispatch('projects/getProject', this.id);
        }
    },
    computed:{ 
        
    }
}
</script>
