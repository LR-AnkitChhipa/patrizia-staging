<template>
  <div :class="toggleClass">
    <div
      :class="toggleNubClass"
      @click="toggle"
    />
    <p v-if="label" :class="toggleLabelClass">
      {{ label }}
      <b-button v-if="tooltipContent" v-b-tooltip.hover.right :title="tooltipContent" class="toggle-button__tooltip"/>
    </p>
  </div>
</template>

<script>
// import * from '../../assets/scss/styles.scss'
export default {
  name: 'ToggleButton',
  props: {
    initialValue: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    tooltipContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      toggleValue: this.initialValue
    }
  },
  computed: {
    toggleClass() {
      let cssClass = 'toggle-button toggle-button--' + this.label.toLowerCase()
      cssClass += (this.disabled) ? ' toggle-button--disabled' : ''
      cssClass += (this.toggleValue ? ' toggle-button--on' : ' toggle-button--off')
      return cssClass
    },
    toggleNubClass() {
      return 'toggle-button__toggle' + (this.toggleValue ? ' toggle-button__toggle--on' : ' toggle-button__toggle--off')
    },
    toggleLabelClass() {
      return 'toggle-button__label' + (this.toggleValue ? ' toggle-button__label--on' : ' toggle-button__label--off')
    }
  },
  methods: {
    toggle() {
      // Dont allow a toggle OFF to take place if this is disabled
      if (this.toggleValue === true && this.disabled !== true) {
        this.toggleValue = false
      } else {
        this.toggleValue = true
      }
    }
  },
  watch: {
    // whenever checkbox value changes this will run
    toggleValue(newValue) {
      this.$emit('toggle', newValue)
    },
    initialValue(newValue) {
      this.toggleValue = newValue
    }
  }
}
</script>

<style scoped lang="scss">
.toggle-button {
  display: flex;
  align-items: center;
  margin-bottom: 13px;

  &--disabled {
    .toggle-button__toggle--on {
      background-color: #f5f5f5;

      &:before {
        box-shadow: none;
      }

      &:before, &:after {
        opacity: 0.5;
        border: 0;
      }
    }

    .toggle-button__label--on {
      color: #D2d2d2;
    }
  }

  &__label {
    margin-left: 10px;
    margin-bottom: 0;
    display: flex;
    align-items: center;

    &--off {
      color: #9C8A8F;
    }
  }

  &__toggle {
    height: 30px;
    width: 60px;
    position: relative;
    background-color: #F0EDEE;
    border-radius: 20px;
    cursor: pointer;

    &:before, &:after {
      content: '';
      display: block;
      position: absolute;
      width: 30px;
      height: 30px;
      left: 0;
      transition: left 0.2s ease-in-out;
      box-shadow: 0 0 10px rgba(34, 10, 18, 0.12);
    }

    &:after {
      border: 5px solid white;
      border-radius: 100%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      .toggle-button--affordable & {
        background-color: #29B5BA;
      }

      .toggle-button--aspirational & {
        background-color: #29B5BA;
      }

      .toggle-button--powerful & {
        background-color: #802537;
      }

      .toggle-button--liquid & {
        background-color: #B4A4A9;
      }

      .toggle-button--innovative & {
        background-color: #A44993;
      }

      .toggle-button--liquidity & {
        background-color: white;
      }

      .toggle-button--liquidity & {
        background-color: white;
      }

      .toggle-button--attractiveness & {
        background-color: white;
      }

      .toggle-button--demographics &,
      .toggle-button--economy &,
      .toggle-button--innovation &,
      .toggle-button--connectivity & {
        background-color: #01A64B;
      }
    }

    &:before {
      z-index: 2;
      content: '';
      display: block;
      margin-top: 13px;
      margin-left: 5px;
      height: 4px;
      width: 20px;

      .toggle-button--liquidity & {
        background-color: #F29131;
      }

      .toggle-button--attractiveness & {
        background-color: #6AC6F1;
      }

      .toggle-button--powerful &,
      .toggle-button--innovative &,
      .toggle-button--affordable &,
      .toggle-button--liquid & {
        display: none;
      }
    }

    &--off {
      &:after {
        background-color: white;

        .toggle-button--powerful &,
        .toggle-button--innovative &,
        .toggle-button--affordable &,
        .toggle-button--liquid &,
        .toggle-button--liquidity &,
        .toggle-button--innovation &
        {
          background-color: white;
        }
      }
    }

    &--on {
      &:after, &:before {
        left: 50%;
      }
    }
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

}
</style>
