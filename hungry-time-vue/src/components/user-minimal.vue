<template>
    <ul class="user">
        <li class="user-profiles-list-minimal">

            <div class="user-avatar">
                <a href="#">
                    <img src="../../public/images/5.jpg" width="41" alt="Profile of Tracey Parker">
                </a>
            </div>

            <p class="user-name">
                <a @click="paginaPersonale">{{currentUser.username}}</a>
                <br>
                <a class="nav-link" href @click.prevent="logOut">
                    Logout
                </a>
            </p>

        </li>
    </ul>
</template>

<script>
    export default {
        name: "user-minimal",
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
        },
        methods: {
            logOut() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/');
            },

            paginaPersonale() {
                if (this.currentUser.roles.includes('ROLE_UTENTE')) {
                    const idUtente = this.currentUser.id;
                    this.$router.push({ name: 'paginaUtente', params:
                            { idUtente: idUtente}
                    });
                }
                else if (this.currentUser.roles.includes('ROLE_RISTORATORE')){
                    const idRistorante = this.currentUser.idRistorante;
                    this.$router.push({ name: 'paginaRistoratore', params:
                            { IDristorante: idRistorante }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    a {
        cursor: pointer;
    }
    .user {
        background-color: #ce3232;
    }
</style>