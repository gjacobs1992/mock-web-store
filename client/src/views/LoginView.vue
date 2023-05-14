<template>
  <div id="login">
    <form v-on:submit.prevent="login">
      <h1>Please Sign In</h1>
      <div id="fields">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="user.username"
          required
          autofocus
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <div id="button-div"><button type="submit">Sign in</button></div>
      </div>
      <hr/>
      Need an account? <router-link v-bind:to="{ name: 'register' }">Register!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            this.$store.commit("SET_ERROR", error)
            alert(error);
          } else if (response.status === 401) {
            this.$store.commit("SET_ERROR", "Invalid username and password!")
            alert("Invalid username and password!");
          } else {
            //alert(response.message);
            this.$store.commit("SET_ERROR", response.message)
          }
        });
    },
  },
};
</script>

<style scoped>
#login{
  text-align: center;
}
#login>form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form>h1{
  font-size: 1.5rem;
}
#login>form>#fields{
  display: flex;
  gap: 10px;
}
</style>
