<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Departamentos</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" @click="showForm" dark class="mb-2">Agregar departamento</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{formTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 >
                  <v-text-field v-model="editedItem.title" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 >
                    <v-select
                    v-model="editedItem.user_id"
                    :items="filteredUsers"
                    item-value="id"
                    item-text="text"
                    label="Responsable"
                    ></v-select>
                  
                </v-flex>
                <v-flex xs12 >
                    <v-select
                    v-model="editedItem.area_id"
                    :items="filteredAreas"
                    item-value="id"
                    item-text="text"
                    label="Área"
                    ></v-select>
                  
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="departments"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
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
    <v-modal-confirm 
          @continueDeleting="onContinue"
          :title="titleModal"
          :text="textModal"
        ref="modaldepartments"></v-modal-confirm>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Department from '../../models/department.js';
import ModalToConfirm from '@/components/includes/ModalToConfirm.vue';

export default {
    components:{
      'v-modal-confirm':ModalToConfirm
    },
    data: () => ({
      titleModal : 'Confirmar',
      textModal: '¿Realmente quieres eliminar el departamento?',
      dialog: false,
      formTitle: '',
      creating: false,
      headers: [
        {
          text: 'Nombre',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: new Department(),
      defaultItem: new Department(),
      departmentToRemove: null
    }),
    methods: {
        initialize(){
            this.$store.dispatch('departments/loaDepartments');
        },
        showForm(){
            this.creating = true;
            this.editedItem = this.defaultItem;
            this.formTitle = 'Registrar Departamento'
        },
        close () {
            this.dialog = false
            
        },
        save(){
            this.dialog = false;
            if(this.creating){
                this.$store.dispatch('departments/createDepartment', this.editedItem);
                this.defaultItem = new Department();
            }
            else {
                
                this.$store.dispatch('departments/updateDepartment', this.editedItem);
            }
        },
        editItem(department){
            this.dialog = true;
            this.formTitle = 'Editar departamento';
            this.creating = false;
            this.editedItem = department;
        },
        deleteItem(department){
          this.departmentToRemove = department;
          this.$refs.modaldepartments.dialog = true;
        },
        onContinue(){
          this.$store.dispatch('departments/removeDepartment', this.departmentToRemove);
        },

    },
    computed: {
        ...mapGetters({
            'departments': 'departments/getDepartments',
            'users': 'users/getUsers',
            'areas': 'areas/getAreas'
        }),
        filteredUsers() {
            return this.users.map( u => {
                return {
                    id: u.id,
                    text: `${u.name} ${u.lastname}`
                }
            });
        },
        filteredAreas() {
            return this.areas.map( a => {
                return {
                    id: a.id,
                    text: a.title
                }
            })
        }
    }
}
</script>
