<template>
    <div>
        <v-data-table
        :headers="headers"
        :items="inactiveUsers"
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
                class="green--text"
                @click="deleteItem(props.item)"
            >
                how_to_reg
            </v-icon>
            </td>
        </template>
        <template slot="no-data">
            No hay usuarios desactivados.
        </template>
        </v-data-table>
        <v-modal-confirm 
          @continueDeleting="onContinue"
          :title="titleModal"
          :text="textModal"
          ref="modalusers"></v-modal-confirm>
    </div>
</template>
<script>

import moment from 'moment';
import { mapGetters } from  'vuex';
import User from '@/models/user.js';
import ModalToConfirm from '@/components/includes/ModalToConfirm.vue';

export default {
    components:{
      'v-modal-confirm':ModalToConfirm
    },
    data: () => ({
        userToActivate: new User(),
        titleModal : 'Confirmar',
        textModal: '¿Realmente quieres activar de nuevo este usuario?',
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
        deleteItem(user){
            this.$refs.modalusers.dialog = true;
            this.userToActivate = user;
        },
        onContinue(){
          this.userToActivate.active = true;
          this.$store.dispatch('users/changeStatusUser', this.userToActivate)
        }
    },
    computed: {
        ...mapGetters({
            'inactiveUsers': 'users/getInactiveUsers',
        }),
  
    }
}
</script>

