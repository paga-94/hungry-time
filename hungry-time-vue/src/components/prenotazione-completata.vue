<template>
    <div align="center">
        <h1>Prenotazione completata</h1>
        <h4>{{esito}}</h4>
    </div>
</template>

<script>
    import io from 'socket.io-client'

    const socket = io.connect('http://192.168.1.171:4000');

    export default {
        name: "prenotazione-completata",
        data() {
            return {
                esito: 'in attesa di conferma dal ristorante'
            }
        },
        beforeRouteLeave (to, from, next) {
            socket.emit('disconnect');
            next();
        },
        created() {
            this.esitoPrenotazione();
        },
        methods: {
            esitoPrenotazione() {

                socket.on('prenotazione-accettata', () => {
                    this.esito = 'prenotazione accettata';
                });

                socket.on('prenotazione-rifiutata', () => {
                    this.esito = 'mi spiace la prenotazione è stata rifiutata dal ristorante';
                });
            }
        }
    }
</script>

<style scoped>

</style>