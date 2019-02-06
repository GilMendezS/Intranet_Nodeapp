<template>
    <v-flex xs12>
        <section>
        <v-parallax :src="images.login" >
          <v-layout
            column
            align-center
            justify-center
            class="black--text" 
          >    
            <h1 class="white--text mb-2 display-2 text-xs-center">Bienvenido</h1>
                <v-card class="login-form">
                    <v-card-title
                        class="headline blue white--text"
                        >
                        <v-icon>
                            account_circle
                        </v-icon>
                        <h3>Iniciar sesión</h3>
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
          </v-layout>
        </v-parallax>
    </section>
    </v-flex>
    

    
  
</template>
<script>
import User from '../models/user'
export default {
    data(){
        return {
            user: new User(),
            images: {
                login: require('../assets/landing.jpg')
            }
        }
    },
    methods: {
        onLogin(){
            this.$store.dispatch('auth/loginUser', this.user);
        }
    },
    computed: {
        invalidForm(){
            return this.user.email == '' || this.user.password == ''
        }
    }
}
</script>
<style scoped>
    .login-form{
        width: 45%;
    }
    @media only screen and (max-width: 600px) {
        .login-form {
            width: 100%;
        }
    }
</style>
