<template>
  <div id="nav-div">
    <ul>
      <router-link to="/" id="home" class="nav-select home-link">
        <li class="nav-li">Home</li>
      </router-link>
      <router-link to="/cart" id="cart" class="nav-select cart-link">
        <li class="nav-li">Cart</li>
      </router-link>
      <li id="message" class="nav-li">{{ this.$store.state.message }}</li>
      <router-link v-bind:to="{name: 'logout'}" class="nav-select home-link" id="logout" v-if="isAuthenticated">
        <li class="nav-select nav-li">Logout</li>
      </router-link>
      <router-link v-bind:to="{name: 'login'}" class="nav-select home-link" id="login" v-else>
        <li class="nav-select nav-li">Login</li>
      </router-link>
    </ul>
  </div>
</template>

<script>


export default {
  name: "navigation",
  data() {
    return {
      isAuthenticated: false,
      token: "",
    };
  },
  computed: {
    logoutText() {
      if (this.isAuthenticated) {
        return "Logout";
      } else {
        return "Login";
      }
    },
  },
  methods: {
    checkAuthentication() {
      this.token = this.$store.state.token;
      if (this.token === "") {
        this.$set(this, 'isAuthenticated', false);
      } else {
        this.$set(this, 'isAuthenticated', true);
      }
    },
  },
  created() {
    this.checkAuthentication();
  },
  mounted(){
    this.checkAuthentication();
  }
};
</script>

<style>
#nav-div {
  /* position: fixed; */
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
  /* margin-top: 6.5em; */
  background-color: rgb(25, 94, 92);
  color: white;
  height: 3rem;
  padding-bottom: 1.25px;
}
#nav-div > ul {
  width: 100%;
  list-style: none;
  display: flex;
  gap: 40px;
  padding-inline-start: 10px;
  justify-content: center;
  align-content: center;
}
.nav-select {
  color: white;
  text-decoration: none;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.nav-li {
  font-size: 1.5rem;
}
#message {
  flex-grow: 2;
  color: black;
}
#logout {
  margin-right: 20px;
}
.nav-select:hover {
  cursor: pointer;
}

#nav-div > ul > .nav-select:hover {
  position: relative;
}

#nav-div > ul > .nav-select:hover::before {
  content: "";
  position: absolute;
  top: -8px;
  bottom: -8px;
  left: -10px;
  right: -20px;
  border: 1px solid white;
  border-radius: 3px;
}
#nav-div > ul > #cart::before {
  left: -20px;
  right: -15px;
}
#nav-div > ul > #logout:hover::before {
  right: -20px;
}
</style>
