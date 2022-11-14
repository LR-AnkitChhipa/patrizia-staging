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
      <div class="range-filter__ranges" v-if="rangeFilters">
        <div class="range-filter__ranges__range" v-for="clusterSlug in availableFilters" :key="clusterSlug">
          <p :class="getRangeTitleCssClass(clusterSlug)" @click="toggleFilterVisibility(clusterSlug)">
            {{ clusterSlug.replace('_', ' ') === 'market_fundamentals' ? 'Market Fundamentals' : clusterSlug.replace('_', ' ') }}
          </p>
          <fieldset
            class="range-filter__ranges__range__options"
            v-if="filtersVisible[clusterSlug]"
          >
            <select-wrapper>
              <select
                class="form-control"
                v-model="selectedFilters[clusterSlug]"
              >
                <option
                  v-for="option in rangeFilters[clusterSlug]"
                  :key="option.slug"
                  :value="option.slug"
                >
                  {{ option.title }}
                </option>
              </select>
            </select-wrapper>

            <div class="range-filter__slider-container">
              <range-slider
                :min="getSelectedOptionData(clusterSlug).min"
                :max="getSelectedOptionData(clusterSlug).max"
                :step="getRangeStep(clusterSlug)"
                v-model="selectedRange[clusterSlug]"
                :formatter="getRangeFormatter(clusterSlug)"
                :cluster="clusterSlug"
              />
            </div>
            <div class="range-filter__tooltip-container">
              <b-button v-b-tooltip.hover.right :title="getTooltipText(clusterSlug)" class="range-filter__tooltip"/>
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  </draggable>
</template>

<script>
import ToggleButton from '~/components/inputs/toggle-button'
import Draggable from '@/components/draggable'
import ChartService from '@/services/chart-service'
import SelectWrapper from "@/components/inputs/select-wrapper";
import RangeSlider from "@/components/inputs/range-slider";

