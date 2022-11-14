<template>
  <b-container id="Filterbox">
    <b-row class="image-boxes">
      <b-col>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item arrow">
              <a class="page-link previous" href="#" aria-label="Previous">
                <span aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="5.044" height="9.567" viewBox="0 0 5.044 9.567">
                    <path
                      id="Path_2589"
                      data-name="Path 2589"
                      d="M0,0,4,4.449,0,8.9"
                      transform="translate(0.372 0.334)"
                      fill="none"
                      stroke="#D2C8CB"
                      stroke-width="2"
                    />
                  </svg>
                </span>
              </a>
            </li>
            <li class="page-item">
              <a class="page-link active" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item arrow">
              <a class="page-link next" href="#" aria-label="Next">
                <span aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="5.044" height="9.567" viewBox="0 0 5.044 9.567">
                    <path
                      id="Path_2589"
                      data-name="Path 2589"
                      d="M0,0,4,4.449,0,8.9"
                      transform="translate(0.372 0.334)"
                      fill="none"
                      stroke="#D2C8CB"
                      stroke-width="2"
                    />
                  </svg>

                </span>
              </a>
            </li>
          </ul>
        </nav>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Pagination'
}
</script>

<style scoped lang="scss">

// pagination css block
ul.pagination {
  margin-bottom: 3rem;

  .page-item {

    &:first-child {
      .page-link {
        margin-left: 0;
      }
    }

    .page-link {
      border-radius: 0;
      height: 40px;
      font-size: 14px;
      border-color: #D2C8CB;
      color: #D2C8CB;
      width: 40px;
      text-align: center;
      margin-left: 10px;
      line-height: 1.8;

      &:hover {
        box-shadow: none;
        background: none;
        border-color: #802437;
      }

      &:focus {
        box-shadow: none;
        outline: none;
        background: none;
      }

      &.active {
        border-color: #802437;
        border-color: #802437;
        color: #802437;
      }
    }

    &.arrow {
      .page-link {
        line-height: 1.5;

        svg {
          max-width: 100%;
          width: 15px;
          height: 13px;
        }

        &.previous {
          svg {
            transform: rotate(180deg);
          }
        }
      }
    }

  }
}
</style>
