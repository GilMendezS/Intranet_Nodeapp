<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-tabs  fixed-tabs>
                    <v-tab ripple >
                        Activos
                    </v-tab>
                    <v-tab ripple >
                        No activos
                    </v-tab>
                    <!--tab items-->
                    <v-tab-item>
                        <v-card flat>
                            <v-card-text>
                                <v-active-users></v-active-users>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item >
                        <v-card flat>
                        <v-card-text>
                            <v-inactive-users></v-inactive-users>
                        </v-card-text>
                        </v-card>
                    </v-tab-item>
                    
                </v-tabs>
            </v-flex>
        </v-layout>
    </v-container>
        
        
    
    
        
 
    
</template>

<script>
import ActiveUsersTable from '../components/users/tables/ActiveUsersTable.vue'
import InactiveUsersTable from '../components/users/tables/InactiveUsersTable.vue'
export default {
    components: {
        'v-active-users': ActiveUsersTable,
        'v-inactive-users': InactiveUsersTable
    },
    mounted(){
        this.$store.dispatch('users/loadUsers');
    },
    data: () => ({
        
    }),
}
</script>
