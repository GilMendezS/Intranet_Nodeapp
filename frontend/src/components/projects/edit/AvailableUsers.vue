<template>
    <v-card>
        <v-card-title>
            <h3>Usuarios</h3>
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
                :items="posibleUsers"
                :search="search"
                :pagination.sync="pagination"
                class="elevation-3"
                >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-lef">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.lastname }}</td>
                    <td class="text-xs-left">{{ props.item.email }}</td>
                    <td>
                        <v-btn color="blue white--text" @click="onAddUser(props.item)">
                            <i class="fa fa-plus"></i>
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
            { text: 'Agregar a proyecto', value: 'id', sortable: false },
        ],
        pagination: {},
    }),
    methods: {
        onAddUser(user){
            this.$store.dispatch('projects/addUser', {...user, project_id: this.project.id});
        }
    },
    computed: {
        ...mapGetters({
            'project': 'projects/getCurrentProject',
            'users': 'users/getUsers'
        }),
        includedUsersId(){
            return this.project.users.map( u => u.id);
        },
        pages () {
            if (this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
            ) {
                return 0
            }
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },
        posibleUsers(){
            return this.users.filter(u => !this.includedUsersId.includes(u.id) )
        }
    }
}
</script>

