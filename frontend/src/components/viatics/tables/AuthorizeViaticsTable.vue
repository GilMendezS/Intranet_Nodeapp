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
            <td :class="props.item.tdclass" class="white--text">{{ props.item.status }}</td>
            <td>{{ props.item.money_requested }}</td>
            <td>{{ props.item.money_deposited }}</td>
            <td>{{ props.item.money_checked }}</td>
            <td>{{ props.item.user }}</td>
            <td>{{ props.item.departure }}</td>
            <td>{{ props.item.arrive }}</td>
            <td>{{ props.item.created_at }}</td>
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
import mixins  from '../../../mixins/mixins.js';
import moment from 'moment';
import { mapGetters } from  'vuex';
export default {
    mixins:[mixins],
    mounted(){
        this.$store.dispatch('viatics/loadPendingViatics');
    },
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
          text: 'Estatus',
          align: 'left',
          sortable: true,
          value: 'status'
        },
        {
          text: 'Solicitado',
          align: 'left',
          sortable: true,
          value: 'money_requested'
        },
        {
          text: 'Depositado',
          align: 'left',
          sortable: true,
          value: 'money_deposited'
        },
        {
          text: 'Comprobado',
          align: 'left',
          sortable: true,
          value: 'money_checked'
        },
        {
          text: 'Solicitante',
          align: 'left',
          sortable: true,
          value: 'user'
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
          text: 'Creado',
          align: 'left',
          sortable: true,
          value: 'created_at'
        },
        { text: 'Actions', value: 'name', sortable: false }
      ],
    }),
    methods: {
        initialize(){
            this.$store.dispatch('viatics/loadPendingViatics');
        },
        editItem(viatic){
          this.$router.push({
            name: 'edit-viatic',
            params: {
              id: viatic.id
            }
          })
        }
        
    },
    computed: {
        ...mapGetters({
            'viaticsToAuthorize': 'viatics/gePendingViatics',
        }),
        viatics(){
            const self = this;
            return this.viaticsToAuthorize.map( v => ({
                id: v.id,
                project: v.project.code,
                origin: v.origin,
                destiny: v.destiny,
                departure: moment(v.departure).format('YYYY-MM-DD'),
                arrive: moment(v.arrive).format('YYYY-MM-DD'),
                money_requested: parseFloat(v.money_requested).toFixed(2),
                money_checked: parseFloat(v.money_checked).toFixed(2),
                money_deposited: parseFloat(v.money_deposited).toFixed(2),
                user: v.user.name,
                status: v.status.title,
                tdclass: self.getTdColor(v.status.name),
                created_at: moment(v.created_at).format('YYYY-MM-DD')
            }) );
        }
    }
}
</script>

