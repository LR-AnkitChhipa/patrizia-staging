<template>
  <div class="dev-animated-pies">
    <about-factor-explanation-animated-pie
      :data="[15, 25, 25, 15, 10, 10]"
      :colours="['#29B5BA', '#51D5DB', '#7CDFE4', '#A8EAED', '#CFEFF1', '#F0F0F0']"
      cluster-name="demographics"
    />
    <about-factor-explanation-animated-pie
      :data="[50, 40, 10]"
      :colours="['#A44993', '#B66EA9', '#C892BF']"
      cluster-name="innovation"
    />
    <about-factor-explanation-animated-pie
      :data="[20, 25, 25, 30]"
      :colours="['#F29131', '#F4A759', '#F7BD83', '#FAD3AC']"
      cluster-name="connectivity"
    />
    <about-factor-explanation-animated-pie
      :data="[40, 10, 25, 25]"
      :colours="['#0AC6F1', '#89D2F5', '#A6DDF7', '#C3E8F9']"
      cluster-name="economics"
    />
  </div>
</template>

<script>
import AboutFactorExplanationAnimatedPie from "@/components/about/about-factor-explanation-animated-pie";

export default {
  name: "animated-pie",
  components: {AboutFactorExplanationAnimatedPie}
}
</script>

<style lang="scss">
.dev-animated-pies {

  > div {
    //margin-top: 80vh;
  }
}

</style>
