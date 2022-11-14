<template>
  <div ref="range-slider">
    <section :class="rangeSliderClass">
      <div class="range-slider__label range-slider__label--min" ref="minLabel" :style="{left: `${minPos}px`}">
        {{ formatMinValue }}
      </div>
      <div class="range-slider__label range-slider__label--max" ref="maxLabel" :style="{left: `${maxPos}px`}">
        {{ formatMaxValue }}
      </div>
      <input :value="values[0]" :min="min" ref="min" :max="max" :step="step" type="range">
      <input :value="values[1]" :min="min" ref="max" :max="max" :step="step" type="range">
    </section>
  </div>
</template>

<script>
export default {
  name: "range-slider",
  props: {
    formatter: {
      type: Function,
      default() {
        return null
      }
    },
    min: {
      type: Number,
      default() {
        return 0
      }
    },
    max: {
      type: Number,
      default() {
        return 100
      }
    },
    step: {
      type: Number,
      default() {
        return 1
      }
    },
    value: {
      type: Array,
      default() {
        return [0, 100]
      }
    },
    cluster: {
      type: String,
      default() {
        return null
      }
    }

  },
  data() {
    return {
      values: this.value,
      minPos: 0,
      maxPos: 0,
    }
  },
  mounted() {
    this.initialise()
    this.positionMinMaxLabels()
  },
  methods: {
    getVals() {
      // Get slider values
      const slides = this.$refs['range-slider'].getElementsByTagName("input");
      let slide1Value = parseFloat(slides[0].value);
      let slide2Value = parseFloat(slides[1].value);
      // Neither slider will clip the other, so make sure we determine which is larger
      if (slide1Value > slide2Value) {
        let tmp = slide2Value;
        slide2Value = slide1Value;
        slide1Value = tmp;
      }

      this.values = [slide1Value, slide2Value]
      // emit "value" this is where we set up the 2 way v-model binding
      this.$emit('input', this.values)
    },
    initialise() {
      // Initialize Sliders
      const sliderSections = this.$refs['range-slider'].getElementsByClassName("range-slider");
      for (let x = 0; x < sliderSections.length; x++) {
        const sliders = sliderSections[x].getElementsByTagName("input");
        for (let y = 0; y < sliders.length; y++) {
          if (sliders[y].type === "range") {
            sliders[y].oninput = this.getVals;
          }
        }
      }
    },
    positionMinMaxLabels() {
      const minSlider = this.$refs.min
      const minSliderPos = minSlider.value / minSlider.max
      const minLabelWidth = this.$refs.minLabel.clientWidth
      const minSliderPixelPos = ((minSlider.clientWidth * minSliderPos) - 30 * minSliderPos) - minLabelWidth / 2 + 15;

      this.minPos = minSliderPixelPos
      // max
      const maxSlider = this.$refs.max
      const maxSliderPos = maxSlider.value / maxSlider.max
      const maxLabelWidth = this.$refs.maxLabel.clientWidth
      // const maxSliderPixelPos = (maxSlider.clientWidth * maxSliderPos) - 30 * maxSliderPos;
      const maxSliderPixelPos = ((maxSlider.clientWidth * maxSliderPos) - 30 * maxSliderPos) - maxLabelWidth / 2 + 15;
      this.maxPos = maxSliderPixelPos

    },
    /**
     * Apply formatting to a value using the formatter prop if present
     * @param minOrMax
     * @returns {*}
     */
    formatValue(minOrMax) {
      try {
        const number = (minOrMax === 'min') ? this.values[0] : this.values[1]
        return this.formatter ? this.formatter(number) : number
      } catch (ex) {
        console.error(`Error formatting value ${this.value}`, ex)

      }
    },

  },
  computed: {
    rangeSliderClass() {
      return `range-slider${this.cluster ? ` range-slider--${this.cluster}` : ''}`
    },
    formatMinValue() {
      return this.formatValue('min')
    },
    formatMaxValue() {
      return this.formatValue('max')
    },
  },
  watch: {
    value(newValue) {
      this.values = newValue
      this.positionMinMaxLabels()
    }
  }
}
</script>

<style lang="scss">
.range-slider {
  position: relative;

  &--economics {

  }

  &__label {
    position: absolute;
    top: 0px;
    background-color: white;
    height: 23px;
    padding: 0 3px;
    border-radius: 2px;
    font-family: "Corporate S Pro";
    font-size: 14px;
    color: #9C8A8F;
    display: flex;
    align-items: center;
    justify-content: space-around;
    white-space: nowrap;
  }
}

