<template>
    <div data-stellar-background-ratio="0.5">
        <div class="container" v-if="this.numeroPersoneOk !== Number(this.$route.params.nPersone)">
            <h1>MENU</h1>
            <div class="inline">
                <button v-for="persona in persone" :key="persona.numero" class="btn-danger"
                        :class="{'section-btn': persona.premuto }">
                    Persona {{persona.numero}}
                </button>
            </div>
            <div class="row">

                <div class="col-md-3 col-sm-8">
                    <div class="footer-info">
                        <div class="section-title">
                            <h2 class="wow fadeInUp" data-wow-delay="0.2s">Antipasti</h2>
                            <div v-for="piatto in piatti.antipasti" :key="piatti.antipasti.indexOf(piatto)">
                                <input type="checkbox" :id="piatto.nome" :value="piatto" v-model="selezionati.antipasti" >
                                <label :for="piatto.nome"> {{ piatto.nome }} </label>
                                <div align="right">€ {{piatto.prezzo}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-8">
                    <div class="footer-info">
                        <div class="section-title">
                            <h2 class="wow fadeInUp" data-wow-delay="0.2s">Primi</h2>
                            <div v-for="piatto in piatti.primi" :key="piatti.primi.indexOf(piatto)">
                                <input type="checkbox" :id="piatto.nome" :value="piatto" v-model="selezionati.primi" >
                                <label :for="piatto.nome"> {{ piatto.nome }} </label>
                                <div align="right">€ {{piatto.prezzo}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-8">
                    <div class="footer-info">
                        <div class="section-title">
                            <h2 class="wow fadeInUp" data-wow-delay="0.2s">Secondi/Contorni</h2>
                            <div v-for="piatto in piatti.secondi" :key="piatti.secondi.indexOf(piatto)">
                                <input type="checkbox" :id="piatto.nome" :value="piatto" v-model="selezionati.secondi" >
                                <label :for="piatto.nome"> {{ piatto.nome }} </label>
                                <div align="right">€ {{piatto.prezzo}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-8">
                    <div class="footer-info">
                        <div class="section-title">
                            <h2 class="wow fadeInUp" data-wow-delay="0.2s">Dolci</h2>
                            <div v-for="piatto in piatti.dolci" :key="piatti.dolci.indexOf(piatto)">
                                <input type="checkbox" :id="piatto.nome" :value="piatto" v-model="selezionati.dolci" >
                                <label :for="piatto.nome"> {{ piatto.nome }} </label>
                                <div align="right">€ {{piatto.prezzo}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Piatti Selezionati:</h3>
            <div>-Antipasto:
                <strong v-for="piatto in selezionati.antipasti" :key="selezionati.antipasti.indexOf(piatto)">
                    {{ piatto.nome }}<strong v-if="selezionati.antipasti.length > 1 && selezionati.antipasti.indexOf(piatto) !== (selezionati.antipasti.length - 1)">, </strong>
                </strong>
            </div>
            <div>-Primo:
                <strong v-for="piatto in selezionati.primi" :key="selezionati.primi.indexOf(piatto)">
                    {{ piatto.nome }}<strong v-if="selezionati.primi.length > 1 && selezionati.primi.indexOf(piatto) !== (selezionati.primi.length - 1)">, </strong>
                </strong>
            </div>
            <div>-Secondo/contorno:
                <strong v-for="piatto in selezionati.secondi" :key="selezionati.secondi.indexOf(piatto)">
                    {{ piatto.nome }}<strong v-if="selezionati.secondi.length > 1 && selezionati.secondi.indexOf(piatto) !== (selezionati.secondi.length - 1)">, </strong>
                </strong>
            </div>
            <div>-Dolce:
                <strong v-for="piatto in selezionati.dolci" :key="selezionati.dolci.indexOf(piatto)">
                    {{ piatto.nome }}<strong v-if="selezionati.dolci.length > 1 && selezionati.dolci.indexOf(piatto) !== (selezionati.dolci.length - 1)">, </strong>
                </strong>
            </div>
            <button class="section-btn" @click="personaSuccessiva">Conferma menu persona</button>
            <br>
            <strong>{{errore}}</strong>
        </div>

        <div id="riepilogo" data-stellar-background-ratio="0.5">
            <div class="container">
                <h1>Riepilogo ordine</h1>

                <div class="row">

                    <div class="col-md-3 col-sm-8" v-for="personaCorrente in persone" :key="personaCorrente.numero">
                        <div class="footer-info">
                            <div class="section-title">
                                <h2 class="wow fadeInUp" data-wow-delay="0.2s">Persona {{personaCorrente.numero}}</h2>
                                <h3>Piatti Selezionati:</h3>
                                <button class="btn-danger" @click="modificaPiattiPersona(personaCorrente)">Modifica selezionati</button>
                                <div>-Antipasto:
                                    <strong v-for="piatto in personaCorrente.piattiSelezionati.antipasti" :key="piatto">
                                        {{ piatto.nome }}<strong v-if="personaCorrente.piattiSelezionati.antipasti.length > 1 && personaCorrente.piattiSelezionati.antipasti.indexOf(piatto) !== (personaCorrente.piattiSelezionati.antipasti.length - 1)">, </strong>
                                    </strong>
                                </div>
                                <div>-Primo:
                                    <strong v-for="piatto in personaCorrente.piattiSelezionati.primi" :key="piatto">
                                        {{ piatto.nome }}<strong v-if="personaCorrente.piattiSelezionati.primi.length > 1 && personaCorrente.piattiSelezionati.primi.indexOf(piatto) !== (personaCorrente.piattiSelezionati.primi.length - 1)">, </strong>
                                    </strong>
                                </div>
                                <div>-Secondo/contorno:
                                    <strong v-for="piatto in personaCorrente.piattiSelezionati.secondi" :key="piatto">
                                        {{ piatto.nome }}<strong v-if="personaCorrente.piattiSelezionati.secondi.length > 1 && personaCorrente.piattiSelezionati.secondi.indexOf(piatto) !== (personaCorrente.piattiSelezionati.secondi.length - 1)">, </strong>
                                    </strong>
                                </div>
                                <div>-Dolce:
                                    <strong v-for="piatto in personaCorrente.piattiSelezionati.dolci" :key="piatto">
                                        {{ piatto.nome }}<strong v-if="personaCorrente.piattiSelezionati.dolci.length > 1 && personaCorrente.piattiSelezionati.dolci.indexOf(piatto) !== (personaCorrente.piattiSelezionati.dolci.length - 1)">, </strong>
                                    </strong>
                                </div>
                            </div>
                            <strong>Totale persona: € {{personaCorrente.prezzoTotale}}</strong>
                        </div>
                    </div>
                    <div v-if="this.numeroPersoneOk === Number(this.$route.params.nPersone)">
                        <strong>Totale prenotazione: € {{totalePrenotazione}}</strong>
                        <br>
                        <button class="section-btn" @click="confermaPrenotazione">
                            Conferma prenotazione
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import PiattiDataService from "@/services/PiattiDataService";
    import PrenotazionePiattiDataService from "@/services/PrenotazionePiattiDataService";
    import TavoliDataService from "@/services/TavoliDataService";
    import io from 'socket.io-client'

    const socket = io.connect('http://192.168.1.171:4000');

    export default {
        name: "menu-ristorante",
        data() {
            return {
                selezionati: {
                    antipasti: [],
                    primi: [],
                    secondi: [],
                    dolci: []
                },
                piatti: {
                    antipasti: [],
                    primi: [],
                    secondi: [],
                    dolci: []
                },
                persone: [],
                numeroPersonaCorrente: 0,
                errore: '',
                numeroPersoneOk: 0,
                numeroPersonaPrecedente: 0,
                modificato: false
            }
        },
        beforeMount() {
            this.creaPersone()
        },
        beforeRouteLeave (to, from, next) {
            socket.emit('disconnect');
            next();
        },
        mounted() {
            this.trovaPiatti();

        },
        watch: {
            '$route.params.IDristorante'() {
                this.cancellaPiatti();
                this.trovaPiatti();
            }
        },
        computed: {
            totalePrenotazione () {
                let sommaTotale = 0;
                this.persone.forEach( personaCorrente => {
                    sommaTotale += personaCorrente.prezzoTotale;
                });
                return sommaTotale;
            }
        },
        methods: {

            confermaPrenotazione() {
                const risposta = window.confirm('sicuro di voler confermare la prenotazione?');

                if (risposta) {

                const piattiTotali = [];
                this.persone.forEach(personaCorrente => {
                    personaCorrente.piattiSelezionati.antipasti.forEach(antipasto => {
                        piattiTotali.push({
                            id_utente: this.$store.state.auth.user.id,
                            piattoId: antipasto.id,
                            id_ristorante: Number(this.$route.params.IDristorante),
                            id_prenotazione_tavolo: Number(this.$route.params.idPrenotazioneTavolo),
                            persona: personaCorrente.numero
                        })
                    });
                    personaCorrente.piattiSelezionati.primi.forEach(primo => {
                        piattiTotali.push({
                            id_utente: this.$store.state.auth.user.id,
                            piattoId: primo.id,
                            id_ristorante: Number(this.$route.params.IDristorante),
                            id_prenotazione_tavolo: Number(this.$route.params.idPrenotazioneTavolo),
                            persona: personaCorrente.numero
                        })
                    });
                    personaCorrente.piattiSelezionati.secondi.forEach(secondo => {
                        piattiTotali.push({
                            id_utente: this.$store.state.auth.user.id,
                            piattoId: secondo.id,
                            id_ristorante: Number(this.$route.params.IDristorante),
                            id_prenotazione_tavolo: Number(this.$route.params.idPrenotazioneTavolo),
                            persona: personaCorrente.numero
                        })
                    });
                    personaCorrente.piattiSelezionati.dolci.forEach(dolce => {
                        piattiTotali.push({
                            id_utente: this.$store.state.auth.user.id,
                            piattoId: dolce.id,
                            id_ristorante: Number(this.$route.params.IDristorante),
                            id_prenotazione_tavolo: Number(this.$route.params.idPrenotazioneTavolo),
                            persona: personaCorrente.numero
                        })
                    });
                    console.log(personaCorrente.numero);
                });
                console.log(piattiTotali);
                PrenotazionePiattiDataService.creaPrenotazionePiatto(piattiTotali).then(response => {
                    let prenotazioneOk = true;
                    response.data.message.forEach( messaggio => {
                        if (String(messaggio) !== 'prenotazione effettuata') {
                            prenotazioneOk = false;
                        }
                    });
                    if (prenotazioneOk) {
                        TavoliDataService.updatePrenotazione(this.$route.params.idPrenotazioneTavolo, {confermata: true})
                            .then(() => {
                                socket.emit('prenotazione-confermata', { idRistorante: this.$route.params.IDristorante });
                                this.$router.push('/prenotazioneCompletata');
                            });
                    }
                });

                }
            },

            // modifica piatti selezionati dalla persona
            modificaPiattiPersona(nuovaPersona) {
                if (this.modificato) {
                    if (this.persone[nuovaPersona.numero - 1].piattiSelezionati.antipasti.length !== 0 || this.persone[nuovaPersona.numero - 1].piattiSelezionati.primi.length !== 0 ||
                        this.persone[nuovaPersona.numero - 1].piattiSelezionati.secondi.length !== 0 || this.persone[nuovaPersona.numero - 1].piattiSelezionati.dolci.length !== 0) {

                        this.numeroPersonaCorrente = nuovaPersona.numero - 1;
                        this.persone.forEach(persona => persona.premuto = false);
                        this.persone[nuovaPersona.numero - 1].premuto = true;
                        this.selezionati = this.persone[nuovaPersona.numero - 1].piattiSelezionati;
                    }
                } else {
                    if (this.persone[nuovaPersona.numero - 1].piattiSelezionati.antipasti.length !== 0 || this.persone[nuovaPersona.numero - 1].piattiSelezionati.primi.length !== 0 ||
                        this.persone[nuovaPersona.numero - 1].piattiSelezionati.secondi.length !== 0 || this.persone[nuovaPersona.numero - 1].piattiSelezionati.dolci.length !== 0) {

                        this.numeroPersoneOk -= 1;
                        this.numeroPersonaPrecedente = this.numeroPersonaCorrente;
                        this.numeroPersonaCorrente = nuovaPersona.numero - 1;
                        this.persone.forEach(persona => persona.premuto = false);
                        this.persone[nuovaPersona.numero - 1].premuto = true;
                        this.selezionati = this.persone[nuovaPersona.numero - 1].piattiSelezionati;
                        this.modificato = true;
                    }
                }
            },

            // conferma piatti selezionati e li salva nei piatti selezionati della persona attuale,
            // poi passa alla persona successiva
            personaSuccessiva(){
                if (this.selezionati.antipasti.length !== 0 || this.selezionati.primi.length !== 0 ||
                    this. selezionati.secondi.length !== 0 || this.selezionati.dolci.length !== 0)
                {
                    this.numeroPersoneOk += 1;
                    this.persone[this.numeroPersonaCorrente].piattiSelezionati = this.selezionati;
                    this.totalePersona(this.persone[this.numeroPersonaCorrente]);
                    this.persone[this.numeroPersonaCorrente].premuto = false;
                    if (this.numeroPersoneOk !== Number(this.$route.params.nPersone)){
                        if (this.modificato) {
                            this.numeroPersonaCorrente = this.numeroPersonaPrecedente;
                        } else {
                            this.numeroPersonaCorrente += 1;
                        }
                        this.persone[this.numeroPersonaCorrente].premuto = true;
                    } else {
                        document.getElementById('riepilogo').scrollIntoView();
                    }
                    this.modificato = false;
                    this.selezionati = {
                        antipasti: [],
                        primi: [],
                        secondi: [],
                        dolci: []
                    };
                    this.errore = '';
                } else {
                    this.errore = 'Selezionare almeno un piatto'
                }
            },

            creaPersone () {
                let premuto = true;
                for (let i=0; i < this.$route.params.nPersone; i += 1) {

                    this.persone[i] = {
                        numero: (i+1),
                        premuto: premuto,
                        piattiSelezionati: {
                            antipasti: [],
                            primi: [],
                            secondi: [],
                            dolci: []
                        },
                        prezzoTotale: 0
                    };
                    premuto = false;
                }
            },


            trovaPiatti() {
                PiattiDataService.getByRistorante(this.$route.params.IDristorante)
                    .then(response => { const prova = response.data;
                        prova.forEach( (piattoCorrente) => {
                            switch (String(piattoCorrente.tipo)) {
                                case "antipasto":
                                    this.piatti.antipasti.push(piattoCorrente);
                                    break;
                                case "primo":
                                    this.piatti.primi.push(piattoCorrente);
                                    break;
                                case "secondo":
                                    this.piatti.secondi.push(piattoCorrente);
                                    break;
                                case "dolce":
                                    this.piatti.dolci.push(piattoCorrente);
                                    break;
                            }
                        });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            cancellaPiatti() {
                this.piatti = {
                    antipasti: [],
                    primi: [],
                    secondi: [],
                    dolci: []
                };
                this.selezionati = {
                    antipasti: [],
                    primi: [],
                    secondi: [],
                    dolci: []
                };
            },

            totalePersona(persona) {
                let totale = 0;
                let piattiTotaliPersona = [];
                piattiTotaliPersona = persona.piattiSelezionati.antipasti.concat(persona.piattiSelezionati.primi,
                    persona.piattiSelezionati.secondi, persona.piattiSelezionati.dolci);
                piattiTotaliPersona.forEach( piatto => {
                    totale += piatto.prezzo;
                });
                persona.prezzoTotale = totale;
            }
        },
    }
</script>

<style scoped>

</style>