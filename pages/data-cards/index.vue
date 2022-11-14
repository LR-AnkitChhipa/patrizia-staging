<template>
  <section>
    <b-container>
      <b-col>
        <h1>Data Card Cities</h1>
        <ul v-if="cities">
          <li v-for="city in cities" :key="city.slug">
            <nuxt-link :to="`/data-cards/${city.id}`">
              {{ city.name }}
            </nuxt-link>
          </li>
        </ul>
      </b-col>
    </b-container>
  </section>
</template>

<script>
import DataService from '@/services/data-service'

export default {
  name: 'DataCardsIndex',
  async asyncData () {
    const response = await DataService.getAllCities()
    return {
      cities: response.data
    }
  }
}
</script>

<style scoped>
.data-cards {
  background-color: #EFEFF0;
  padding-top: 28px;
  display: flex;
  flex-wrap: wrap;
}
</style>
