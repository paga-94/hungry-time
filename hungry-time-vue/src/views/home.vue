<template>
    <section id="home" class="slider" data-stellar-background-ratio="0.5">
        <div class="row">

            <!--div class="owl-carousel owl-theme"-->
            <div class="item item-third">
                <div class="caption">                   <!--controllare questo-->
                    <div class="container">
                        <div class="col-md-8 col-sm-12">

                            <!-- PRESENTAZIONE HOME -->

                            <router-view name="presentazioneHome"></router-view>

                            <!-- CERCA RISTORANTE -->

                            <router-view name="cercaRistorantiHome"></router-view>


                            <!-- LOGIN -->

                            <router-view name="loginForm"></router-view>

                        </div>
                    </div>
                </div>
            </div>
            <!--/div-->

        </div>
    </section>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>

</style>