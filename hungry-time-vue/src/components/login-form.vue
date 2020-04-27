<template>
    <div>
        <h1>Login</h1>
        <form name="form" @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Username</label>
                <input v-model="user.username" v-validate="'required'" type="text" class="form-control" name="username" id="username"/>
                <div v-if="errors.has('username')" class="alert alert-danger" role="alert">
                    Username richiesto!
                </div>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="user.password" v-validate="'required'" type="password" class="form-control" name="password" id="password"/>
                <div v-if="errors.has('password')" class="alert alert-danger" role="alert">
                    Password richiesta!
                </div>
            </div>
            <div class="form-group">
                <button class="section-btn" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Login</span>
                </button>
            </div>
            <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
            </div>
        </form>
    </div>
</template>

<script>
    import Utente from "@/models/utente";

    export default {
        name: "loginForm",
        data() {
            return {
                user: new Utente('', ''),
                loading: false,
                message: ''
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            },
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        created() {
            if (this.loggedIn) {
                if (this.currentUser.roles.includes('ROLE_UTENTE')) {
                    this.$router.push('/home');
                }
                else if (this.currentUser.roles.includes('ROLE_RISTORATORE')){
                    const idRistorante = this.currentUser.idRistorante;
                    this.$router.push({ name: 'gestione-ristorante', params:
                            { IDristorante: idRistorante }})
                } else if (this.currentUser.roles.includes('ROLE_MODERATORE')) {
                    const idModeratore = this.currentUser.id;
                    this.$router.push({ name: 'home-moderatore', params:
                            { idModeratore: idModeratore}});
                }
            }
        },
        methods: {
            handleLogin() {
                this.loading = true;
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        this.loading = false;
                        return;
                    }

                    if (this.user.username && this.user.password) {
                        this.$store.dispatch('auth/login', this.user).then(
                            () => {
                                if (this.currentUser.roles.includes('ROLE_UTENTE')) {
                                    this.$router.push('/home');
                                }
                                else if (this.currentUser.roles.includes('ROLE_RISTORATORE')){
                                    const idRistorante = this.currentUser.idRistorante;
                                    this.$router.push({ name: 'gestione-ristorante', params:
                                            { IDristorante: idRistorante }})
                                } else if (this.currentUser.roles.includes('ROLE_MODERATORE')) {
                                    const idModeratore = this.currentUser.id;
                                    this.$router.push({ name: 'home-moderatore', params:
                                            { idModeratore: idModeratore}});
                                }
                            },
                            error => {
                                this.loading = false;
                                this.message =
                                    (error.response && error.response.data) ||
                                    error.message ||
                                    error.toString();
                            }
                        );
                    }
                });
            }
        }
    };
</script>

<style scoped>

</style>