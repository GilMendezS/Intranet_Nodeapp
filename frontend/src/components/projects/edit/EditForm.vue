<template>
    <div>
        {{project}}
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters({
            'project': 'projects/getCurrentProject',
        })
    }
}
</script>

