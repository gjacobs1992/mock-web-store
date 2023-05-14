<template>
  <div id="app">
    <header>
      <the-header></the-header>
      <the-navigation> </the-navigation>
    </header>
    <main>
      <router-view />
    </main>
    <the-footer></the-footer>
  </div>
</template>
<script>
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
import TheNavigation from "./components/TheNavigation.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
    TheNavigation,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto");
*{
  font-family: "Roboto", sans-serif;
}
#app {
  margin: 0;
  padding: 0;
  background-color: rgb(217, 245, 243);
}
header {
  top: 0;
  position: fixed;
  width: 100%;
}
main{
  margin-top: 150px;
}
</style>
