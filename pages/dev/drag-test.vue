<template>
  <client-only>
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
        </div>
        <div class="range-filter__ranges">
          CONTENT
        </div>
      </section>
    </draggable>
  </client-only>
</template>

<script>
import Draggable from "@/components/draggable";
export default {
  name: "drag-test",
  components: {Draggable}
}
</script>

<style scoped>

</style>
