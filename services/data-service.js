import Api from '@/services/api'

export default {
  /**
   * Get trend data for a specific cluster
   * @param clusterName (attractiveness|liquidity)
   * @param trendType The trend type (top|movers) top = top scorers for the cluster, movers = cities moved most since last report
   * @returns {Promise<AxiosResponse<any>>}
   */
  getCityTrends (clusterName, trendType) {
    return Api().get('/trends/' + clusterName + '/' + trendType)
  },

  /**
   * Get city data by a city ID
   * @param cityId
   * @returns {Promise<AxiosResponse<any>>}
   */
  getCityData (cityIdOrSlug) {
    return Api().get('/city/' + cityIdOrSlug)
  },

  /**
   * Get a list of all cities from the api
   * @returns {Promise<AxiosResponse<any>>}
   */
  getAllCities () {
    return Api().get('/city')
  },

  /**
   * Get a list of all countries
   * @returns {Promise<AxiosResponse<any>>}
   */
  async getAllCountries () {
    try {
      const response = await Api().get('/city/countries')
      return response.data
    } catch (ex) {
      return null
    }
  },

  /**
   * Get featured city data for the homepage featured city block
   * @returns {Promise<AxiosResponse<any>>}
   */
  getHomepageFeaturedCityData () {
    return Api().get('/city/homepage_featured')
  },
  /**
   * Pass a city property in and get a Card component name out
   * @param property_name e.g. population_forecast_2018
   * @returns {string}
   */
  getCardVariantFromProperty (property_name) {
    switch (property_name) {
      case 'population':
        return 'DemographicsPopulation'
      case 'number_of_private_households':
        return 'DemographicsPrivateHouseholds'
      case 'population_forecast_2018':
        return 'DemographicsPopulationForecast'
      case 'unemployment_rate':
        return 'DemographicsUnemployment'
      case 'purchasing_power_per_household':
        return 'EconomyPurchasingPower'
      case 'excess_birth_rate_vs_country':
        return 'DemographicsBirthRate'
      case 'average_travel_time_to_work':
        return 'ConnectivityCommuteTime'
      default:
        return ''
    }
  }
}
