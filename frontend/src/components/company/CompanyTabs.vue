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
                <v-areas></v-areas>
            </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                <v-departments></v-departments>
            </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                Puestos
            </v-card-text>
            </v-card>
        </v-tab-item>
        </v-tabs>
    </v-flex>
    

</template>

<script>
import AreasDataTable from './AreasDataTable.vue'
import DepartmentsTable from './DepartmentsTable.vue';
export default {
    components : {
        'v-areas': AreasDataTable,
        'v-departments':DepartmentsTable
    },
    data: () => {
        return {
            tabs: ['Áreas','Departamentos','Puestos']
        }
    }
}
</script>
