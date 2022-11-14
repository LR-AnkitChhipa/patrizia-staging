<template>
  <section class="amenities-magnet-maps">
    <b-container>
      <b-row>
        <div class="col amenities-magnet-maps__heading">
          <h3>The following maps show the PATRIZIA Amenities Magnet scores for Manchester and Dublin.</h3>
        </div>
        <article class="amenities-magnet-maps__contentrow">
          <b-col cols="12" md="6">
            <img src="~@/assets/img/manchester-map.svg" alt="manchester-map" class="img-fluid">
            <p class="sources">Sources: PATRIZIA with R-studio via Google API, ArcGIS, EC2 in AWS.</p>
          </b-col>
          <b-col cols="12" md="6">
            <h4>Manchester</h4>
            <p>England’s ‘second city’ has long shed its image as a smoke-covered industrial sprawl. The PATRIZIA Amenities Magnet shows Manchester has become very attractive given the number and variety of positive amenities. Of note are areas in the northern part, such as Bolton, Bury and Rochdale, which have the same degree of attractiveness as the city centre. In contrast, the southern areas show a lower score, which indicates fewer amenities and considerably less convenient accessibility.</p>
          </b-col>
        </article>
        <article class="amenities-magnet-maps__contentrow">
          <b-col cols="12" md="6">
            <img src="~@/assets/img/dublin-map.svg" alt="manchester-map" class="img-fluid">
            <p class="sources">Sources: PATRIZIA with R-studio via Google API, ArcGIS, EC2 in AWS.</p>
          </b-col>
          <b-col cols="12" md="6">
            <h4>Dublin</h4>
            <p>The Capital of the Celtic Tiger has a diversified spatial attractiveness. The PATRIZIA Amenities Magnet shows that the centre of the city has high scores, as does Dún Laoghaire on the coast and some selected northern areas. The Magnet also identifies transitional areas, which need to be analysed in more detail from a development perspective. Locations between two high-quality centres, for example, could signal future investment opportunities.</p>
          </b-col>
        </article>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  name: "amenities-magnet-maps"
}
</script>

<style lang="scss">
.amenities-magnet-maps{
  margin-bottom: 50px;

  &__heading{
    margin-top: 40px;
    margin-bottom: 30px;
    max-width: 70%;
    @include respond-below(sm) {
      max-width: 100%;
    }
  }

  &__contentrow{
    display: flex;
    align-items: flex-start;
    margin-bottom: 40px;
    flex-wrap: wrap;

    img{
      width: 100%;
      height: auto;
      margin-bottom: 5px;
    }
    p{

      &.sources{
        margin-bottom: 0;
        font-size: 14px;
        line-height: 17px;
        color: #9C8A8F;
      }

      &:last-child{
        margin-bottom: 0;
      }

    }

    h4{
      margin-bottom: 15px;
      margin-top: 50px;
      @include respond-below(sm) {
        margin-top: 20px;
      }
    }
  }
}
</style>
