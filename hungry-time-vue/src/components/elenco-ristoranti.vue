<template>

        <div v-if="ristorante.id !== $route.params.IDristorante" class="col-md-4 col-sm-6">
            <!-- MENU THUMB -->
            <div class="menu-thumb">
                <a @click="paginaRistorante" class="image-popup" title="American Breakfast">
                    <img src="../../public/images/ristorante.jpg" class="img-responsive" alt="">

                    <div class="menu-info">
                        <div class="menu-item">
                            <h3>{{ ristorante.nome }}</h3>
                            <p>{{ ristorante.descrizione }}</p>
                        </div>
                        <div class="menu-price">
                            <span>$25</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>

</template>

<script>
    export default {
        nome: "elemento-lista-annunci",
        props: {
            ristorante: {
                type: Object
            }
        },
        methods: {
            paginaRistorante() {
                this.$router.push({ name: 'paginaristorante-n-persone', params:
                        { IDristorante: this.ristorante.id }})
            }
        }
    }
</script>
