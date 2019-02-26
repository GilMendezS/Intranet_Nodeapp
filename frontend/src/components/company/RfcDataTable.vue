<template>
  <div>
    
    <v-toolbar flat color="white">
      <v-toolbar-title>Rfc válidos para viáticos</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" @click="showForm" dark class="mb-2">Agregar rfc</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{formTitle}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 >
                  <v-text-field v-model="editedItem.title" label="Título"></v-text-field>
                </v-flex>
                <v-flex xs12 >
                  <v-text-field v-model="editedItem.rfc" label="Rfc"></v-text-field>
                </v-flex>
                <v-checkbox
                    v-if="!creating"
                    label="Activo"
                    v-model="editedItem.active"
                >
                </v-checkbox>
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
      :items="rfcs"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.rfc }}</td>
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
import { mapGetters } from 'vuex';
import Rfc from '@/models/rfc.js';
export default {
    data: () => ({
      dialog: false,
      formTitle: '',
      creating: false,
      headers: [
        {
          text: 'Título',
          align: 'left',
          sortable: true,
          value: 'title'
        },
        {
          text: 'Rfc',
          align: 'left',
          sortable: true,
          value: 'rfc'
        },
        { text: 'Actions', value: 'title', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: new Rfc(),
      defaultItem: new Rfc(),
    }),
    mounted() {
      
    },
    methods: {
        initialize(){
            this.$store.dispatch('rfcs/loadRfcs');
        },
        showForm(){
            this.creating = true;
            this.editedItem = this.defaultItem;
            this.formTitle = 'Registrar Rfc'
        },
        close () {
            this.dialog = false
        },
        save(){
            this.dialog = false;
            if(this.creating){
                this.$store.dispatch('rfcs/createRfc', this.editedItem);
                this.defaultItem = new Rfc();
            }
            else {
                this.editedItem.active != undefined ? true : false
                this.$store.dispatch('rfcs/updateRfc', this.editedItem);
            }
        },
        editItem(rfc){
            this.dialog = true;
            this.formTitle = 'Editar rfc';
            this.creating = false;
            this.editedItem = rfc;
            console.log(this.editedItem)
        },
        deleteItem(rfc){
         
        },
        continueRemoving(rfc){
          this.$store.dispatch('rfcs/disableRfc', rfc)
        }

    },
    computed: {
        ...mapGetters({
            'rfcs': 'rfcs/getRfcs',
        })
    }
}
</script>
