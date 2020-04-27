<template>
    <!-- PRESENTAZIONE HOME -->

    <div>
        <h3>Quando il tempo è denaro</h3>
        <h1>Sprecane il meno possibile</h1>
        <h4>Scopri il mondo di hungry time</h4>
    </div>

</template>

<script>
    export default {
        name: "presentazioneHome",
        //se l'utente è già loggato come user rimanda alla home,
        // se è un ristoratore rimanda alla pagina del suo ristorante
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
                } else if (this.currentUser.roles.includes('ROLE_MODERATORE')){
                    const idModeratore = this.currentUser.id;
                    this.$router.push({ name: 'home-moderatore', params:
                            { idModeratore: idModeratore }});
                }
            }
        }
    }
</script>

<style scoped>

</style>