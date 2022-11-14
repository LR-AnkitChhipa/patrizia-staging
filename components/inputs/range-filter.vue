<template>
  <draggable>
    <section class="range-filter">
      <div class="range-filter__header">
        <div class="range-filter__header__drag-icon drag-handle">
          <svg viewBox="0 0 31.968 31.969" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(-7156.5 -3062.3)" data-name="Group 11516">
              <g data-name="Group 11509">
                <g data-name="Group 11508">
                  <line transform="translate(7172.5 3082.3)" y2="9.49" fill="none" stroke="#b4a4a9"
                        stroke-miterlimit="10" stroke-width="2" data-name="Line 1426"/>
                </g>
                <path d="m7178.2 3087.2-5.657 5.657-5.657-5.657" fill="none" stroke="#b4a4a9" stroke-miterlimit="10"
                      stroke-width="2" data-name="Path 4964"/>
              </g>
              <g data-name="Group 11511">
                <g data-name="Group 11510">
                  <line transform="translate(7172.5 3064.8)" y1="9.49" fill="none" stroke="#b4a4a9"
                        stroke-miterlimit="10" stroke-width="2" data-name="Line 1427"/>
                </g>
                <path d="m7178.2 3069.4-5.657-5.657-5.657 5.657" fill="none" stroke="#b4a4a9" stroke-miterlimit="10"
                      stroke-width="2" data-name="Path 4965"/>
              </g>
              <g data-name="Group 11513">
                <g data-name="Group 11512">
                  <line transform="translate(7159 3078.3)" x1="9.49" fill="none" stroke="#b4a4a9" stroke-miterlimit="10"
                        stroke-width="2" data-name="Line 1428"/>
                </g>
                <path d="m7163.6 3072.7-5.657 5.657 5.657 5.657" fill="none" stroke="#b4a4a9" stroke-miterlimit="10"
                      stroke-width="2" data-name="Path 4966"/>
              </g>
              <g data-name="Group 11515">
                <g data-name="Group 11514">
                  <line transform="translate(7176.5 3078.3)" x2="9.49" fill="none" stroke="#b4a4a9"
                        stroke-miterlimit="10" stroke-width="2" data-name="Line 1429"/>
                </g>
                <path d="m7181.4 3072.7 5.657 5.657-5.657 5.657" fill="none" stroke="#b4a4a9" stroke-miterlimit="10"
                      stroke-width="2" data-name="Path 4967"/>
              </g>
            </g>
          </svg>
        </div>
        <p class="range-filter__header__reset" @click="reset">
          Reset chart data
        </p>
      </div>
      <div class="range-filter__ranges">

        <!--        COMPARE CITIES SELECT-->
        <div v-if="isFilterAvailable('cities')" class="range-filter__ranges__range">
          <form>
            <p class="range-filter__ranges__range__title range-filter__ranges__range__title--no-toggle subline">
              Cities
            </p>
            <fieldset>
              <div
                v-for="selectInputIndex in [0,1,2,3]"
                :key="selectInputIndex"
                class="chart-compare__city-select__input"
              >
                <div
                  class="chart-compare__city-select__input__legend"
                  :style="{backgroundColor: lineColours[selectInputIndex]}"
                >
                  <svg>
                    <g>
                      <circle r="5" cx="7" cy="7" stroke-width="2px" fill="white"
                              :style="{stroke: lineColours[selectInputIndex]}"
                      />
                    </g>
                  </svg>
                </div>
                <select-wrapper>
                  <select
                    class="form-control"
                    v-model="selectedCities[selectInputIndex]"
                  >
                    <option :value="null">
                      Select a city
                    </option>
                    <option v-for="city in availableCities" :key="city.text" :value="city.text"
                            :disabled="isCityOptionDisabled(city.text)">
                      {{ city.text }}
                    </option>
                  </select>
                </select-wrapper>
              </div>
            </fieldset>
          </form>
        </div>
        <!--        /COMPARE CITIES SELECT-->

        <!--        INVESTMENT STRATEGY GOALS-->
        <div v-if="isFilterAvailable('investmentStrategyGoals')" class="range-filter__ranges__range">
          <p
            :class="getRangeTitleCssClass('investmentStrategyGoals')"
            @click="toggleFilterVisibility('investmentStrategyGoals')"
          >
            Strategy Dimensions
          </p>
          <fieldset
            v-if="filtersVisible['investmentStrategyGoals']"
            class="range-filter__ranges__range__fields range-filter__ranges__range__fields--toggles"
          >
            <toggle-button
              label="Powerful"
              tooltip-content="Cities that dominate their national economies are defined as powerful."
              :initial-value="getInvestmentStrategyGoalValue('powerful')"
              @toggle="toggleInvestmentStrategyGoals('powerful', $event)"
            />
            <toggle-button
              label="Innovative"
              :initial-value="getInvestmentStrategyGoalValue('innovative')"
              tooltip-content="When it comes to innovation some smaller European cities punch well above their weight."
              @toggle="toggleInvestmentStrategyGoals('innovative', $event)"
            />
            <toggle-button
              label="Aspirational"
              :initial-value="getInvestmentStrategyGoalValue('affordable')"
              tooltip-content="Where the dominant trait of the residential stock is that it is considered good value."
              @toggle="toggleInvestmentStrategyGoals('affordable', $event)"
            />
            <toggle-button
              label="Liquid"
              :initial-value="getInvestmentStrategyGoalValue('liquid')"
              tooltip-content="How easy it is to sell a property so investors can realise profits on their investments."
              @toggle="toggleInvestmentStrategyGoals('liquid', $event)"
            />
          </fieldset>
        </div>
        <!--        /INVESTMENT STRATEGY GOALS-->

        <!--        STRATEGY DIMENSIONS-->
        <div v-if="isFilterAvailable('strategyDimensions')" class="range-filter__ranges__range">
          <p :class="getRangeTitleCssClass('strategyDimensions')"
             @click="toggleFilterVisibility('strategyDimensions')">
            Investment Strategy Goals
          </p>
          <fieldset
            v-if="filtersVisible['strategyDimensions']"
            class="range-filter__ranges__range__fields range-filter__ranges__range__fields--toggles"
          >
            <toggle-button
              v-if="enabledStrategyDimensions.includes(dimension.value)"
              :disabled="(minimumAllowedStrategyDimensions < activeStrategyDimensions.length) ? false : true"
              :label="dimension.title"
              :initial-value="(activeStrategyDimensions.indexOf(dimension.value) > -1)"
              :tooltip-content="dimension.tooltip"
              @toggle="toggleStrategyDimension(dimension.value, $event)"
              v-for="dimension in strategyDimensions"
              :key="dimension.value"
            />
          </fieldset>
        </div>
        <!--        STRATEGY DIMENSIONS-->

        <!--        Liquidity checkboxes-->
        <div v-if="isFilterAvailable('liquidity')" class="range-filter__ranges__range">
          <p :class="getRangeTitleCssClass('liquidity')" @click="toggleFilterVisibility('liquidity')">
            Liquidity
          </p>
          <fieldset v-if="filtersVisible['liquidity']" class="range-filter__ranges__range__fields">
            <p v-for="(value, key) in liquidityFilters" :key="key" class="checkbox">
              <label>
                <input v-model="liquidityFilters[key]" type="checkbox">
                <span class="cr">
                  <inline-svg :src="require('@/assets/img/icon-tick.svg')"/>
                </span>
                {{ uppercaseFirst(key) }}
              </label>
            </p>
          </fieldset>
        </div>
        <!--        /Liquidity checkboxes-->

        <!--        attractiveness checkboxes-->
        <div v-if="isFilterAvailable('attractiveness')" class="range-filter__ranges__range">
          <p :class="getRangeTitleCssClass('attractiveness')" @click="toggleFilterVisibility('attractiveness')">
            City Ranking
          </p>
          <fieldset v-if="filtersVisible['attractiveness']" class="range-filter__ranges__range__fields">
            <p v-for="(value, key) in attractivenessFilters" :key="key" class="checkbox">
              <label>
                <input v-model="attractivenessFilters[key]" type="checkbox">
                <span class="cr">
                  <inline-svg :src="require('@/assets/img/icon-tick.svg')"/>
                </span>
                {{ uppercaseFirst(key) }}
              </label>
            </p>
          </fieldset>
        </div>
        <!--        /attractiveness checkboxes-->

        <!--        countries checkboxes-->
        <div v-if="isFilterAvailable('countries')" class="range-filter__ranges__range">
          <p :class="getRangeTitleCssClass('countries')" @click="toggleFilterVisibility('countries')">
            countries
          </p>
          <fieldset v-if="filtersVisible['countries']" class="range-filter__ranges__range__fields">
            <p class="range-filter__ranges__range__fields__toggle-all" @click="toggleSelectAllCounties()">
              {{ toggleSelectAllCountiesText }}
            </p>
            <p v-for="(countryName, index) in availableCountries" :key="index" class="checkbox">
              <label>
                <input v-model="selectedCountries" type="checkbox" :value="countryName">
                <span class="cr">
                  <inline-svg :src="require('@/assets/img/icon-tick.svg')"/>
                </span>
                {{ countryName }}
              </label>
            </p>
          </fieldset>
        </div>
        <!--        /countries checkboxes-->

        <!--        Country filter-->
      </div>
    </section>
  </draggable>
