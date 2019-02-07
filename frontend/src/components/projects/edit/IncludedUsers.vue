<template>
    <v-card>
        <v-card-title>
            <h3>Usuarios en el proyecto</h3>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="includedUsers"
                :search="search"
                :pagination.sync="pagination"
                class="elevation-3"
                >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-lef">{{ props.item.lastname }}</td>
                    <td class="text-xs-left">{{ props.item.email }}</td>
                    <td class="text-xs-left">
                        
                          <v-checkbox
                            @change="modifyPermissions($event, props.item, true)"
                            v-model="props.item.can_add_viatics"
                            
                            ></v-checkbox>
                    </td>
                    <td class="text-xs-left">
                         <v-checkbox
                            @change="modifyPermissions($event, props.item, false)"
                            v-model="props.item.can_add_hours"
                        ></v-checkbox>    
                    </td>
                    <td>
                        <v-btn color="red white--text" @click="onRemoveUser(props.item)">
                            <i class="fa fa-trash"></i>
                        </v-btn>
                    </td>
                </template>
                </v-data-table>
                <div class="text-xs-center pt-2">
                    <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                </div>
        </v-card-text>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        search: '',
        headers: [
            { text: 'Nombre', align: 'left', value: 'name'},
            { text: 'Apellidos', align: 'left', value: 'lastname' },
            { text: 'Email', align: 'left', value: 'email'},
            { text: 'Regitrar viáticos', value: 'can_add_viatics', sortable: false },
            { text: 'Regitrar horas', value: 'can_add_hours', sortable: false },
            { text: 'Eliminar del proyecto', value: 'name', sortable: false },
        ],
        pagination: {},
    }),
    methods: {
        onRemoveUser(user){
            this.$store.dispatch('projects/removeUser', {...user, project_id: this.project.id});
        },
        modifyPermissions(event,user, isViatic){
            this.$store.dispatch('projects/changePermissions', 
            {
                ...user, 
                is_viatic: isViatic, 
                permission: event,
                project_id: this.project.id
            });
        }
    },
    computed: {
        ...mapGetters({
            'project': 'projects/getCurrentProject'
        }),
        pages () {
            if (this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
            ) {
                return 0
            }
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },
        includedUsers(){
            return this.project.users.map(u => {
                return {
                    id: u.id,
                    name: u.name,
                    lastname: u.lastname,
                    email: u.email,
                    can_add_viatics: u.project_user.can_add_viatics,
                    can_add_hours: u.project_user.can_add_hours
                }
            })
            
            
        }
    }
}
</script>

