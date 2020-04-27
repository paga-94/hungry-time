<template>
    <section class="container">

        <div class="row" v-if="prenotazioniConfermate.length === 0 && prenotazioniInAttesa.length === 0">
            <h1 align="center">NON CI SONO PRENOTAZIONI</h1>
        </div>

        <div class="row" v-if="prenotazioniConfermate.length > 0">

            <h1 align="center">PRENOTAZIONI CONFERMATE</h1>

            <div class="col-md-3 col-sm-8">
                <div class="inline">
                    <button v-for="giorno in giorniConfermate" :key="giorniConfermate.indexOf(giorno)" class="btn-danger"
                            :class="{'section-btn': giorno.premuto }" @click="cambiaGiornoConfermate(giorno)">
                        {{giorno.data}}
                    </button>
                </div>
                <div class="footer-info">
                    <div class="section-title">
                        <h3 class="wow fadeInUp" data-wow-delay="0.2s">DETTAGLI TAVOLO</h3>
                        <table>
                            <tr><td><h3>Orario</h3></td><td><h3>coperti</h3></td><td><h3>Azione</h3></td></tr>
                            <tr v-for="prenotazioneCorrente in prenotazioniGiornoCorrente" :key="prenotazioniGiornoCorrente.indexOf(prenotazioneCorrente)">
                                <td>{{prenotazioneCorrente.data}}</td>
                                <td>{{prenotazioneCorrente.numero_persone}}</td>
                                <td>
                                    <button class="section-btn" @click="recuperaPiattiPrenotazioneConfermata(prenotazioneCorrente)">
                                        visualizza piatti
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-8">
            </div>

            <div class="col-md-3 col-sm-8" v-if="mostraPiattiConfermate">
                <div class="footer-info">
                    <div class="section-title">
                        <h3 class="wow fadeInUp" data-wow-delay="0.2s">PIATTI PRENOTAZIONE SELEZIONATA</h3>
                        <ul v-for="personaCorrente in persone" :key="persone.indexOf(personaCorrente)">
                            <strong class="persona">PERSONA {{persone.indexOf(personaCorrente) + 1}}</strong>
                            <li v-for="piatto in personaCorrente" :key="personaCorrente.indexOf(piatto)">
                                <strong>{{piatto}}</strong>
                            </li>
                            <br>
                        </ul>
                        <div align="right">
                            <button class="btn-success" @click="concludiPrenotazione">conclusa</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="row" v-if="prenotazioniInAttesa.length > 0">

            <h1 align="center">PRENOTAZIONI IN ATTESA</h1>

            <div class="col-md-3 col-sm-8">
                <div class="inline">
                    <button v-for="giorno in giorniPending" :key="giorniPending.indexOf(giorno)" class="btn-danger"
                            :class="{'section-btn': giorno.premuto }" @click="cambiaGiornoPending(giorno)">
                        {{giorno.data}}
                    </button>
                </div>
                <div class="footer-info">
                    <div class="section-title">
                        <h3 class="wow fadeInUp" data-wow-delay="0.2s">DETTAGLI TAVOLO</h3>
                        <table>
                            <tr><td><h3>Orario</h3></td><td><h3>coperti</h3></td><td><h3>Azione</h3></td></tr>
                            <tr v-for="prenotazioneCorrente in prenotazioniGiornoCorrentePending"
                                :key="prenotazioniGiornoCorrentePending.indexOf(prenotazioneCorrente)">
                                <td>{{prenotazioneCorrente.data}}</td>
                                <td>{{prenotazioneCorrente.numero_persone}}</td>
                                <td>
                                    <button class="section-btn" @click="recuperaPiattiPrenotazionePending(prenotazioneCorrente)">
                                        visualizza piatti
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-8">
            </div>

            <div class="col-md-3 col-sm-8" v-if="mostraPiattiPending">
                <div class="footer-info">
                    <div class="section-title">
                        <h3 class="wow fadeInUp" data-wow-delay="0.2s">PIATTI PRENOTAZIONE SELEZIONATA</h3>
                        <ul v-for="personaCorrente in persone" :key="persone.indexOf(personaCorrente)">
                            <strong class="persona">PERSONA {{persone.indexOf(personaCorrente) + 1}}</strong>
                            <li v-for="piatto in personaCorrente" :key="personaCorrente.indexOf(piatto)">
                                <strong>{{piatto}}</strong>
                            </li>
                            <br>
                        </ul>
                        <div align="right">
                        <button class="btn-success" @click="accettaPrenotazione">accetta</button>
                            <button class="btn-danger" @click="rifiutaPrenotazione">rifiuta</button>
                        </div>
                    </div>
                </div>
            </div>
            {{prova}}

        </div>

    </section>
