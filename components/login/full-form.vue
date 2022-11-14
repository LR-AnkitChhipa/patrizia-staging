<template>
  <div class="divmargin">
    <b-container>
      <b-row>
        <b-col cols="12" xl="4" lg="5" md="8">
          <login-form :slice="slice" />
        </b-col>
        <b-col cols="12" xl="7" lg="7" md="12" offset-xl="1">
          <register-form :slice="slice"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from '~/components/login/login-form'
import RegisterForm from '~/components/login/register-form'

export default {
  components: {LoginForm, RegisterForm},
  props: {
    slice: {
      type: Object,
      default() {
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.divmargin {
  margin: 50px 0 100px 0;
}
</style>
