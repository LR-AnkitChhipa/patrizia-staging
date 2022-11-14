<template>
  <section id="chart-table" :class="`container mt-5 chart chart--table ${isFeaturedCitiesChart ? ' chart--table--featured-cities' : ''}`">
    <b-input-group>
      <b-form-input
        v-model="filter"
        class="searchFilter"
        type="search"
        placeholder="Type to Search"
      />

      <!-- <b-input-group-append>
        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
      </b-input-group-append> -->
    </b-input-group>
    <city-summary-modal v-if="isModalVisible" :city-id="modalCityId" @close="handleCloseModal()" />
    <b-table
      v-if="tableData.items"
      id="chart-table"
      :sort-by.sync="tableData.sortBy"
      :sort-desc.sync="tableData.sortDesc"
      responsive
      :fields="this.tableData.fields"
      :items="this.tableData.items"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      sticky-header
      striped
      bordered
    >
      <template #cell(city_country_html)="data">
        <a @click.stop.prevent="showCityInfo(data.item.id)" href="#"><span v-html="data.value" :class="barClass"></span></a>
      </template>

      <template #cell(overall_rank)="data">
        <div class="countrow">
          <span class="graph_count" v-html="data.value"/>
          <span :style="getBarStyle(data.value)" :class="barClass"/>
        </div>
      </template>

      <template #cell(cluster)="data">
        <span v-if="data.value === 'Affordable'">Aspiring</span>
        <span v-else>{{ data.value }}</span>
      </template>

      <template #cell(liquidity_score)="data">
        <div class="countrow">
          <span class="graph_count" v-html="data.value"/>
          <span :style="getBarStyle(data.value)" :class="barClass"/>
        </div>
      </template>

      <template #cell(market_fundamentals_rank)="data">
        <div class="countrow">
          <span class="graph_count">{{ data.value }}</span>
          <span :style="getBarStyle(data.value)" :class="barClass"/>
        </div>
      </template>

      <template #cell(economy_rank)="data">
        <div class="countrow">
          <span class="graph_count">{{ data.value }}</span>
          <span :style="getBarStyle(data.value)" :class="barClass"/>
        </div>
      </template>

      <template #cell(connectivity_rank)="data">
        <div class="countrow">
          <span class="graph_count">{{ data.value }}</span>
          <span :style="getBarStyle(data.value)" :class="barClass"/>
        </div>
      </template>

      <template #cell(innovation_rank)="data">
        <div class="countrow">
          <span class="graph_count">{{ data.value }}</span>
          <span :style="getBarStyle(data.value)" :class="barClass"/>
        </div>
      </template>
    </b-table>
    <div v-if="tableData.items && tableData.items.length > 15" class="select-pagination">
      <p>Show</p>
      <select-wrapper>
        <b-form-select v-model="perPage" :options="perPageOptions" aria-controls="chart-table" @change="scrollToTop"/>
      </select-wrapper>
      <p>cities</p>
    </div>
  </section>
</template>

<script>

import ChartService from '@/services/chart-service'
import SelectWrapper from "@/components/inputs/select-wrapper";
import CitySummaryModal from "@/components/charts/city-summary-modal";

const VueScrollTo = require('vue-scrollto')