</template>

<script>
import ToggleButton from '~/components/inputs/toggle-button'
import Draggable from '@/components/draggable'
import DataService from '@/services/data-service'
import SelectWrapper from "@/components/inputs/select-wrapper";

export default {
  name: 'RangeFilter',
  components: {SelectWrapper, Draggable, ToggleButton},
  props: {
    availableFilters: {
      type: Array,
      default() {
        return [
          'liquidity',
          'attractiveness'
        ]
      }
    },
    lineColours: {
      type: Array,
      default() {
        return [
          '#802537',
          '#6BC6F1',
          '#F29131',
          '#B66EA9'
        ]
      }
    },
    availableCities: {
      type: Array,
      default() {
        return [
          'London',
        ]
      }
    },
    enabledStrategyDimensions: {
      type: Array,
      default() {
        return [
          'liquidity',
          'attractiveness',
        ]
      }
    },
    minimumAllowedStrategyDimensions: {
      type: Number,
      default() {
        return 0
      }
    },
  },
  data() {
    return {
      cities: [],
      // Default selected cities for the compare chart
      selectedCities: [
        'København',
        'Amsterdam',
        'Berlin',
        'München'
      ],
      filtersVisible: {
        liquidity: false,
        attractiveness: false,
        investmentStrategyGoals: false,
        strategyDimensions: false,
        countries: false
      },
      liquidityFilters: {
        'strongly liquid': true,
        'very liquid': true,
        liquid: true,
        'limited liquidity': true,
        'no liquidity': true
      },
      attractivenessFilters: {
        'strongly above average': true,
        'above average': true,
        average: true,
        'below average': true,
        'well below average': true
      },
      availableCountries: null,
      selectedCountries: null,
      strategyDimensions: [
        {
          title: 'Liquidity',
          value: 'liquidity',
          tooltip: 'Due to the reduced liquidity risk, liquid cities offer investors a balanced risk-return profile and should be part of a broadly diversified market portfolio.'
        },
        {
          title: 'Attractiveness',
          value: 'attractiveness',
          tooltip: 'Based upon the final rankings of cities according to four strategy features: demographics, economics, connectivity, innovation.'
        },
        {
          title: 'Market Fundamentals',
          value: 'market_fundamentals',
          tooltip: ''
        }
        ,
        {
          title: 'Economy',
          value: 'economy',
          tooltip: 'Assess a city on factors such as GDP, working population, unemployment and purchasing power per household.'
        }
        ,
        {
          title: 'Connectivity',
          value: 'connectivity',
          tooltip: 'Indicates how easy to access and leave a city, indicating how well it is bound into networks.'
        }
        ,
        {
          title: 'Innovation',
          value: 'innovation',
          tooltip: 'Is an indication of creativity and potential for further growth.'
        }
      ],
      activeStrategyDimensions: [],
      activeInvestmentStrategyGoals: ['powerful', 'innovative', 'affordable', 'liquid']
    }
  },
  watch: {
    selectedCities: {
      deep: true,
      handler() {
        this.$emit('selectedCitiesUpdated', this.selectedCities)
      }
    },
    liquidityFilters: {
      deep: true,
      handler() {
        this.$emit('liquidity-range-updated', this.liquidityFilters)
      }
    },
    selectedCountries: {
      deep: true,
      handler() {
        this.$emit('selectedCountriesUpdated', this.selectedCountries)
      }
    },
    attractivenessFilters: {
      deep: true,
      handler() {
        this.$emit('attractiveness-range-updated', this.attractivenessFilters)
      }
    }
  },
  async mounted() {
    this.$emit('liquidity-range-updated', this.liquidityFilters)
    this.$emit('attractiveness-range-updated', this.attractivenessFilters)
    this.activeStrategyDimensions = [...this.enabledStrategyDimensions] // Clone the enabledStrategyDimensions prop to disable binding
    this.availableCountries = await DataService.getAllCountries()
    this.selectedCountries = this.availableCountries
    this.cities = this.availableCities
  },
  methods: {
    /**
     * Reset all filters
     *
     */
    reset() {
      // Reset strategy dimensions
      this.activeStrategyDimensions = []
      this.enabledStrategyDimensions.forEach((dimensionName) => {
        this.activeStrategyDimensions.push(dimensionName)
        this.$emit('toggleStrategyDimension', {name: dimensionName, value: true})
      })
      // reset investment strategy goals
      this.activeInvestmentStrategyGoals = ['powerful', 'innovative', 'affordable', 'liquid']
      // Reset liquidity
      for (const property in this.liquidityFilters) {
        this.liquidityFilters[property] = true
      }
      // Reset city ranking
      for (const property in this.attractivenessFilters) {
        this.attractivenessFilters[property] = true
      }
      this.selectedCountries = this.availableCountries
    },
    /**
     * Is a city option available?
     */
    isCityOptionDisabled(cityName) {
      if (this.selectedCities.indexOf(cityName) > -1) {
        return true
      }
      return false
    },
    handleFilterToggle(value) {
      this.filtersVisible = value
    },
    uppercaseFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleFilterVisibility(filterName) {
      // Set all to non visible first
      this.filtersVisible = {
        liquidity: false,
        attractiveness: false,
        investmentStrategyGoals: false,
        strategyDimensions: false,
        countries: false
      }
      this.filtersVisible[filterName] = !this.filtersVisible[filterName]
    },
    getRangeTitleCssClass(filterName) {
      let cssClass = 'range-filter__ranges__range__title subline'
      cssClass += (this.filtersVisible[filterName] ? ' range-filter__ranges__range__title--open' : '')
      return cssClass
    },
    /**
     * Has a filter been enabled for use?
     * @param filterName
     * @returns {boolean}
     */
    isFilterAvailable(filterName) {
      return (this.availableFilters.includes(filterName))
    },
    /**
     * This event is fired when an investment strategy is toggled
     * @param strategyGoalName
     * @param event
     */
    toggleInvestmentStrategyGoals(strategyGoalName, value) {
      if (!value) {
        this.activeInvestmentStrategyGoals.splice(this.activeInvestmentStrategyGoals.indexOf(strategyGoalName), 1)
      } else if (!this.activeInvestmentStrategyGoals.includes(strategyGoalName)) {
        this.activeInvestmentStrategyGoals.push(strategyGoalName)
      }
      this.$emit('toggleInvestmentStrategyGoals', {name: strategyGoalName, value})
    },
    /**
     * Is a sepcified strategyGoalName enabled?
     * @param strategyGoalName
     * @returns {boolean}
     */
    getInvestmentStrategyGoalValue(strategyGoalName) {
      return this.activeInvestmentStrategyGoals.includes(strategyGoalName)
    },
    toggleStrategyDimension(dimensionName, value) {
      if (!value) {
        this.activeStrategyDimensions.splice(this.activeStrategyDimensions.indexOf(dimensionName), 1)
      } else if (!this.activeStrategyDimensions.includes(dimensionName)) {
        this.activeStrategyDimensions.push(dimensionName)
      }
      this.$emit('toggleStrategyDimension', {name: dimensionName, value: value})
    },
    /**
     * Toggle all or none selected countries
     */
    toggleSelectAllCounties() {
      if (this.selectedCountries.length > 0) {
        this.selectedCountries = []
      } else {
        this.selectedCountries = this.availableCountries
      }
    }
  },
  computed: {
    toggleSelectAllCountiesText() {
      if (this.selectedCountries.length > 0) {
        return "Deselect all"
      }
      return "Select all"
    }
  }
}
</script>

