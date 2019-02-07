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
                <v-active-projects></v-active-projects>
            </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                <v-budget-projects></v-budget-projects>
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
import BudgetProjectsDatatable from './BudgetProjectsDatatable.vue';
import ActiveProjectsDatatable from './ActiveProjectsDatatable.vue';

export default {
    components: {
        'v-active-projects': ActiveProjectsDatatable,
        'v-budget-projects': BudgetProjectsDatatable
    },
    data: () => {
        return {
            tabs: ['Activos','Presupuestos','Preventa','Terminados']
        }
    }
}
</script>