export default {
  name: 'TableChart',
  components: {CitySummaryModal, SelectWrapper},
  filters: {
    textTruncate(value) {
      if (value.length > 4) {
        const replacedValue = value.substring(0, 4) + '.'
        return replacedValue
      }
      return value
    }
  },
  props: {
    isFeaturedCitiesChart: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      isModalVisible: false,
      modalCityId: null,
      tableData: {
        sortBy: 'market_fundamentals_rank',
        sortDesc: false,
        fields: this.isFeaturedCitiesChart ? [
          {key: 'city_country_html', label: 'City', sortable: true},
          // {key: 'cluster', label: 'Cluster', sortable: true},
          {key: 'market_fundamentals_rank', label: 'Mkt. F.', sortable: true},
          {key: 'economy_rank', label: 'Loc. Q.', sortable: true},
          {key: 'connectivity_rank', label: 'Conn.', sortable: true},
          {key: 'innovation_rank', label: 'Inno.', sortable: true},
          {key: 'overall_rank', label: 'Attractiveness', sortable: true},
        ] : [
          {key: 'city_country_html', label: 'City', sortable: true},
          {key: 'overall_rank', label: 'Attractiveness', sortable: true},
          {key: 'liquidity_score', label: 'Liquidity', sortable: true},
          {key: 'cluster', label: 'Cluster', sortable: true},
          {key: 'market_fundamentals_rank', label: 'Mkt. F.', sortable: true},
          {key: 'economy_rank', label: 'Loc. Q.', sortable: true},
          {key: 'connectivity_rank', label: 'Conn.', sortable: true},
          {key: 'innovation_rank', label: 'Inno.', sortable: true}
        ],
        items: []
      },
      filter: null,
      filterOn: ['city_country_html'],
      perPage: 15,
      currentPage: 1,
      perPageOptions: {
        '15': 15,
        '50': 50,
        '100': 100,
        '200': 'All'
      }
    }
  },
  mounted() {
    this.loadChartData()
    // Remove some fields from featured cities chart
    if (this.isFeaturedCitiesChart) {
      this.tableData.fields = this.tableData.fields.map((field) => {
        if (field.key !== 'cluster' && field.key !== 'liquidity_score') {
          return field
        }
      })
    }
  },
  computed: {
    barClass() {
      if (this.isFeaturedCitiesChart) {
        return 'graph_bar graph_bar--featured-cities'
      } else {
        return 'graph_bar'
      }
    }
  },
  methods: {
    /**
     * Close the city info modal
     */
    handleCloseModal () {
      this.modalCityId = null
      this.isModalVisible = false
    },
    /**
     * Show the city information in the relevant way
     */
    showCityInfo (cityId) {
      this.modalCityId = cityId
      this.isModalVisible = true
    },
    async loadChartData() {
      const response = await ChartService.getTableData(this, this.isFeaturedCitiesChart)
      this.tableData.items = response.data
    },
    getBarStyle(value) {
      const width = 100 - ((value / 119) * 100)
      return {width: width + '%'}
    },
    scrollToTop() {
      VueScrollTo.scrollTo(`#chart-table`, 500, {
        duration: 500,
        easing: 'linear',
        offset: -150,
        force: true,
        cancelable: true,
        x: false,
        y: true
      })
    }
  },
}
</script>

