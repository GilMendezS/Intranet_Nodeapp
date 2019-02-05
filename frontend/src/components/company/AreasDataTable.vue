<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Áreas</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" @click="showForm" dark class="mb-2">Agregar área</v-btn>
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
                    v-model="editedItem.UserId"
                    :items="filteredUsers"
                    item-value="id"
                    item-text="text"
                    label="Responsable"
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
      :items="areas"
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Area from '../../models/area.js';
export default {
    data: () => ({
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
      editedItem: new Area(),
      defaultItem: new Area(),
    }),
    methods: {
        initialize(){
            this.$store.dispatch('areas/loadAreas');
        },
        showForm(){
            this.creating = true;
            this.editedItem = this.defaultItem;
            this.formTitle = 'Registrar Área'
        },
        close () {
            this.dialog = false
            
        },
        save(){
            this.dialog = false;
            if(this.creating){
                this.$store.dispatch('areas/createArea', this.editedItem);
                this.defaultItem = new Area();
            }
            else {
                
                this.$store.dispatch('areas/updateArea', this.editedItem);
            }
        },
        editItem(area){
            this.dialog = true;
            this.formTitle = 'Editar área';
            this.creating = false;
            this.editedItem = area;
        },
        deleteItem(area){

        }

    },
    computed: {
        ...mapGetters({
            'areas': 'areas/getAreas',
            'users': 'users/getUsers'
        }),
        filteredUsers() {
            return this.users.map( u => {
                return {
                    id: u.id,
                    text: `${u.name} ${u.lastname}`
                }
            });
        }
    }
}
</script>
