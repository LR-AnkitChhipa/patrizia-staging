<template>
  <nav>
    <nuxt-link to="/">
      HOME
    </nuxt-link>
    <nuxt-link to="/about">
      ABOUT
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style scoped>
nav {
  display: flex;
  width: 200px;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 24px;
  margin-top: 24px;
}
</style>
