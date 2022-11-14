import Api from '@/services/api'

export default {
  getMapData (app, isFeaturedCities) {
    return Api(app).get('/chart/map' + (isFeaturedCities ? '/featured' : ''))
  },

  getMapFilterRanges (app) {
    return Api(app).get('/chart/map/filter-range')
  },

  getGoalsData (app) {
    return Api(app).get('/chart/goals')
  },

  getTableData (app, showOnlyFeaturedCities) {
    return Api(app).get('/chart/table' + (showOnlyFeaturedCities ? '/featured' : ''))
  },

  getCompareData (app, showOnlyFeaturedCities) {
    return Api(app).get('/chart/compare' + (showOnlyFeaturedCities ? '/featured' : ''))
  },

  getCitiesData (app) {
    return Api(app).get('/chart/cities')
  },
}
