<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="hoursUser"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.project }}</td>
        <td>{{ props.item.activity }}</td>
        <td>{{ props.item.hours }}</td>
        <td>{{ props.item.created_by }}</td>
        <td>{{ props.item.in_time }}</td>
        <td>{{ props.item.date }}</td>
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
    
    </v-data-table>
    <v-modal-confirm 
          @continueDeleting="onContinue"
          :title="titleModal"
          :text="textModal"
        ref="modalusershour">
      </v-modal-confirm>
  
  </div>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import ModalToConfirm from '@/components/includes/ModalToConfirm.vue';

export default {
    components:{
      'v-modal-confirm':ModalToConfirm
    },
    data: () => ({
      titleModal : 'Confirmar',
      textModal: '¿Realmente quieres eliminar esta hora?',
      headers: [
          {text: 'Proyecto', align: 'left', sortable: true, value: 'project'},
          {text: 'Actividad', align: 'left', sortable: true, value: 'activity'},
          {text: 'Horas', align: 'left', sortable: true, value: 'hours'},
          {text: 'Registrado por', align: 'left', sortable: true, value: 'created_by'},
          {text: 'En Tiempo', align: 'left', sortable: true, value: 'in_time'},
          {text: 'Fecha', align: 'left', sortable: true, value: 'date'},
          {text: 'Creado', align: 'left', sortable: true, value: 'created_at'},
          { text: 'Actions', value: 'name', sortable: false }
      ],
      hourToRemove: null
    }),
    methods: {
        editItem(hour){

        },
        deleteItem(hour){
          this.hourToRemove = hour;
          this.$refs.modalusershour.dialog = true;
        },
        onContinue(){
          this.$store.dispatch('hours/removeHour', this.hourToRemove)
        },
    },
    computed: {
        ...mapGetters({
            'hours' : 'hours/getHoursOftheDay',
        }),
        hoursUser(){
            return this.hours.map( h => ({
                id: h.id,
                project: h.project.code,
                activity: h.activity,
                hours: h.hours,
                in_time: h.in_time ? 'SI' : 'No',
                created_by: h.project_manager ? 
                    `${h.project_manager.name} ${h.project_manager.lastname}`
                    : `${h.user.name} ${h.user.lastname}`,
                date: moment(h.date).format('YYYY-MM-DD'),
                created_at: moment(h.created_at).format('YYYY-MM-DD')
            }))
        }
    }
}
</script>
