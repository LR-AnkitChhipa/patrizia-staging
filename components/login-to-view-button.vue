<template>
  <div>
    <div v-if="!isUserLoggedIn && enabled" class="login-to-view-button">
      <button-link url="/login" title="Login to view" label="Login to view" />
      <text-link nuxt-url="/login" title="Apply for access" text="Apply for access" />
    </div>
    <slot v-else />
  </div>
</template>

<script>
import AuthService from '@/services/auth-service'
import ButtonLink from '@/components/buttons/button-link'
import TextLink from '@/components/text-link'

export default {
  name: 'LoginToViewButton',
  components: { TextLink, ButtonLink },
  props: {
    loggedInLink: {
      type: Object,
      default () {
        return null
      }
    },
    enabled: {
      type: Boolean,
      default () {
        return true
      }
    },
    loggedInText: {
      type: Object,
      default () {
        return null
      }
    }
  }
}
</script>

<style lang="scss">
.login-to-view-button {
  display: flex;
  align-items: center;
  .p-btn {
    margin-right: 20px;
  }
}
</style>
