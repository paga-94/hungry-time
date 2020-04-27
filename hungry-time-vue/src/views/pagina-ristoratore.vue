<template>
    <section id="about" data-stellar-background-ratio="0.5">
        <div class="container">
            <div class="row">

                <div class="col-md-6 col-sm-12">
                    <div class="about-info">
                        <div class="section-title wow fadeInUp" data-wow-delay="0.2s">
                            <div align="right">
                                <button class="section-btn" @click="cambiaOrari">Modifica orari</button>
                                <button class="section-btn" @click="mostraOrdini">Mostra oridni</button>
                                <button class="section-btn" @click="mostraAnteprima">Mostra anteprima</button>
                            </div>
                            <h1>{{ Ristorante.nome }}</h1>
                            <div class="form-group">
                                <label for="nome ristorante">cambia nome ristorante</label>
                                <input v-model="Ristorante.nome" class="form-control" type="text" name="nome ristorante" id="nome ristorante">
                            </div>
                            <h2>descrizione</h2>
                        </div>

                        <div class="wow fadeInUp" data-wow-delay="0.4s">
                            <p>{{ Ristorante.descrizione }}</p>
                            <div class="form-group">
                                <label name="descrizione ristorante">cambia descrizione ristorante</label>
                                <input v-model="Ristorante.descrizione" class="form-control" type="text" name="descrizione ristorante" id="descrizione ristorante">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-sm-12">
                    <div class="wow fadeInUp about-image" data-wow-delay="0.6s">
                        <img src="../../public/images/ristorante.jpg" class="img-responsive" alt="">
                    </div>
                </div>

            </div>
            <button class="section-btn" @click="aggiornaRistorante">Aggiorna</button>
            <h2>{{esitoAggiornamento}}</h2>
        </div>
        <aggiorna-menu></aggiorna-menu>

    </section>
</template>

<script>
    import RistorantiDataService from "@/services/RistorantiDataService";
    import AggiornaMenu from "@/components/modifica-menu-ristorante";

    export default {
        name: "pagina-ristorante",
        components: {AggiornaMenu},
        data() {
            return {
                Ristorante: {},
                esitoAggiornamento: ''
            }
        },
        mounted() {
            this.risto();
        },
        methods: {
            risto() {
                RistorantiDataService.getID(this.$route.params.IDristorante)
                    .then(response => {this.Ristorante = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            aggiornaRistorante() {
                RistorantiDataService.aggiornaRistorante(this.Ristorante.id, this.Ristorante)
                    .then(response => {this.esitoAggiornamento = response.data.message})
                    .catch(e => {
                        console.log(e);
                    });
            },
            mostraAnteprima() {
                this.$router.push({ name: 'anteprima-ristoratore'});
            },
            mostraOrdini() {
                this.$router.push({ name: 'gestione-ristorante'});
            },
            cambiaOrari() {
                this.$router.push({ name: 'modifica-orari'});
            }
        }
    }
</script>

<style scoped>

</style>