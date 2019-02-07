<template>
    <div class="mt-4">
        <table id="active-projects">
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
            window.active_projects_table = $('#active-projects').DataTable( {
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
                    url: 'http://localhost:8081/api/v1/projects/actives/datatable',
                },
                columnDefs: [
                    {
                        targets: 7,
                        render: (value, type, row) => {
                            return `<button data-id="${value}" class="open_project v-btn v-btn--flat v-btn--icon theme--light blue--text"> <i class="fa fa-edit"></i> </button>`
                        }
                    }
                ],
                // columnDefs: [
                //     {
                //         targets: 5,
                //         render: function(value, type, row){
                //             try{
                //                 const devices = JSON.parse(value.devices)
                //                 let status_class = '';
                //                 const list = devices.map(i => {
                //                     if (i.status == 'online'){
                //                         status_class = 'success';
                //                     }
                //                     else if(i.status ='offline'){
                //                         status_class = 'danger';
                //                     }
                //                     else {
                //                         status_class = 'dark';
                //                     }
                //                     return `<span class="badge badge-${status_class}"
                //                     Title="\nName=${i.name} 
                //                     Serial=${i.serial} 
                //                     LanIp=${i.lanIp} 
                //                     Mac=${i.mac} 
                //                     NetworkId=${i.networkId} 
                //                     PublicIp=${i.publicIp}
                //                     Status=${i.status}
                //                     "
                //                 >${i.serial}</span>`
                //                 })
                //                 return list.join(' ')
                //             }
                //             catch(err){
                                
                //                 return value;
                //             }
                //         }
                //     }
                // ],
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
        $('#active-projects tbody').on('click','.open_project', function(e) {
            
            const projectId = $(this).data('id');
            if(projectId){
                self.onShowProject(projectId);
            }
            
        })
    },
    methods: {
        onShowProject(id){
            this.$router.push({name: 'edit-project', params: {id : id}});
        }
    }
}
</script>
