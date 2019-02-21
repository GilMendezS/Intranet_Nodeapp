<template>
    <div>
        <v-tabs  fixed-tabs>
            <v-tab ripple >
                Mis viáticos
            </v-tab>
            <v-tab ripple v-if="showAuthorizateTab">
                Autorizar
            </v-tab>
            <v-tab ripple v-if="showInProcessTab">
                En proceso
            </v-tab>
            <v-tab ripple v-if="showHistoryTab">
                Historial
            </v-tab>
            <v-tab ripple v-if="showNewViaticTab">
                Nuevo
            </v-tab>
            <v-tab ripple v-if="showEditViaticTab">
                Editar Solicitud
            </v-tab>
            <!--tab items-->
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <v-viatics-user></v-viatics-user>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item v-if="showAuthorizateTab">
                <v-card flat>
                <v-card-text>
                    <v-viatics-authorize></v-viatics-authorize>
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item v-if="showInProcessTab">
                <v-card flat>
                <v-card-text>
                    <v-viatics-in-process></v-viatics-in-process>
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item v-if="showHistoryTab">
                <v-card flat>
                <v-card-text>
                    <v-history-viatics></v-history-viatics>
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item v-if="showNewViaticTab">
                <v-card flat>
                <v-card-text>
                    <v-create-viatic></v-create-viatic>
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item v-if="showEditViaticTab">
                <v-card flat>
                <v-card-text>
                    <v-edit-viatic></v-edit-viatic>
                </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
        
    </div>
    
        
 
    
</template>

<script>
import { mapGetters } from 'vuex';
import CreateViatic from './CreateViatic.vue';
import ViaticsUserTable from './tables/ViaticsUserTable.vue';
import HistoryViaticsTable from './tables/HistoryViaticsTable.vue';
import AuthorizeViaticsTable from './tables/AuthorizeViaticsTable.vue';
import InProcessViaticsTable from './tables/InProcessViaticsTable.vue';
import EditViatic from './edit/EditViatic.vue'
export default {
    components: {
        'v-viatics-user': ViaticsUserTable,
        'v-viatics-authorize': AuthorizeViaticsTable,
        'v-viatics-in-process':InProcessViaticsTable,
        'v-history-viatics': HistoryViaticsTable,
        'v-create-viatic': CreateViatic,
        'v-edit-viatic': EditViatic
    },
    mounted(){
        this.$store.dispatch('projects/loadProjectsUser');
    },
    data: () => ({
        
    }),
    computed: {
        ...mapGetters({
            'roles': 'auth/getRolesCurrentUser'
        }),
        
        rolesNames(){
            return this.roles.map( r => r.name);
        },
        showMyViaticsTab(){
            return true;
        },
        showAuthorizateTab(){
            const self = this;
            return ['admin','supervisor','super-pm','revisor','pm'].some( r => self.rolesNames.includes(r));
        },
        showInProcessTab(){
            const self = this;
            return ['admin','revisor'].some( r => self.rolesNames.includes(r));
        },
        showHistoryTab(){
            return true;
        },
        showNewViaticTab(){
            return true;
        },
        showEditViaticTab(){
            const self = this;
            return ['admin'].some( r => self.rolesNames.includes(r));
        }
    }
}
</script>
