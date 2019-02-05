<template>
    <div class="mt-4">
        <table id="active-projects">
            <thead>
                <tr>
                    <th>PRY</th>
                    <th>Nombre</th>
                    <th>Responsable</th>
                    <th>Cliente</th>
                    <th>Presupuesto</th>
                    <th>Gastado</th>
                    <th>% Gastado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>PRY</th>
                    <th>Nombre</th>
                    <th>Responsable</th>
                    <th>Cliente</th>
                    <th>Responsable</th>
                    <th>Presupuesto</th>
                    <th>Gastado</th>
                    <th>% Gastado</th>
                    <th>Acciones</th>
                </tr>
            </tbody>
        </table>
    </div>
    
</template>
<script>
window.$ = window.jQuery = require('jquery');
const dt = require('datatables.net');
export default {
    mounted(){
        $(function(){
            $('#active-projects').DataTable();
        })
        
    }
}
</script>