<style lang="scss">
.range-filter {
  box-shadow: 0 0 10px rgba(34, 10, 18, 0.12);
  background-color: white;
  width: 307px;
  padding: 0;
  border-radius: 4px;

  label {
    font-size: 14px;
    font-family: "Corporate S Pro";
    line-height: 14px;
  }

  &__header {
    background-color: rgba(240, 240, 240, 0.8);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 0 20px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    &__drag-icon {
      width: 30px;
      height: 30px;
      cursor: move;
    }

    &__reset {
      margin-bottom: 0;
      color: #802437;
      cursor: pointer;
    }
  }

  &__ranges {

    &:last-child {
      padding-bottom: 4px;
    }

    &__range {
      padding: 0 20px 0;
      border-bottom: 1px solid #F0EDEE;

      &:last-child {
        border-bottom: 0;
      }

      &__title {
        font-size: 1.1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 18px 0;
        margin: 0;
        z-index: 10;

        &:after {
          content: '';
          width: 16px;
          height: 16px;
          background: {
            image: url("../../assets/img/icon-expand-plus.svg");
            position: center;
            size: contain;
            repeat: no-repeat;
          }
        }

        &--no-toggle {
          cursor: initial;
          &:after {
            display: none;
          }
        }

        &--open {
          &:after {
            background: {
              image: url("../../assets/img/icon-expand-minus.svg");
            }
          }
        }
      }

      &__fields {
        border: 0;
        padding: 0 0 8px;
        position: relative;

        &--toggles {
          padding-top: 5px;
        }

        p {
          text-align: left;

          &.range-filter__ranges__range__fields__toggle-all {
            text-align: right;
            font-size: 14px;
            text-decoration: underline;
            cursor: pointer;
            color: #802437;
            position: absolute;
            top: -5px;
            right: 0;
            z-index: 2;
          }
        }
      }
    }
  }

  .checkbox {
    margin-bottom: 12px;

    label {
      margin-bottom: 0;
      display: flex;
      align-items: center;

      &:after {

        content: '';
        display: table;
        clear: both;
      }

      input[type="checkbox"] {
        display: none;

        &:checked + .cr {
          opacity: 1;
          background-color: #01A64B;

          svg {
            display: block;
          }
        }
      }
    }

    .cr {
      position: relative;
      border: 1px solid #F0EDEE;
      border-radius: 4px;
      background-color: #F0EDEE;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      float: left;
      margin-right: .5em;

      svg {
        display: none;
      }
    }

    &:disabled + .cr {
      opacity: 0.5;
    }

  }

}
</style>