@mixin range-slider($width, $height, $input-top, $input-bg-color, $input-thumb-color, $float:none, $input-height:30px, $input-border-radius:14px, $theme-color: red) {
  position: relative;
  width: $width;
  height: $height;
  float: $float;
  text-align: center;

  input[type="range"] {
    pointer-events: none;
    position: absolute;
    overflow: hidden;
    left: 0;
    top: $input-top;
    width: $width;
    outline: none;
    height: $input-height;
    margin: 0;
    padding: 0;
  }

  input[type="range"]::-webkit-slider-thumb {
    pointer-events: all;
    position: relative;
    z-index: 1;
    outline: 0;
  }

  input[type="range"]::-moz-range-thumb {
    pointer-events: all;
    position: relative;
    z-index: 10;
  }

  input[type="range"]::-ms-thumb {
    pointer-events: all;
    position: relative;
    z-index: 10;
  }

  input[type=range]::-moz-range-track {
    position: relative;
    z-index: -10;
    border: 0;
    -moz-appearance: none;
  }

  input[type=range]:last-of-type::-moz-range-track {
    -moz-appearance: none;
    border: 0;
  }

  input[type=range]::-moz-focus-outer {
    border: 0;
  }

  // Custom colours here
  input[type=range]::-webkit-slider-runnable-track {
    background: $theme-color;
  }

  input[type=range]::-webkit-slider-thumb {
    background: $theme-color;
  }

  input[type=range]:focus::-webkit-slider-runnable-track {
    background: $theme-color;
  }

  input[type=range]:focus::-webkit-slider-runnable-track {
    background: $theme-color;
  }

  input[type=range]::-moz-range-track {
    background: $theme-color;
  }

  input[type=range]::-moz-range-thumb {
    background: $theme-color;
  }

  input[type=range]::-ms-fill-lower {
    background: $theme-color;
  }

  input[type=range]::-ms-fill-upper {
    background: $theme-color;
  }

  input[type=range]::-moz-range-thumb {
    background: $theme-color;
  }

  input[type=range]::-moz-range-thumb {
    background: $theme-color;
  }

  input[type=range]::-ms-thumb {
    background: $theme-color;
  }

  input[type=range]:focus::-ms-fill-lower {
    background: $theme-color;
  }

  input[type=range]:focus::-ms-fill-upper {
    background: $theme-color;
  }
}

section.range-slider {
  @include range-slider(100%, auto, 30px, #F1EFEF, #413F41, left, 30px, 14px, blue);

  &--demographics {
    @include range-slider(100%, auto, 30px, #F1EFEF, #413F41, left, 30px, 14px, #29B5BA);
  }

  &--market_fundamentals {
    @include range-slider(100%, auto, 30px, #F1EFEF, #413F41, left, 30px, 14px, #29B5BA);
  }

  &--economics {
    @include range-slider(100%, auto, 30px, #F1EFEF, #413F41, left, 30px, 14px, #6AC6F1);
  }

  &--location_quality {
    @include range-slider(100%, auto, 30px, #F1EFEF, #413F41, left, 30px, 14px, #6AC6F1);
  }

  &--connectivity {
    @include range-slider(100%, auto, 30px, #F1EFEF, #413F41, left, 30px, 14px, #F29131);
  }

  &--innovation {
    @include range-slider(100%, auto, 30px, #F1EFEF, #413F41, left, 30px, 14px, #A44993);
  }
}

input[type=range] {
  width: 100%;
  margin: 13.5px 0;
  background-color: transparent;
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  border: 0;
  width: 100%;
  height: 3px;
  cursor: pointer;
}

input[type=range]::-webkit-slider-thumb {
  margin-top: -13.5px;
  width: 30px;
  height: 30px;
  border: 5px solid #ffffff;
  border-radius: 15px;
  cursor: pointer;
  -webkit-appearance: none;
}

input[type=range]::-moz-range-track {
  border: 0;
  width: 100%;
  height: 3px;
  cursor: pointer;
  position: relative;
  z-index: -1;
}

input[type=range]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border: 5px solid #ffffff;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  z-index: 10;
}

input[type=range]::-ms-track {
  background: transparent;
  border-color: transparent;
  border-width: 13.5px 0;
  color: transparent;
  width: 100%;
  height: 3px;
  cursor: pointer;
}

input[type=range]::-ms-fill-lower {
  border: 0;
}

input[type=range]::-ms-fill-upper {
  border: 0;
}

input[type=range]::-ms-thumb {
  width: 30px;
  height: 30px;
  border: 5px solid #ffffff;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 0px;
  /*Needed to keep the Edge thumb centred*/
}

/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align:auto) {
  /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
  input[type=range] {
    margin: 0;
    /*Edge starts the margin from the thumb, not the track as other browsers do*/
  }
}


</style>
