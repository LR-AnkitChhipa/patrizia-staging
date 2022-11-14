<template>
    <div class="typography" :id="slugify(slice.primary.navigation_title)">
      <prismic-rich-text :field="slice.primary.typography_list" />
    </div>
</template>

<script>
export default {
    name: 'Articletyepography',
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

<style>

</style>