export default {
  name: 'MapRangeFilter',
  components: {RangeSlider, SelectWrapper, Draggable, ToggleButton},
  props: {},
  data () {
    return {
      rangeFormatters: {
        market_fundamentals: null,
        location_quality: null,
        connectivity: null,
        innovation: null
      },
      availableFilters: [
        'market_fundamentals',
        'location_quality',
        'connectivity',
        'innovation'
      ],
      selectedFilters: {
        'market_fundamentals': 'population',
        'location_quality': 'unemployment_rate',
        'connectivity': 'airport_passenger_volume',
        'innovation': 'students_at_higher_education_institutions'
      },
      selectedRange: {
        'market_fundamentals': [0, 100],
        'location_quality': [0, 100],
        'connectivity': [0, 100],
        'innovation': [0, 100]
      },
      rangeFilters: null,
      filtersVisible: {
        market_fundamentals: true,
        location_quality: false,
        connectivity: false,
        innovation: false
      }
    }
  },
  watch: {
    selectedFilters: {
      deep: true,
      handler () {
        this.updateSectionMinMaxes()
        this.$emit('filters-updated', { filters: this.selectedFilters, ranges: this.selectedRange })
      }
    },
    selectedRange: {
      deep: true,
      handler () {
        this.$emit('filters-updated', { filters: this.selectedFilters, ranges: this.selectedRange })
      }
    }
  },
  async mounted () {
    const filter = function (number) {
      return Intl.NumberFormat('en-gb').format(number)
    }
    this.rangeFormatters.market_fundamentals = filter
    try {
      const response = await ChartService.getMapFilterRanges(this)
      this.rangeFilters = response.data
      this.updateSectionMinMaxes()
    } catch (ex) {
    }
    // this.activeStrategyDimensions = [...this.enabledStrategyDimensions] // Clone the enabledStrategyDimensions prop to disable binding
  },
  methods: {
    /**
     * Reset all filters
     *
     */
    reset () {
      // Reset all ranges
      const demoRange = this.selectedRange.market_fundamentals
      demoRange[0] = 1000000
      demoRange[1] = 1000000
    },
    /**
     * Get the step for the range input based on the filterSlug
     */
    getRangeStep (section) {
      const selectedOption = this.selectedFilters[section]
      if (
        selectedOption === 'share_of_country_population'
        ||
        selectedOption === 'population_forecast_2020_2030'
      ) {
        return 0.01
      } else {
        return 1
      }
    },
    getTooltipText(clusterName) {
      const clusterFilter = this.selectedFilters[clusterName]
      return this.getTooltip(clusterFilter)
    },
    /**
     * Update the min and max values for each section based on which filter has been selected for the section
     */
    updateSectionMinMaxes() {
      // Update all the max and mins
      this.availableFilters.forEach((filter) => {
        let demoOptionData = this.getSelectedOptionData(filter)
        this.selectedRange[filter] = [demoOptionData.min, demoOptionData.max]
      })
    },
    /**
     * Get a min and max for an option in a section (e.g. market_fundamentals)
     *
     */
    getSelectedOptionData(section) {
      // What is the selected option in this section?
      const selectedOption = this.selectedFilters[section]
      const selectedOptionData = this.rangeFilters[section][selectedOption]
      return selectedOptionData
    },
    uppercaseFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    /**
     * Toggle the visibility of a filter block
     */
    toggleFilterVisibility(selectedFilterName) {
      // Hide all filters that arent the selected one
      for(const filterName in this.filtersVisible) {
        if(filterName != selectedFilterName) {
          this.filtersVisible[filterName] = false
        }
      }
      this.filtersVisible[selectedFilterName] = !this.filtersVisible[selectedFilterName]
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
      this.$emit('toggleInvestmentStrategyGoals', {name: strategyGoalName, value})
    },
    toggleStrategyDimension(dimensionName, value) {
      if (!value) {
        this.activeStrategyDimensions.splice(this.activeStrategyDimensions.indexOf(dimensionName), 1)
      } else {
        this.activeStrategyDimensions.push(dimensionName)
      }
      this.$emit('toggleStrategyDimension', {name: dimensionName, value: value})
    },
    /**
     * Get a range formatter for a cluster
     * @param clusterSlug e.g. market_fundamentals, location_quality, connectivity or innovation
     * @returns {*}
     */
    getRangeFormatter(clusterSlug) {
      // What filter is selected?
      // Decide the formatter based on the selected filter
      const selectedFilter = this.selectedFilters[clusterSlug]

      // Define some standard format functions
      const percentageFormatter = (number) => (+(number * 100).toFixed(2)) + '%'

      const appendPercentageFormatter = (number) => number + '%'

      const eurAppendFormatter = (number) => number + ' EUR'

      switch (selectedFilter) {
        case 'population_forecast_2020_2030':
        case 'share_of_country_population':
          return (number) => percentageFormatter(number)
        case 'old_age_ratio':
        case 'working_population_ratio':
        case 'car_to_work_ratio':
        case 'share_of_public_transportation':
        case 'youth_ratio':
        case 'unemployment_rate':
          return (number) => appendPercentageFormatter(number)
        case 'purchasing_power_per_inhabitant':
        case 'average_household_income_eur':
          return (number) => eurAppendFormatter(number)
        case 'average_travel_time_to_work':
          return (number) => number + ' mins'
        default:
          return (number) => Intl.NumberFormat('en-gb').format(number)
      }
    },
  }
}
</script>

<style lang="scss">
.range-filter {

  &__slider-container {
    margin-top: 10px;
    height: 60px;
    margin-bottom: 12px;
  }

  &__tooltip-container {
    display: flex;
    justify-content: flex-end;
    margin: 12px 0;
    padding-right: 4px;
  }

  &__tooltip {
    background-color: transparent;
    border: 1px solid #E1DBDD;
    width: 21px;
    height: 21px;
    border-radius: 10.5px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 8px;

    &:after {
      content: '?';
      color: #9C8A8F;
      font-family: "Corporate S Pro";
      font-size: 12px;
    }
  }

  &__ranges {
    &__range {
      &__options {
        background-color: #F4F2F3;
        padding: 8px 8px 8px;
        margin-bottom: 21px;

        .vue-range-slider.slider-component {
          margin-top: 35px;

          .slider-tooltip-wrap .slider-tooltip {
            background-color: white;
            color: #9C8A8F;
            font-family: "Corporate S Pro";
            font-size: 14px;
            padding: 0 2px;
            line-height: 1rem;
            border-color: white;
          }

          .slider {
            .slider-process {
              background-color: #29B5BA;
            }

            .slider-dot {
              border: 2px solid white;
              box-shadow: 0 0 10px rgba(34, 10, 18, 0.12);
              width: 30px !important;
              height: 30px !important;
              top: -12px !important;
              display: flex;
              align-items: center;
              justify-content: space-around;

              &:after {
                content: '';
                width: 20px;
                height: 20px;
                background-color: #29B5BA;
                border-radius: 10px;
              }
            }
          }
        }
      }
    }
  }

}
</style>
