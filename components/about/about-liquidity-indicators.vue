<template>
  <b-container class="about-liquidity-indicators">
    <b-row>
      <b-col cols="12" md="6" class="about-liquidity-indicators__content">
        <div class="about-liquidity-indicators__content__inner">
          <prismic-rich-text :field="slice.primary.liquidity_indicators_content" />
        </div>
      </b-col>
      <b-col cols="12" md="6" class="about-liquidity-indicators__goals">
        <p
          v-if="slice.primary.liquidity_indicators_strategy_goals_title"
          class="about-liquidity-indicators__goals__title"
        >
          {{ slice.primary.liquidity_indicators_strategy_goals_title }}
        </p>

        <div class="about-liquidity-indicators__goals__accordion accordion">
          <div v-for="(goal, goalIndex) in slice.items" :key="goalIndex">
            <b-button v-b-toggle="'accordion-item-' + goalIndex">
              {{ goal.strategy_goal_title }}
            </b-button>
            <b-collapse :id="'accordion-item-' + goalIndex" accordion="strategygoals" class="accordion-desc" :visible="goalIndex === 0">
              <prismic-rich-text :field="goal.strategy_goal_content" />
            </b-collapse>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'AboutLiquidityIndicators',
  props: {
    slice: {
      type: Object,
      default () {
        return {}
      }
    },
    sliceIndex: {
      type: Number,
      default () {
        return 0
      }
    }
  }
}
</script>

<style lang="scss">
:root {
  --vsa-highlight-color: white;
}

.about-liquidity-indicators {
  padding: 99px 16px;

  &__content {
    &__inner {
      max-width: 461px;
    }
  }

  &__goals {
    &__title {
      font-family: "Corporate S Pro Bold";
      color: #9C3F57;
      margin-bottom: 5px;
    }
  }
  @include respond-below(md){
    padding: 50px 16px;
  }
}
</style>
