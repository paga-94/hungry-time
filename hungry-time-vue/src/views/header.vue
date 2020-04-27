<template>
    <section class="navbar custom-navbar navbar-fixed-top" role="navigation">
        <div class="container">

            <div class="navbar-header">
                <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                </button>

                <!-- lOGO TEXT HERE -->
                <router-link to="/" class="navbar-brand">Hungry <span>.</span> Time</router-link>
            </div>




            <!-- MENU LINKS -->
            <div  class="collapse navbar-collapse">
                <div class="nav navbar-nav navbar-nav-first">

                    <div class="form-inline">
                        <h2 v-if="$route.name === 'gestione-ristorante'">Gestione Ristorante</h2>
                        <router-view name="cercaHeader"></router-view>
                    </div>

                </div>

                <!-- profilo utente -->
                <div id="profilo-utente" class="nav navbar-nav navbar-right">

                    <router-view name="userMinimal"></router-view>

                    <router-view name="loginButton"></router-view>

                </div>
            </div>

        </div>
    </section>
</template>

<script>
    export default {
        name: "header"
    }
</script>

<style scoped>

</style>