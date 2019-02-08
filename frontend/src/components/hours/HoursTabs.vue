<template>
    <v-flex >
        <v-tabs  fixed-tabs>
            <v-tab
                v-for="tab in tabs"
                :key="tab"
                ripple
            >
                {{ tab }}
            </v-tab>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    <v-add-hours></v-add-hours>
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    <v-history-hours></v-history-hours>
                </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-flex>
</template>

<script>
import AddHours from './AddHour.vue';
import HistoryHours from './HistoryHours.vue';
export default {
    components : {
        'v-add-hours': AddHours,
        'v-history-hours':HistoryHours
    },
    data: () => {
        return {
            tabs: ['Nuevo','Historial']
        }
    }
}
</script>
