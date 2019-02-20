<template>
    <div>
        <v-data-table
        :headers="headers"
        :items="InactiveUsers"
        class="elevation-1"
        >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.lastname }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.area }}</td>
            <td>{{ props.item.department }}</td>
            <td>{{ props.item.position }}</td>
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
          text: 'Nombre',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Apellidos',
          align: 'left',
          sortable: true,
          value: 'lastname'
        },
        {
          text: 'Email',
          align: 'left',
          sortable: true,
          value: 'email'
        },
        {
          text: 'Area',
          align: 'left',
          sortable: true,
          value: 'area'
        },
        {
          text: 'Departamento',
          align: 'left',
          sortable: true,
          value: 'department'
        },
        {
          text: 'Puesto',
          align: 'left',
          sortable: true,
          value: 'position'
        },
        { text: 'Actions', value: 'id', sortable: false }
      ],
    }),
    methods: {
        initialize(){
            this.$store.dispatch('users/loadUsers');
        },
    },
    computed: {
        ...mapGetters({
            'InactiveUsers': 'users/getInativeUsers',
        }),
    }
}
</script>

