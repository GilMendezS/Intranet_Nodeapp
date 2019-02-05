<template>
<v-layout>
    <v-flex xs12 md6 offset-md3>
        <v-card >
            <v-card-title
                class="headline blue white--text"
                >
                <v-icon>
                    account_circle
                </v-icon>
                <h3>Login</h3>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-input
                        prepend-icon="email"
                    >
                        Email
                    </v-input>
                    <v-text-field
                        label="Email"
                        v-model="user.email"
                    >

                    </v-text-field>
                    <v-input
                        prepend-icon="vpn_key"
                    >
                        Password
                    </v-input>
                    <v-text-field
                        :type="'password'"
                        label="Password"
                        v-model="user.password"
                    >

                    </v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    class="blue white--text"
                    @click="onLogin"
                    :disabled="invalidForm"
                >
                Entrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import User from '../models/user'
export default {
    data(){
        return {
            user: new User()
        }
    },
    methods: {
        
    },
    computed: {
        invalidForm(){
            return this.user.email == '' || this.user.password == ''
        }
    }
}
</script>
