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
                Áreas
            </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item
            
        >
            <v-card flat>
            <v-card-text>
                Departamentos
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

export default {
    components : {
        
    },
    data: () => {
        return {
            tabs: ['Áreas','Departamentos','Puestos']
        }
    }
}
</script>
