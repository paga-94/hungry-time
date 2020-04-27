<template>
  <div id="app">
    <router-view name="header"></router-view>

    <router-view name="home"></router-view>

    <router-view name="vetrina"></router-view>

    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from "./views/footer"

  export default {
    name: 'app',
    components: {
      Footer
    }
  }
</script>
