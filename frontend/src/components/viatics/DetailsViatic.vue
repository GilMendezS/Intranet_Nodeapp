<template>
   <v-card color="cyan darken-3 white--text" elevation="elevation" hover='hover'>
       <v-card-title>
           <h3>Folio: {{viaticInfo.id}}</h3>
       </v-card-title>
       <v-card-text>
           <p>Proyecto: {{viaticInfo.project}}</p>
           <p>Empleado: {{viaticInfo.employee}}</p>
           <p>Estatus: {{viaticInfo.status}}</p>
           <p>Origen: {{viaticInfo.origin}}</p>
           <p>Destino: {{viaticInfo.destiny}}</p>
           <p>Salida: {{viaticInfo.departure}}</p>
           <p>Llegada: {{viaticInfo.arrive}}</p>
           <p>Creada: {{viaticInfo.created_at}}</p>
       </v-card-text>
   </v-card>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        hover: true,
        elevation: 5
    }),
    computed: {
        ...mapGetters({
            'viatic': 'viatics/getEditingViatic'
        }),
        viaticInfo(){
            return {
                id: this.viatic.id,
                status: this.viatic.status ? this.viatic.status.title : '',
                employee: `${this.viatic.user.name} ${this.viatic.user.lastname}`,
                departure: moment(this.viatic.departure).format('YYYY-MM-DD'),
                arrive: moment(this.viatic.arrive).format('YYYY-MM-DD'),
                origin : this.viatic.origin,
                destiny: this.viatic.destiny,
                project: this.viatic.project.code,
                created_at: moment(this.viatic.created_at).format('YYYY-MM-DD')
            }
        }
    }
}
</script>

