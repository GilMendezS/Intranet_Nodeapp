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
                <v-sales-projects></v-sales-projects>
            </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                <v-finished-projects></v-finished-projects>
            </v-card-text>
            </v-card>
        </v-tab-item>
        </v-tabs>
    </v-flex>
    

</template>

<script>
import SalesProjectsDatatable from './SalesProjectsDatatable.vue';
import BudgetProjectsDatatable from './BudgetProjectsDatatable.vue';
import ActiveProjectsDatatable from './ActiveProjectsDatatable.vue';
import FinishedProjectsDatatable from './FinishedProjectsDatatable.vue';
export default {
    components: {
        'v-active-projects': ActiveProjectsDatatable,
        'v-budget-projects': BudgetProjectsDatatable,
        'v-sales-projects': SalesProjectsDatatable,
        'v-finished-projects': FinishedProjectsDatatable
    },
    data: () => {
        return {
            tabs: ['Activos','Presupuestos','Preventa','Terminados']
        }
    }
}
</script>
