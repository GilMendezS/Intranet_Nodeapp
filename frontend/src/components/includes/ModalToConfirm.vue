<template>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{title}}
        </v-card-title>

        <v-card-text>
          {{text}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
         <v-btn
            color="red"
            flat
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="sendConfirmation"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    props:['title', 'text'],
    data: () => ({
        dialog: false
    }),
    methods: {
        sendConfirmation(){
          this.dialog = false
          this.$emit('continueDeleting')
        }
    }
}
</script>

