<template>
    <section id="about" data-stellar-background-ratio="0.5">
        <div class="container">
            <div class="row">

                <div class="col-md-6 col-sm-12">
                    <div class="about-info">
                        <div class="section-title wow fadeInUp" data-wow-delay="0.2s">
                            <h1>{{ Ristorante.nome }}</h1>
                            <h2>descrizione</h2>
                        </div>

                        <div class="wow fadeInUp" data-wow-delay="0.4s">
                            <p>{{ Ristorante.descrizione }}</p>
                        </div>
                        <router-view name="nPersone"></router-view>
                    </div>
                </div>

                <div class="col-md-6 col-sm-12">
                    <div class="wow fadeInUp about-image" data-wow-delay="0.6s">
                        <img src="../../public/images/ristorante.jpg" class="img-responsive" alt="">
                    </div>
                </div>

            </div>
        </div>
        <router-view name="menu"></router-view>
    </section>
</template>

<script>
    import RistorantiDataService from "@/services/RistorantiDataService";

    export default {
        name: "pagina-ristorante",
        data() {
          return {
              Ristorante: {}
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
            }
        },
        watch: {
            '$route.params.IDristorante'() {
                this.risto()
            }
        },
    }
</script>

<style scoped>

</style>