<template>
    <div>
        <v-data-table
        :headers="headers"
        :items="activeUsers"
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
                title="Desactivar usuario"
                small
                class="red--text"
                @click="deleteItem(props.item)"
            >
                close
            </v-icon>
            </td>
        </template>
        <template slot="no-data">
            <v-btn color="primary" @click="initialize">Reload</v-btn>
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
import User from '@/models/user.js';
import { mapGetters } from  'vuex';
import ModalToConfirm from '@/components/includes/ModalToConfirm.vue';
export default {
    components:{
      'v-modal-confirm':ModalToConfirm
    },
    data: () => ({
        userToDelete: new User(),
        titleModal : 'Confirmar',
        textModal: '¿Realmente quieres desativar este usuario?',
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
    mounted(){
      
    },
    methods: {
        initialize(){
            this.$store.dispatch('users/loadUsers');
        },
        deleteItem(user){
            this.$refs.modalusers.dialog = true;
            this.userToDelete = user;
        },
        onContinue(){
          this.userToDelete.active = false;
          this.$store.dispatch('users/changeStatusUser', this.userToDelete)
        }
    },
    computed: {
        ...mapGetters({
            'activeUsers': 'users/getActiveUsers',
        }),
        
    }

}
</script>

