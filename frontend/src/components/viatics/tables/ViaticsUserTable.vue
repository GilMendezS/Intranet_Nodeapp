<template>
    <div>
        <v-data-table
        :headers="headers"
        :items="viatics"
        class="elevation-1"
        >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.project }}</td>
            <td>{{ props.item.origin }}</td>
            <td>{{ props.item.destiny }}</td>
            <td>{{ props.item.departure }}</td>
            <td>{{ props.item.arrive }}</td>
            <td>{{ props.item.money_requested }}</td>
            <td>{{ props.item.authorizator }}</td>
            <td>{{ props.item.status }}</td>
            <td class="justify-center layout px-0">
            <v-icon
                small
                class="mr-2 blue--text"
                @click="editItem(props.item)"
            >
                edit
            </v-icon>
            <v-icon
                small
                class="red--text"
                @click="deleteItem(props.item)"
            >
                delete
            </v-icon>
            </td>
        </template>
        <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reload</v-btn>
        </template>
        </v-data-table>
    </div>
</template>
<script>
import moment from 'moment';
import { mapGetters } from  'vuex';
export default {
    data: () => ({
        headers: [
        {
          text: 'Folio',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Proyecto',
          align: 'left',
          sortable: true,
          value: 'project'
        },
        {
          text: 'Origen',
          align: 'left',
          sortable: true,
          value: 'origin'
        },
        {
          text: 'Destino',
          align: 'left',
          sortable: true,
          value: 'destiny'
        },
        {
          text: 'Salida',
          align: 'left',
          sortable: true,
          value: 'departure'
        },
        {
          text: 'Llegada',
          align: 'left',
          sortable: true,
          value: 'arrive'
        },
        {
          text: 'Solicitado',
          align: 'left',
          sortable: true,
          value: 'money_requested'
        },
        {
          text: 'Autoriza',
          align: 'left',
          sortable: true,
          value: 'auth_user_id'
        },
        {
          text: 'Estatus',
          align: 'left',
          sortable: true,
          value: 'status_id'
        },
        { text: 'Actions', value: 'name', sortable: false }
      ],
    }),
    methods: {
        initialize(){
            this.$store.dispatch('viatics/loadViaticsUser');
        },
    },
    computed: {
        ...mapGetters({
            'viaticsUser': 'viatics/getViaticsUser',
        }),
        viatics(){
            return this.viaticsUser.map( v => ({
                id: v.id,
                project: v.project.code,
                origin: v.origin,
                destiny: v.destiny,
                departure: moment(v.departure).format('YYYY-MM-DD'),
                arrive: moment(v.arrive).format('YYYY-MM-DD'),
                money_requested: parseFloat(v.money_requested).toFixed(2),
                authorizator: v.auth_user_id ? v.authorizator.name : 'N/A',
                status: v.status.title,
            }) );
        }
    }
}
</script>

