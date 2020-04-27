<template>
    <div>
        <div class="form-group">
            <input v-model="nome" @keyup.enter="avviaRicerca()" type="text" class="form-control" id="exampleInputEmail1" placeholder="cerca ristorante">
        </div>
        <!--div class="form-group">
            <VueCtkDateTimePicker v-model="datetime" format="DD-MM-YYYY HH:mm" hint="scegli giorno e ora" :label="datetime" color="red" minute-interval="15" input-size="sm"/>
        </div-->
        <!--div class="form-group">
            <number-input v-model="value" placeholder="numero persone" size="large" :min="1" :max="10" inline controls></number-input>
        </div-->
        <button @click="avviaRicerca()" type="submit" class="section-btn">Cerca!</button>

    </div>
</template>

<script>

    //import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
    //import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
    //import VueNumberInput from '@chenfengyuan/vue-number-input'

    export default {
        name: "cercaRistorante",
        //components: { //VueCtkDateTimePicker,
        //    'number-input': VueNumberInput },
        data() {
            return {
                nome: '',
                //datetime: new Date(),
                value: 1
            }
        },
        created() {
            if (this.$store.state.auth.user.roles.includes('ROLE_RISTORATORE')) {
                this.$router.push({name: 'paginaRistoratore'})
            }
        },
        methods: {
            avviaRicerca() {
                this.$router.push({ name: 'cercaRistoranti', query: {nome: this.nome} })
            }
        }
    }
</script>

<style scoped>

</style>