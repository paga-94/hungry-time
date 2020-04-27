<template>
    <div id="footer" data-stellar-background-ratio="0.5">
        <div class="container">
            <h1>MENU</h1>
            <button @click="aggiornaMenu" class="section-btn">Aggiorna menu</button>
            <div class="row">

                <div class="col-md-3 col-sm-8">
                    <div class="footer-info">
                        <div class="section-title">
                            <h2 class="wow fadeInUp" data-wow-delay="0.2s">Antipasti</h2>
                            <ul>
                                <li v-for="piatto in piatti.antipasti" :key="piatti.antipasti.indexOf(piatto)"
                                    @click="eliminaAntipasto(piatto)">
                                    <strong>{{ piatto.nome }}</strong>
                                    <div align="right">€ {{piatto.prezzo}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-8">
                    <div class="footer-info">
                        <div class="section-title">
                            <h2 class="wow fadeInUp" data-wow-delay="0.2s">Primi</h2>
                            <ul>
                                <li v-for="piatto in piatti.primi" :key="piatti.primi.indexOf(piatto)"
                                    @click="eliminaPrimo(piatto)">
                                    <strong>{{ piatto.nome}}</strong>
                                    <div align="right">€ {{piatto.prezzo}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-8">
                    <div class="footer-info">
                        <div class="section-title">
                            <h2 class="wow fadeInUp" data-wow-delay="0.2s">Secondi/Contorni</h2>
                            <ul>
                                <li v-for="piatto in piatti.secondi" :key="piatti.secondi.indexOf(piatto)"
                                    @click="eliminaSecondo(piatto)">
                                    <strong>{{ piatto.nome }}</strong>
                                    <div align="right">€ {{piatto.prezzo}}</div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="col-md-3 col-sm-8">
                    <div class="footer-info">
                        <div class="section-title">
                            <h2 class="wow fadeInUp" data-wow-delay="0.2s">Dolci</h2>
                            <ul>
                                <li v-for="piatto in piatti.dolci" :key="piatti.dolci.indexOf(piatto)"
                                    @click="eliminaDolce(piatto)">
                                    <strong>{{ piatto.nome }}</strong>
                                    <div align="right">€ {{piatto.prezzo}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="nome nuovo piatto">Nome piatto</label>
                <input v-model="nuovoPiatto.nome" @keyup.enter="aggiungiPiatto" class="form-control" type="text" name="nome nuovo piatto" id="nome nuovo piatto">
                <input v-model="nuovoPiatto.tipo" type="radio" name="tipo nuovo piatto" id="antipasto" value="antipasto">
                <label for="antipasto">Antipasto</label>
                <br>
                <input v-model="nuovoPiatto.tipo" type="radio" name="tipo nuovo piatto" id="primo" value="primo">
                <label for="primo">Primo</label>
                <br>
                <input v-model="nuovoPiatto.tipo" type="radio" name="tipo nuovo piatto" id="secondo" value="secondo">
                <label for="secondo">Secondo/contorno</label>
                <br>
                <input v-model="nuovoPiatto.tipo" type="radio" name="tipo nuovo piatto" id="dolce" value="dolce">
                <label for="dolce">Dolce</label>
                <br>
                <label for="prezzo nuovo piatto">prezzo</label>
                <input v-model="nuovoPiatto.prezzo" @keyup.enter="aggiungiPiatto" class="form-control" type="number" name="prezzo nuovo piatto" id="prezzo nuovo piatto">
            </div>
            <button @click="aggiungiPiatto" class="section-btn">Aggiungi piatto</button>
            <p id="errore"><strong>{{messaggio}}</strong></p>
            <ul>
                <li v-for="esito in esiti" :key="esito">{{esito}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import PiattiDataService from "@/services/PiattiDataService";

    export default {
        name: "aggiornaMenu",
        data() {
            return {
                piatti: {
                    antipasti: [],
                    primi: [],
                    secondi: [],
                    dolci: []
                },
                piattiEliminati: {
                    antipasti: [],
                    primi: [],
                    secondi: [],
                    dolci: []
                },
                nuovoPiatto: {
                    nome: '',
                    id_ristorante: this.$route.params.IDristorante,
                    tipo: '',
                    prezzo: null
                },
                esiti: [],
                messaggio: '',
            }
        },
        mounted() {
            this.trovaPiatti()
        },
        methods: {
            trovaPiatti() {
                PiattiDataService.getByRistorante(this.$route.params.IDristorante)
                    .then(response => { const prova = response.data;
                        prova.forEach( (piattoCorrente) => {
                            console.log(piattoCorrente);
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
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            // crea piatti da aggiungere, elimina piatti da eliminare. se un qualsiasi esito
            // è negativo, viene aggiunto nell'array esiti e vengono mostrati al ristoratore
            // se nessun esito è negativo mostra il messaggio 'menu aggiornato'
            aggiornaMenu() {
                this.piattiEliminati.antipasti.forEach( daEliminare => {
                    PiattiDataService.deleteById(daEliminare.id)
                        .then(response => {
                            if (response.data.message !== 'cancellato') {
                                this.esiti.push(`errore cancellando ${daEliminare.nome}`)
                            }
                        })
                });
                this.piattiEliminati.primi.forEach( daEliminare => {
                    PiattiDataService.deleteById(daEliminare.id)
                        .then(response => {
                            if (response.data.message !== 'cancellato') {
                                this.esiti.push(`errore cancellando ${daEliminare.nome}`)
                            }
                        })
                });
                this.piattiEliminati.secondi.forEach( daEliminare => {
                    PiattiDataService.deleteById(daEliminare.id)
                        .then(response => {
                            if (response.data.message !== 'cancellato') {
                                this.esiti.push(`errore cancellando ${daEliminare.nome}`)
                            }
                        })
                });
                this.piattiEliminati.dolci.forEach( daEliminare => {
                    PiattiDataService.deleteById(daEliminare.id)
                        .then(response => {
                            if (response.data.message !== 'cancellato') {
                                this.esiti.push(`errore cancellando ${daEliminare.nome}`)
                            }
                        })
                });
                if (this.esiti.length === 0) {
                    this.esiti.push('Menu aggiornato correttamente')
                }
            },
            eliminaAntipasto(el) {
                    this.piatti.antipasti.splice(this.piatti.antipasti.indexOf(el), 1);
                    this.piattiEliminati.antipasti.push(el);
            },
            eliminaPrimo(el) {
                this.piatti.primi.splice(this.piatti.primi.indexOf(el), 1);
                this.piattiEliminati.primi.push(el);
            },
            eliminaSecondo(el) {
                this.piatti.secondi.splice(this.piatti.secondi.indexOf(el), 1);
                this.piattiEliminati.secondi.push(el);
            },
            eliminaDolce(el) {
                this.piatti.dolci.splice(this.piatti.dolci.indexOf(el), 1);
                this.piattiEliminati.dolci.push(el);
            },
            aggiungiPiatto() {
                if (this.nuovoPiatto.nome && this.nuovoPiatto.tipo && this.nuovoPiatto.prezzo) {
                    this.messaggio = '';
                    PiattiDataService.creaPiatto(this.nuovoPiatto)
                        .then(response => {
                                if (!response.data) {
                                    this.esiti.push(`errore aggiungendo ${this.nuovoPiatto.nome}`)
                                } else {
                                    this.messaggio = 'Piatto aggiunto al menù';
                                    this.piatti = {
                                        antipasti: [],
                                        primi: [],
                                        secondi: [],
                                        dolci: []
                                    };
                                    this.trovaPiatti();
                                }
                            }
                        );
                    this.nuovoPiatto = {
                        nome: '',
                        id_ristorante: this.$route.params.IDristorante,
                        tipo: '',
                        prezzo: null
                    };
                } else {
                    this.messaggio = 'inserire tutti i campi';
                }
            },
        }
    }
</script>

<style scoped>
    li {
        cursor: pointer;
    }
    #errore {
        color: red;
    }

</style>