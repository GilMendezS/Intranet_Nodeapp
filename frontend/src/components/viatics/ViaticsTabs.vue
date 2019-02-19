<template>
    <div>
        <v-tabs  fixed-tabs>
            <v-tab
                v-for="tab in tabs"
                :key="tab"
                ripple>
                {{ tab}}
            </v-tab>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <v-viatics-user></v-viatics-user>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    Autorizar
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    En proceso
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    Historial
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    Nuevo
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    Editar solicitud
                </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
        
    </div>
    
        
 
    
</template>

<script>
import ViaticsUserTable from './tables/ViaticsUserTable.vue';
export default {
    components: {
        'v-viatics-user': ViaticsUserTable
    },
    mounted(){
        this.$store.dispatch('viatics/loadViaticsUser');
    },
    data: () => {
        return {
            tabs: ['Mis viáticos','Autorizar','En proceso','Historial','Nuevo','Editar Solicitud']
        }
    }
}
</script>
