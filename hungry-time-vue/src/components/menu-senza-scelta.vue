<template>
    <div id="footer" data-stellar-background-ratio="0.5">
        <div class="container">
            <h1>MENU</h1>
            <div class="row">

                <div class="col-md-3 col-sm-8">
                    <div class="footer-info">
                        <div class="section-title">
                            <h2 class="wow fadeInUp" data-wow-delay="0.2s">Antipasti</h2>
                            <ul>
                                <li v-for="piatto in piatti.antipasti" :key="piatto"><strong>{{ piatto.nome }}</strong>
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
                                <li v-for="piatto in piatti.primi" :key="piatto"><strong>{{ piatto.nome }}</strong>
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
                                <li v-for="piatto in piatti.secondi" :key="piatto"><strong>{{ piatto.nome }}</strong>
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
                                <li v-for="piatto in piatti.dolci" :key="piatto"><strong>{{ piatto.nome }}</strong>
                                    <div align="right">€ {{piatto.prezzo}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PiattiDataService from "@/services/PiattiDataService";

    export default {
        name: "menuSenzaScelta",
        data() {
            return {
                piatti: {
                    antipasti: [],
                    primi: [],
                    secondi: [],
                    dolci: []
                },

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
            cancellaPiatti() {
                this.piatti = {
                    antipasti: [],
                    primi: [],
                    secondi: [],
                    dolci: []
                };
            }
        },
        watch: {
            '$route.params.IDristorante'() {
                this.cancellaPiatti();
                this.trovaPiatti();
            }
        }
    }
</script>

<style scoped>

</style>