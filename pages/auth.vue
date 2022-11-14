<template>
  <div class="basic-auth">
    <form @submit.prevent="login">
      <p>Please log in to continue</p>
      <p v-if="msg">{{msg}}</p>
      <fieldset>
        <label for="username">Username</label>
        <input type="text" name="username" v-model="username" id="username"/>
      </fieldset>
      <fieldset>
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password" id="password"/>
      </fieldset>
      <fieldset>
        <label for=""></label>
        <input type="submit" name="submit" value="Log in" />
      </fieldset>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Auth',
  data() {
    return {
      username: null,
      password: null,
      msg: null,
    }
  },
  methods: {
    login() {
      // Set a cookie
      if(
        this.username === process.env.VUE_APP_BASIC_AUTH_USERNAME
        &&
        this.password === process.env.VUE_APP_BASIC_AUTH_PASSWORD
      ) {
        this.msg = null
        this.$cookies.set('basic_auth_logged_in', true)
        this.$router.push({path: '/'});
      } else {
        this.msg = 'Authentication details incorrect.'
      }
    }
  }


}
</script>

<style lang="scss">
.basic-auth {
  font-family: "Corporate S Pro";
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;

  form {
    fieldset {
      label {
        width: 150px;
      }
    }
  }
}
</style>
