<template>

    <v-container>
        <v-layout>
            <v-flex xs12 sm8 offset-sm2>
                <v-timeline align-top>
                    <v-timeline-item
                    v-for="(comment, i) in orderedComments"
                    :key="i"
                    color="blue"
                    icon="date_range"
                    fill-dot
                    >
                    <v-card
                        color="blue"
                        dark
                    >
                        <v-card-title class="title">{{comment.fullname}} - {{comment.date}}</v-card-title>
                        <v-card-text class="white text--primary">
                        <p>{{comment.comment}}</p>
                        
                        </v-card-text>
                    </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-flex>
        </v-layout>
    </v-container>
  
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    methods: {
        formatDate(date) {
            let d = new Date(date);
            let month = '' + (d.getMonth() + 1);
            let day = '' + d.getDate();
            let year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }
    },
    computed: {
        ...mapGetters({
            'project':'projects/getCurrentProject'
        }),
        orderedComments(){
            return this.project.comments.map( c => {
                return {
                    comment: c.comment,
                    fullname: `${c.user.name} ${c.user.lastname}`,
                    date: this.formatDate(c.created_at)
                }
            })
        }
    }
}
</script>
