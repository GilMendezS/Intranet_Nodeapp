<template>
    <div class="mt-4">
        <table id="finished-projects" class="v-datatable v-table theme--light">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>PRY</th>
                    <th>Nombre</th>
                    <th>Responsable</th>
                    <th>Cliente</th>
                    <th>Presupuesto</th>
                    <th>Gastado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    
</template>
<script>
window.$ = window.jQuery = require('jquery');
const dt = require('datatables.net');
export default {
    mounted(){
        const self = this;
        $(function(){
            window.finished_projects_table = $('#finished-projects').DataTable( {
                "processing": true,
                "serverSide": true,
                "responsive": true,
                "orderCellsTop": true,
                "ordering": true,
                aLengthMenu: [
                    [10,25, 50, 100, 200, -1],
                    [10,25, 50, 100, 200, "All"]
                ],
                ajax: {
                    url: 'http://localhost:8081/api/v1/projects/finished/datatable',
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", localStorage.getItem('token'));
                    },
                     error: function (xhr, error, thrown) {
                        if(xhr.status === 401){
                            self.logoutUser(true);
                        }
                    }
                },
                "drawCallback": function () {
                    const buttons = document.querySelectorAll('.paginate_button');
                    for (var i = 0; i < buttons.length; i++) {
                        buttons[i].classList += ' v-btn theme--light blue text--white';
                    }
                },
                columnDefs: [
                    {
                        targets: 7,
                        render: (value, type, row) => {
                            return `<button data-id="${value}" class="open_project v-btn v-btn--flat v-btn--icon theme--light blue--text"> <i class="fa fa-edit"></i> </button>`
                        }
                    }
                ],
                
                "order": [[ 0, "desc" ]],
                // dom: 'Bfrtip',
                // buttons: [
                //     'copyHtml5',
                //     'excelHtml5',
                //     'csvHtml5',
                //     'pdfHtml5'
                // ]
            } );
        })
        $('#finished-projects tbody').on('click','.open_project', function(e) {
            
            const projectId = $(this).data('id');
            if(projectId){
                self.onShowProject(projectId);
            }
            
        })
    },
    methods: {
        onShowProject(id){
            this.$router.push({name: 'edit-project', params: {id : id}});
        },
        logoutUser(auto){
            this.$store.dispatch('auth/logoutUser', auto)
        }
    }
}
</script>
