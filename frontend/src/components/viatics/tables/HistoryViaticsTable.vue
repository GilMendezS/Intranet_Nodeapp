<template>
    <div class="mt-4">
        <table id="history-viatics" class="v-datatable v-table theme--light">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Proyecto</th>
                    <th>Estatus</th>
                    <th>Salida</th>
                    <th>LLegada</th>
                    <th>Despositado</th>
                    <th>Comprobado</th>
                    <th>Solicitante</th>
                    <th>Creado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    
</template>
<script>
import moment from 'moment';
window.$ = window.jQuery = require('jquery');
const dt = require('datatables.net');
export default {
    mounted(){
        const self = this;
        $(function(){
            window.history_viatics_table = $('#history-viatics').DataTable( {
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
                    url: 'http://localhost:8081/api/v1/viatics/history',
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
                        targets: 9,
                        render: (value, type, row) => {
                            return `<button data-id="${value}" class="open_viatic v-btn v-btn--flat v-btn--icon theme--light blue--text"> <i class="fa fa-edit"></i> </button>`
                        }
                    },
                    {
                        targets: [3,4,8],
                        render: function(value, row, ) {
                            try {
                                return moment(value).format('YYYY-MM-DD');
                            } catch (error) {
                                return value;
                            }
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
        $('#history-viatics tbody').on('click','.open_viatic', function(e) {
            
            const viaticId = $(this).data('id');
            if(viaticId){
                self.onShowViatic(viaticId);
            }
            
        })
    },
    methods: {
        onShowViatic(id){
            //this.$router.push({name: 'edit-project', params: {id : id}});
        },
        logoutUser(auto){
            this.$store.dispatch('auth/logoutUser', auto)
        }
    }
}
</script>