<style lang="scss">
.chart--table {
  height: 100%;
  padding-bottom: 50px;

  // The right red border on cols
  thead {
    tr {
      th:nth-child(4) {
        border-right: 1px solid #802537 !important;
      }
    }
  }

  tbody {
    td:nth-child(4) {
      border-right: 1px solid #802537 !important;
    }
  }

  .searchFilter{
    border-color: #E1DBDD;
    border-radius: 0px;
    box-shadow: none;
    color: #000;
    outline: none;
    font-size: 14px;
    line-height: 17px;
    height: 45px;
    font-family: 'Corporate S Pro';
    margin-bottom: 1rem;
    max-width: 300px;

      @include respond-below(sm) {
        max-width: 100%;
      }
  }

  &--featured-cities {
    margin-top: 140px !important;

    @include respond-below(sm) {
      margin-top: 64px !important;
    }

    thead {
      tr {
        th:nth-child(4) {
          border-right: 1px solid #F0F0F0 !important;
        }
        th:nth-child(5) {
          border-right: 1px solid #802537 !important;
        }
      }
    }

    tbody {
      td:nth-child(4) {
        border-right: 1px solid #F0F0F0 !important;
      }
      td:nth-child(5) {
        border-right: 1px solid #802537 !important;
      }
    }
  }

  .b-table-sticky-header {
    max-height: unset;
  }

  .table-striped tbody tr:nth-of-type(odd) {
    background-color: transparent;
  }

  .table-striped tbody tr:nth-of-type(even) td {
    background-color: #f0f0f066;
  }

  .table-responsive {
    .table {
      border-spacing: 0;
      width: 100%;
      position: relative;
      border: 1px solid #F0F0F0;
      font-family: 'Corporate S Pro';
      font-size: 16px;
      color: #330A12;
      padding: {
        left: 10px;
        right: 10px;
      }

      thead {
        tr {
          th {
            background-color: #F0F0F0;
            color: #B4A4A9;
            font-family: 'Corporate S Pro Demi';
            text-transform: uppercase;
            z-index: 10;
            border: 0;
            transition: color 0.3s ease-in-out;

            &:hover, &:focus {
              color: rgb(242, 145, 49);
            }
          }
        }
      }

      tbody {
        tr {
          td {
            border-color: #F0F0F0;

            &:first-child {
              a {
                font-family: 'Corporate S Pro Demi';
                font-weight: 500;
                font-size: 16px;
                color: #802437 !important;

                span.country_code {
                  font-family: 'Corporate S Pro';
                  font-weight: 400;
                  color: #B4A4A9 !important;
                }
              }
            }

            div.countrow {
              text-align: right;
              position: relative;

              span.graph_count {
                position: relative;
                padding-right: 6px;
                z-index: 4;
              }

              span.graph_bar {
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 20px;
                transform: translateY(-50%);
                z-index: 1;
                background: #E1F3FC;
                border-radius: 3px;
              }
            }

            &:nth-child(2) {
              span.graph_bar {
                background-color: #E1F3FC !important;


                &--featured-cities {
                  background-color: #D3F4F6 !important;
                }
              }
            }

            &:nth-child(3), &:nth-child(7) {

              span.graph_bar {
                background-color: #FCE9D6 !important;

                &--featured-cities {
                  background-color: #E1F3FC !important;
                }
              }
            }

            &:nth-child(4) {
              span.graph_bar {
                &--featured-cities {
                  background-color: #FCE9D6 !important;
                }
              }
            }

            &:nth-child(5) {
              span.graph_bar {
                background-color: #D3F4F6 !important;

                &--featured-cities {
                  background-color: #ECDAE9 !important;
                }
              }
            }

            &:nth-child(6) {
              span.graph_bar {
                &--featured-cities {
                  background-color: #E1DADC !important;
                }
              }
            }

            &:nth-child(8) {
              span.graph_bar {
                background-color: #ECDAE9 !important;
              }
            }
          }
        }
      }
    }
  }

  .select-pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .box-select {
      margin: 10px;

      select {
        width: auto;
        padding: 4px 65px 4px 20px;
      }
    }

    p {
      margin: 0;
    }
  }

  .table.b-table > thead > tr > [aria-sort="none"] {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='13' viewBox='0 0 8 13'%3E%3Cg id='Group_5326' data-name='Group 5326' transform='translate(-934 -697)'%3E%3Cpath id='Path_677' data-name='Path 677' d='M63.584,101.624h-8l4-6Z' transform='translate(878.416 601.376)' fill='%23b4a4a9'/%3E%3Cpath id='Path_677-2' data-name='Path 677' d='M63.584,101.624h-8l4-6Z' transform='translate(997.584 805.624) rotate(180)' fill='%23b4a4a9'/%3E%3C/g%3E%3C/svg%3E%0A") !important;
  }

  .table.b-table > thead > tr > [aria-sort="descending"] {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='13' viewBox='0 0 8 13'%3E%3Cg id='Group_5325' data-name='Group 5325' transform='translate(-934 -697)'%3E%3Cpath id='Path_677' data-name='Path 677' d='M63.584,101.624h-8l4-6Z' transform='translate(878.416 601.376)' fill='%23b4a4a9'/%3E%3Cpath id='Path_677-2' data-name='Path 677' d='M63.584,101.624h-8l4-6Z' transform='translate(997.584 805.624) rotate(180)' fill='%23802537'/%3E%3C/g%3E%3C/svg%3E%0A") !important;
  }

  .table.b-table > thead > tr > [aria-sort="ascending"] {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='13' viewBox='0 0 8 13'%3E%3Cg id='Group_5326' data-name='Group 5326' transform='translate(-934 -697)'%3E%3Cpath id='Path_677' data-name='Path 677' d='M63.584,101.624h-8l4-6Z' transform='translate(878.416 601.376)' fill='%23802537'/%3E%3Cpath id='Path_677-2' data-name='Path 677' d='M63.584,101.624h-8l4-6Z' transform='translate(997.584 805.624) rotate(180)' fill='%23b4a4a9'/%3E%3C/g%3E%3C/svg%3E%0A") !important;
  }

}
</style>