</template>

<script>
    import TavoliDataService from "@/services/TavoliDataService";
    import PrenotazionePiattiDataService from "@/services/PrenotazionePiattiDataService";
    import io from 'socket.io-client';

    const socket = io.connect('http://192.168.1.171:4000');

    export default {
        name: "gestione-ristorante",
        data() {
            return {
                prenotazioniConfermate: [],
                prenotazioniInAttesa: [],
                mostraPiattiConfermate: false,
                mostraPiattiPending: false,
                piattiPrenotazione: [],
                persone: [],
                idPrenotazioneCorrente: null,
                giorniConfermate: [],
                giorniPending: [],
                prenotazioniGiornoCorrente: [],
                prenotazioniGiornoCorrentePending:[],
                prova: ''
            }
        },
        beforeRouteLeave (to, from, next) {
            socket.emit('disconnect');
            next();
        },
        created() {
            this.aggiornaPrenotazioni();
        },
        mounted() {
            this.recuperaPrenotazioniConfermate();
            this.recuperaPrenotazioniInAttesa();
        },
        methods: {

            aggiornaPrenotazioni() {

                socket.on('prenotazione', (data) => {
                    console.log('ricevuto');
                    if (data.idRistorante === Number(this.$route.params.IDristorante)) {
                        console.log('dentro if');
                        this.prova = 'nuova prenotazione';
                        this.recuperaPrenotazioniInAttesa();
                    }
                });

            },

            recuperaPrenotazioniConfermate() {
                this.prenotazioniConfermate = [];
                this.giorniConfermate = [];
                let presente = false;
                const optionsGiorno = {'weekday': 'long', 'month': '2-digit', 'day': '2-digit'};
                TavoliDataService.getAccettateByIdRistorante(this.$route.params.IDristorante)
                    .then(response => {
                        if (response.data.length > 0) {
                            const prenotazioni = response.data;
                            prenotazioni.forEach(corrente => {
                                let data = new Date(corrente.data);
                                this.giorniConfermate.forEach(giorno => {
                                    if (giorno.data === data.toLocaleString('it-IT', optionsGiorno)) {
                                        presente = true;
                                    }
                                });
                                if (!presente) {
                                    this.giorniConfermate.push({
                                        data: data.toLocaleString('it-IT', optionsGiorno),
                                        premuto: false
                                    })
                                }
                                this.prenotazioniConfermate.push({
                                    id: corrente.id,
                                    data: data.toLocaleTimeString(),
                                    dataCompleta: data.toString(),
                                    numero_persone: corrente.numero_persone
                                });
                                presente = false;
                            });
                            this.cambiaGiornoConfermate(this.giorniConfermate[0])
                        }
                    })
            },

            recuperaPrenotazioniInAttesa() {
                this.prenotazioniInAttesa = [];
                this.giorniPending = [];
                let presente = false;
                const optionsGiorno = {'weekday': 'long', 'month': '2-digit', 'day': '2-digit'};
                TavoliDataService.getPendingByIdRistorante(this.$route.params.IDristorante)
                    .then(response => {
                        if (response.data.length > 0) {
                            const prenotazioni = response.data;
                            prenotazioni.forEach(corrente => {
                                let data = new Date(corrente.data);
                                this.giorniPending.forEach(giorno => {
                                    if (giorno.data === data.toLocaleString('it-IT', optionsGiorno)) {
                                        presente = true;
                                    }
                                });
                                if (!presente) {
                                    this.giorniPending.push({
                                        data: data.toLocaleString('it-IT', optionsGiorno),
                                        premuto: false
                                    })
                                }
                                this.prenotazioniInAttesa.push({
                                    id: corrente.id,
                                    data: data.toLocaleTimeString(),
                                    dataCompleta: data.toString(),
                                    numero_persone: corrente.numero_persone
                                });
                                presente = false;
                            });
                            this.cambiaGiornoPending(this.giorniPending[0]);
                        }
                    })
            },

            recuperaPiattiPrenotazioneConfermata(prenotazione) {
                this.idPrenotazioneCorrente = prenotazione.id;
                this.mostraPiattiPending = false;
                this.persone = [];
                for (let i = 0; i < prenotazione.numero_persone; i += 1) {
                    this.persone.push([]);
                }
                PrenotazionePiattiDataService.getByIdPrenotazione(prenotazione.id)
                    .then( response => {
                        response.data.forEach(piatto => {
                            this.persone[piatto.prenotazione_piatto.persona - 1].push(piatto.nome);
                            }
                        )
                    });
                this.mostraPiattiConfermate = true;
            },

            recuperaPiattiPrenotazionePending(prenotazione) {
                this.idPrenotazioneCorrente = prenotazione.id;
                this.mostraPiattiConfermate = false;
                this.persone = [];
                for (let i = 0; i < prenotazione.numero_persone; i += 1) {
                    this.persone.push([]);
                }
                PrenotazionePiattiDataService.getByIdPrenotazione(prenotazione.id)
                    .then( response => {
                        response.data.forEach(piatto => {
                                this.persone[piatto.prenotazione_piatto.persona - 1].push(piatto.nome);
                            }
                        )
                    });
                this.mostraPiattiPending = true;
            },

            accettaPrenotazione() {
                TavoliDataService.updatePrenotazione(this.idPrenotazioneCorrente, {accettata: true})
                    .then(response => {
                        console.log(response.data);
                        this.mostraPiattiPending = false;
                        this.recuperaPrenotazioniConfermate();
                        this.recuperaPrenotazioniInAttesa();
                        socket.emit('accetta-prenotazione');
                    });
            },

            rifiutaPrenotazione() {
                TavoliDataService.updatePrenotazione(this.idPrenotazioneCorrente, {rifiutata: true})
                    .then(response => {
                        console.log(response.data);
                        this.mostraPiattiPending = false;
                        this.recuperaPrenotazioniInAttesa();
                        socket.emit('rifiuta-prenotazione');
                    });
            },

            concludiPrenotazione() {
                TavoliDataService.updatePrenotazione(this.idPrenotazioneCorrente, {conclusa: true})
                    .then(response => {
                        console.log(response.data);
                        this.mostraPiattiConfermate = false;
                        this.recuperaPrenotazioniConfermate();
                    });
            },

            cambiaGiornoConfermate(nuovoGiorno) {
                const optionsButton = {'weekday': 'long', 'month': '2-digit', 'day': '2-digit'};
                this.giorniConfermate.forEach(giorno => {giorno.premuto = false});
                nuovoGiorno.premuto = true;
                this.prenotazioniGiornoCorrente = [];
                this.prenotazioniConfermate.forEach(prenotazione => {
                    if ((new Date(prenotazione.dataCompleta).toLocaleString('it-IT', optionsButton)) === nuovoGiorno.data) {
                        this.prenotazioniGiornoCorrente.push(prenotazione);
                    }
                })
            },

            cambiaGiornoPending(nuovoGiorno) {
                const optionsButton = {'weekday': 'long', 'month': '2-digit', 'day': '2-digit'};
                this.giorniPending.forEach(giorno => {giorno.premuto = false});
                nuovoGiorno.premuto = true;
                this.prenotazioniGiornoCorrentePending = [];
                this.prenotazioniInAttesa.forEach(prenotazione => {
                    if ((new Date(prenotazione.dataCompleta).toLocaleString('it-IT', optionsButton)) === nuovoGiorno.data) {
                        this.prenotazioniGiornoCorrentePending.push(prenotazione);
                    }
                })
            },

        }
    }
</script>

<style scoped>
    table {
        border-collapse:collapse
    }
    td, th {
        border:1px solid #ddd;
        padding:8px;
        text-align: center;
    }
    .persona {
        color: red;
    }
</style>