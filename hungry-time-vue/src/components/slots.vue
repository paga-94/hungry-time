<template>
    <div data-stellar-background-ratio="0.5">
        <div class="container">
            <h1>SLOT DISPONIBILI</h1>
            <div class="inline">
                <button v-for="giorno in giorni" :key="giorno.data" class="btn-danger"
                        :class="{'section-btn': giorno.premuto }" @click="cambiaGiorno(giorno)">
                    {{giorno.data}}
                </button>
            </div>
            <table>
                <tr><td><h3>Orario</h3></td><td><h3>Posti disponibili</h3></td><td><h3>Seleziona slot</h3></td></tr>
                <tr v-for="slotCorrente in SlotsGiornoCorrente" :key="slotCorrente.numero"><td>{{slotCorrente.orarioLocale}}</td><td>{{slotCorrente.posti}}</td>
                    <td><button class="section-btn" @click="prenotaTavolo(slotCorrente.orario)">Scegli slot</button></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import OrariDataService from "@/services/OrariDataService";
    import TavoliDataService from "@/services/TavoliDataService";

    export default {
        name: "slots",
        data() {
            return {
                Slots: [],
                SlotsGiornoCorrente: [],
                orari: {},
                giorni: [],
                Prenotazioni: [],
                durataSlot: null,
                postiPerSlot: null,
                zeroPrenotazioni: true
            }
        },
        mounted() {
            this.recuperaPostiSlot();
        },
        methods: {

            cambiaGiorno(nuovoGiorno) {
                const optionsButton = {'weekday': 'long', 'month': '2-digit', 'day': '2-digit'};
                this.giorni.forEach(giorno => {giorno.premuto = false});
                nuovoGiorno.premuto = true;
                this.SlotsGiornoCorrente = [];
                this.Slots.forEach(slot => {
                    if ((new Date(slot.orario).toLocaleString('it-IT', optionsButton)) === nuovoGiorno.data) {
                        this.SlotsGiornoCorrente.push(slot);
                    }
                })
            },

            // primo step prenotazione tavolo
            prenotaTavolo(orario) {
                const datiprenotazione = {
                    id_ristorante: this.$route.params.IDristorante,
                    id_utente: this.$store.state.auth.user.id,
                    data: orario,
                    numero_persone: this.$route.params.nPersone
                };
                TavoliDataService.prenotaTavolo(datiprenotazione)
                    .then(response => {
                        this.$router.push({name: 'seleziona-menu', params: { idPrenotazioneTavolo: response.data.id }});
                    })
                    .catch(e => {
                    console.log(e);
                });

            },
            // recupera posti disponibili
            recuperaPostiSlot() {
                TavoliDataService.getByIdRistorante(this.$route.params.IDristorante)
                    .then(response => {
                        if (response.data) {
                            this.zeroPrenotazioni = false;
                            const prenotazioni = response.data;
                            prenotazioni.forEach(corrente => {
                                let data = new Date(corrente.data);
                                this.Prenotazioni.push({
                                    data: data.toString(),
                                    numero_persone: corrente.numero_persone
                                })
                            })
                        }
                        this.recuperaOrariRistorante();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            // recupera gli orari del ristorante
            recuperaOrariRistorante() {
                OrariDataService.getByRistorante(this.$route.params.IDristorante)
                    .then(response => {
                        this.orari = response.data[0];
                        this.durataSlot = this.orari.durata_slot;
                        this.postiPerSlot = this.orari.posti_per_slot;
                        this.recuperaGiorniAperto();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            // recupera i giorni di apertura in formato 'giorno GG/MM' per tutta la settimana
            recuperaGiorniAperto () {
                const optionsButton = {'weekday': 'long', 'month': '2-digit', 'day': '2-digit'};
                const giornoAttuale = new Date();
                if (this.orari.lunedi_open && (new Date(this.orari.lunedi_close) >= giornoAttuale)) {
                    this.giorni.push({
                        data: new Date(this.orari.lunedi_open).toLocaleString('it-IT', optionsButton),
                        premuto: false
                    });
                    const orarioApertura = new Date(this.orari.lunedi_open);
                    const orarioChiusura = new Date(this.orari.lunedi_close);
                    this.recuperaOrariSlots(orarioApertura, orarioChiusura);
                }
                if (this.orari.martedi_open && (new Date(this.orari.martedi_close) >= giornoAttuale)) {
                    this.giorni.push({
                        data: new Date(this.orari.martedi_open).toLocaleString('it-IT', optionsButton),
                        premuto: false
                    });
                    const orarioApertura = new Date(this.orari.martedi_open);
                    const orarioChiusura = new Date(this.orari.martedi_close);
                    this.recuperaOrariSlots(orarioApertura, orarioChiusura);
                }
                if (this.orari.mercoledi_open && (new Date(this.orari.mercoledi_close) >= giornoAttuale)) {
                    this.giorni.push({
                        data: new Date(this.orari.mercoledi_open).toLocaleString('it-IT', optionsButton),
                        premuto: false
                    });
                    const orarioApertura = new Date(this.orari.mercoledi_open);
                    const orarioChiusura = new Date(this.orari.mercoledi_close);
                    this.recuperaOrariSlots(orarioApertura, orarioChiusura);
                }
                if (this.orari.giovedi_open && (new Date(this.orari.giovedi_close) >= giornoAttuale)) {
                    this.giorni.push({
                        data: new Date(this.orari.giovedi_open).toLocaleString('it-IT', optionsButton),
                        premuto: false
                    });
                    const orarioApertura = new Date(this.orari.giovedi_open);
                    const orarioChiusura = new Date(this.orari.giovedi_close);
                    this.recuperaOrariSlots(orarioApertura, orarioChiusura);
                }
                if (this.orari.venerdi_open && (new Date(this.orari.venerdi_close) >= giornoAttuale)) {
                    this.giorni.push({
                        data: new Date(this.orari.venerdi_open).toLocaleString('it-IT', optionsButton),
                        premuto: false
                    });
                    const orarioApertura = new Date(this.orari.venerdi_open);
                    const orarioChiusura = new Date(this.orari.venerdi_close);
                    this.recuperaOrariSlots(orarioApertura, orarioChiusura);
                }
                if (this.orari.sabato_open && (new Date(this.orari.sabato_close) >= giornoAttuale)) {
                    this.giorni.push({
                        data: new Date(this.orari.sabato_open).toLocaleString('it-IT', optionsButton),
                        premuto: false
                    });
                    const orarioApertura = new Date(this.orari.sabato_open);
                    const orarioChiusura = new Date(this.orari.sabato_close);
                    this.recuperaOrariSlots(orarioApertura, orarioChiusura);
                }
                if (this.orari.domenica_open && (new Date(this.orari.domenica_close) >= giornoAttuale)) {
                    this.giorni.push({
                        data: new Date(this.orari.domenica_open).toLocaleString('it-IT', optionsButton),
                        premuto: false
                    });
                    const orarioApertura = new Date(this.orari.domenica_open);
                    const orarioChiusura = new Date(this.orari.domenica_close);
                    this.recuperaOrariSlots(orarioApertura, orarioChiusura);
                }
                this.cambiaGiorno(this.giorni[0]);
            },
            // recupera slots
            recuperaOrariSlots(orarioApertura, orarioChiusura) {
                const oggi = new Date();
                oggi.setMinutes(oggi.getMinutes() + 15);    //non mostra slot che inizino a meno di 15 minuti da ora
                let mostraGiorno = false;
                if (this.zeroPrenotazioni) {
                    let numero = 0;
                    while (orarioApertura < orarioChiusura) {
                        if (this.postiPerSlot >= this.$route.params.nPersone && orarioApertura > oggi) {
                            this.Slots.push({
                                numero: (numero += 1),
                                orario: orarioApertura.toString(),
                                orarioLocale: orarioApertura.toLocaleTimeString(),
                                posti: this.postiPerSlot
                            });
                            mostraGiorno = true;
                        }
                        orarioApertura.setMinutes((orarioApertura.getMinutes() + this.durataSlot));
                    }
                } else {
                    let postiOccupati = 0;
                    let numero = 0;
                    while (orarioApertura < orarioChiusura) {
                        this.Prenotazioni.forEach(prenotazione => {
                            if (prenotazione.data === orarioApertura.toString() ) {
                                postiOccupati += prenotazione.numero_persone;
                            }
                        });
                        if ((this.postiPerSlot - postiOccupati) >= this.$route.params.nPersone && orarioApertura > oggi) {
                            this.Slots.push({
                                numero: (numero += 1),
                                orario: orarioApertura.toString(),
                                orarioLocale: orarioApertura.toLocaleTimeString(),
                                posti: (this.postiPerSlot - postiOccupati)
                            });
                            mostraGiorno = true;
                        }
                        orarioApertura.setMinutes((orarioApertura.getMinutes() + this.durataSlot));
                        postiOccupati = 0;
                    }
                }
                if (!mostraGiorno) {
                    const optionsButton = {'weekday': 'long', 'month': '2-digit', 'day': '2-digit'};
                    const giornoDaEliminare = new Date(orarioApertura).toLocaleString('it-IT', optionsButton);
                    this.giorni.splice(this.giorni.indexOf(giornoDaEliminare), 1);
                }
            }
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
    }
</style>