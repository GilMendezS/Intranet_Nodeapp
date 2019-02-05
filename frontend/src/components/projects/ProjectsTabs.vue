<template>
    <v-flex xs12 >
        <v-tabs  fixed-tabs
        >
        <v-tab
            v-for="n in tabs"
            :key="n"
            ripple
        >
            {{ n }}

        </v-tab>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                <v-projects-datatable></v-projects-datatable>
            </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                Presupuestos
            </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                Preventa
            </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                Terminados
            </v-card-text>
            </v-card>
        </v-tab-item>
        </v-tabs>
    </v-flex>
    

</template>

<script>
import ActiveProjectsDatatable from './ActiveProjectsDatatable.vue';
export default {
    components : {
        'v-projects-datatable':ActiveProjectsDatatable
    },
    data: () => {
        return {
            tabs: ['Activos','Presupuestos','Preventa','Terminados']
        }
    }
}
</script>
