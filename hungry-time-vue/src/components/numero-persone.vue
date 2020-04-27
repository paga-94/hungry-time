<template>
    <div>
        <label for="numero persone">seleziona il numero di persone</label>
        <br>
        <number-input v-model="numeroPersone" id="numero persone" size="large" :min="1" inline controls></number-input>
        <br>
        <br>
        <router-link :to="{name: 'paginaristorante-slots', params: { nPersone: numeroPersone }}" class="section-btn">conferma</router-link>
    </div>
</template>

<script>
    import VueNumberInput from '@chenfengyuan/vue-number-input'

    export default {
        name: "numero-persone",
        components: {
            'number-input': VueNumberInput
        },
        data() {
            return {
                numeroPersone: 1,
            }
        }
    }
</script>

<style scoped>

</style>