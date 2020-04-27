<template>
    <div>
        <router-link v-if="stato === 'modifica'" @click="cambiaStato('anteprima')" to="{name: 'anteprima-ristoratore'}" class="section-btn">Mostra anteprima</router-link>
        <router-link v-if="stato === 'anteprima'" @click="cambiaStato('modifica')" to="{name: 'paginaRistoratore'}" class="section-btn">Modifica</router-link>
    </div>
</template>

<script>
    export default {
        name: "bottone-modifica-ristoratore",
        data() {
            return {
                stato: 'modifica'
            }
        },
        methods: {
            cambiaStato(nuovoStato) {
                this.stato = nuovoStato;
            }
        }
    }
</script>

<style scoped>

</style>