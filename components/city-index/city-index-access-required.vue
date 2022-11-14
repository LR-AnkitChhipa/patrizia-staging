<template>
  <section class="city-index-access-required">
    <b-container>
      <b-row>
        <b-col>
          <div class="city-index-access-required__chart">
            <div class="city-index-access-required__chart__navigation">
              <charts-navigation />
            </div>
            <div class="city-index-access-required__chart__placeholder">
              <div v-if="!(accountAwaitingApproval)" class="city-index-access-required__chart__placeholder__register">
                <b-row>
                  <b-col class="city-index-access-required__chart__placeholder__register__content">
                    <p class="subline--with-dash subline">
                      Access required
                    </p>
                    <p class="h2">
                      Lorem ipsum dolor sit amet, consetetur
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                      ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                      dolores et
                    </p>
                    <button-link url="login" label="Apply for access" button-style="pale" />
                  </b-col>
                  <b-col class="city-index-access-required__chart__placeholder__register__form">
                    <login-form />
                  </b-col>
                </b-row>
              </div>
              <div v-else class="city-index-access-required__chart__placeholder__register">
                <b-row>
                  <b-col class="city-index-access-required__chart__placeholder__register__content">
                    <p class="subline--with-dash subline">
                      Access required
                    </p>
                    <p class="h2">
                      Your account is pending approval
                    </p>
                    <p>We are reviewing your access application. When we have approved your application you will receive a welcome email.</p>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import ChartsNavigation from '@/components/charts/charts-navigation'
import ButtonLink from '@/components/buttons/button-link'
import TextLink from '@/components/text-link'
import AuthService from '@/services/auth-service'
import LoginForm from '~/components/login/login-form'

export default {
  name: 'CityIndexAccessRequired',
  components: { TextLink, ButtonLink, ChartsNavigation, LoginForm },
  data () {
    return {
      accountAwaitingApproval: false
    }
  },
  async mounted () {
    const isLoggedIn = await AuthService.isUserLoggedin(this)
    const isApproved = await AuthService.isUserApproved(this)
    if (isLoggedIn && !isApproved) {
      this.accountAwaitingApproval = true
    }
  }
}
</script>

<style lang="scss">
.city-index-access-required {
  &__chart {
    box-shadow: 5px 20px 40px rgba(34, 10, 18, 0.1);
    margin-top: 50px;
    margin-bottom: 77px;

    &__navigation {
      padding: 1px 32px 0;
    }

    &__placeholder {
      height: 1042px;
      display: flex;
      align-items: center;
      background: {
        image: url("/images/map-placeholder.png");
        position: center;
        repeat: no-repeat;
        size: cover;
      };

      &__register {
        margin: 0 91px;
        background-color: #802437;
        width: 100%;
        padding: 60px 62px;

        &__content {
          margin-top: 40px;
          padding-left: 30px;

          .h2, p {
            color: white;
          }

          .subline {
            margin-bottom: 30px;
          }

          .h2 {
            margin-bottom: 40px;
          }

          p {
            margin-bottom: 35px;
          }

        }

        &__form {
          &__header {
            padding: 27px 30px 32px;
            background: {
              image: url("~@/assets/img/login-header-bar.jpg");
              repeat: no-repeat;
              size: cover;
              position: center;
            };

            .subline, .h2 {
              color: white;
            }

            .h2 {
              margin-bottom: 0;
            }
          }

          &__content {
            background-color: white;
            box-shadow: 5px 20px 40px rgba(34, 10, 18, 0.1);

            padding: 28px;

            fieldset {
              label {
                display: block;
                color: #802437;
                text-transform: uppercase;
                font-family: "Corporate S Pro";
                font-size: 14px;
                letter-spacing: 0.071em;
                margin-bottom: 12px;
              }

              input {
                width: 100%;
                border: 1px solid #E1DBDD;
                color: #9C8A8F;
                padding: 10px 20px;
                margin-bottom: 17px;
                font-family: "Corporate S Pro";
                font-size: 14px;
                letter-spacing: 0.071em;
              }

              &.actions {
                display: flex;
                justify-content: space-between;
                margin-top: 12px;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
