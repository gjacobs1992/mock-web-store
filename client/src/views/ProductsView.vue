<template>
  <div class="home">
    
    <p id="login-message" v-if="!isLoggedIn">
      Welcome! You may browse anonymously as much as you wish,<br />
      but you must
      <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add
      items to your shopping cart.
    </p>
    
    
    <product-list/>
  </div>
</template>

<script>

import ProductList from "../components/ProductList.vue"

export default {
  name: "ProductsView",
  components: {
    ProductList,
  },
  data() {
    return {
      
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },

  methods: {},

  created() {
  },
};
</script>

<style scoped>
.home{
  margin-left: 20px;
}

#page-title{
  font-size: 2rem;
}

</style>