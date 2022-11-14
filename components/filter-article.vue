<template>
  <b-container id="Filterbox">
    <div class="inner">
      <select-wrapper>
        <select class="form-control" v-model="selectedArticleCategory">
          <option v-bind:value="null">Article Category</option>
          <option v-for="(articleCategory, index) in articleCategoryFilters" :key="index">
            {{ articleCategory }}
          </option>
        </select>
      </select-wrapper>
      <select-wrapper>
        <select class="form-control" v-model="selectedArticleType">
          <option v-bind:value="null">Article Type</option>
          <option v-for="(articleType, index) in articleTypeFilters" :key="index">
            {{ articleType }}
          </option>
        </select>
      </select-wrapper>
    </div>
  </b-container>
</template>

<script>
import SelectWrapper from "@/components/inputs/select-wrapper";
export default {
  name: 'Filterbox',
  components: {SelectWrapper},
  data () {
    return {
      selectedArticleCategory: null,
      selectedArticleType: null,
      articleCategoryFilters: [
        'Insight',
        'Liveability',
        'Investment',
        'Innovations',
        'Trends'
      ],
      articleTypeFilters: [
        'Article',
        'Press Release',
        'Video'
      ]
    }
  },
  watch: {
    selectedArticleCategory(value) {
      this.$emit('categoryFilterUpdated', value)
    },
    selectedArticleType(value) {
      this.$emit('typeFilterUpdated', value)
    },
  }
}
</script>

<style lang="scss" scoped>
#Filterbox{
    .inner{
        margin: 3rem auto;
        text-align: right;
        .box-select{
            margin-left: 1rem;
            @include respond-below(sm){
              margin: auto;
              margin-bottom: 1rem;
              width: 100%;
            }
        }
    }

}
</style>
