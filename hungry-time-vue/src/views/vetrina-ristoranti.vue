<template>

    <section id="menu" data-stellar-background-ratio="0.5">
        <div class="container">
            <div class="row">

                <div class="col-md-12 col-sm-12">
                    <h2>{{Ristoranti.length > 0 ? 'Vetrina ristoranti' : 'nessun ristorante trovato'}}</h2>
                </div>

                <elenco-ristoranti v-for="ristorante in Ristoranti" :ristorante="ristorante" :key="ristorante.id">
                </elenco-ristoranti>

            </div>
        </div>
    </section>

</template>

<script>
    import ElencoRistoranti from "../components/elenco-ristoranti";
    import RistorantiDataService from "../services/RistorantiDataService";

    export default {
        name: "vetrinaRistoranti",
        data () {
            return {
                Ristoranti: [],
                nome: ''
            };
        },
        components: {
            'elenco-ristoranti': ElencoRistoranti
        },
        methods: {
            ricerca () {
                if (this.$route.query.nome) {
                    RistorantiDataService.getByNome(this.$route.query.nome)
                        .then(response => {
                            this.Ristoranti = response.data;
                            console.log(response.data);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                } else {
                    this.AllRistoranti();
                }
            },
            AllRistoranti() {
                RistorantiDataService.getAll()
                    .then(response => {
                        this.Ristoranti = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        },
        mounted() {
            this.AllRistoranti();
        },
        watch: {
            '$route.query.nome'() {
                this.ricerca();
            }
        }
    }
</script>