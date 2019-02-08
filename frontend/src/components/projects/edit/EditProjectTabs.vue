<template>
    <v-flex xs12 >
        <v-tabs  fixed-tabs
        >
        <v-tab
            v-for="tab in tabs"
            :key="tab"
            ripple
        >
            {{ tab}}

        </v-tab>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                <v-edit-form></v-edit-form>
            </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                <v-possible-users></v-possible-users>
            </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                <v-included-users></v-included-users>
            </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                <v-comments></v-comments>
            </v-card-text>
            </v-card>
        </v-tab-item>
        </v-tabs>
    </v-flex>
    

</template>

<script>
import EditForm from './EditForm.vue';
import Comments from '../Comments.vue';
import IncludedUsers from './IncludedUsers.vue';
import AvailableUsers from './AvailableUsers.vue';
export default {
    components: {
        'v-edit-form': EditForm,
        'v-included-users': IncludedUsers,
        'v-possible-users': AvailableUsers,
        'v-comments': Comments
    },
    data: () => {
        return {
            tabs: ['Editar','Agregar usuarios','Permisos','Comentarios']
        }
    }
}
</script>
