<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Puestos</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" @click="showForm" dark class="mb-2">Agregar puesto</v-btn>
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
                    v-model="editedItem.AreaId"
                    :items="filteredAreas"
                    item-value="id"
                    item-text="text"
                    label="Área"
                    ></v-select>
                  
                </v-flex>
                <v-flex xs12 >
                    <v-select
                    :disabled="!editedItem.AreaId"
                    v-model="editedItem.DepartmentId"
                    :items="filteredDepartments"
                    item-value="id"
                    item-text="text"
                    label="Departamento"
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
      :items="positions"
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
import Position from '../../models/position.js';
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
      editedItem: new Position(),
      defaultItem: new Position(),
    }),
    methods: {
        initialize(){
            this.$store.dispatch('positions/loadPositions');
        },
        showForm(){
            this.creating = true;
            this.editedItem = this.defaultItem;
            this.formTitle = 'Registrar Puesto'
        },
        close () {
            this.dialog = false
            
        },
        save(){
            this.dialog = false;
            if(this.creating){
                this.$store.dispatch('positions/createPosition', this.editedItem);
                this.defaultItem = new Position();
            }
            else {
                
                this.$store.dispatch('positions/updatePosition', this.editedItem);
            }
        },
        editItem(position){
            this.dialog = true;
            this.formTitle = 'Editar puesto';
            this.creating = false;
            this.editedItem = position;
            console.log("TO EDIT: ",this.editedItem)
        },
        deleteItem(area){

        }

    },
    computed: {
        ...mapGetters({
            'positions': 'positions/getPositions',
            'users': 'users/getUsers',
            'areas': 'areas/getAreas',
            'departments': 'departments/getDepartments'
        }),
        filteredDepartments() {
            const areaId = this.editedItem.AreaId;
            const items =  this.departments.filter(d => d.AreaId == areaId).map( d => {
                return {
                    id: d.id,
                    text: d.title
                }
            })
            return items;
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
