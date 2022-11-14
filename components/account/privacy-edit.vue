<template>
  <div class="nameupdate">
    <div class="nameupdate__content">
      <div class="nameupdate__content__form-details">
        <p class="mb-5">
          {{ getLabel('account_details_edit_privacy_introduction') }}
        </p>
        <div class="nameupdate__content__form-details__form nameupdate__content__form-details__form--privacy">
          <div class="box__text">
            <form @submit.prevent="onUpdate">
              <div class="form-row flex-wrap">
                <div class="item col item--three mb-3 d-flex justify-content-between">
                  <div>
                    <label>{{ getLabel('account_details_edit_privacy_newsletter_section_title') }}</label>
                    <p>{{ getLabel('account_details_edit_privacy_newsletter_section_content') }}</p>
                  </div>
                  <div>
                    <toggle-button :initial-value="subscribedToNewsletter ? true : false" class="privacy-edit__toggle"
                                   @toggle="updateSetting('newsletter', $event)"/>
                  </div>
                </div>
              </div>
              <div class="form-row flex-wrap">
                <div class="item col item--three mb-3 d-flex justify-content-between">
                  <div>
                    <label>{{ getLabel('account_details_edit_privacy_monitoring_section_title') }}</label>
                    <p>{{ getLabel('account_details_edit_privacy_monitoring_section_content') }}</p>
                  </div>
                  <div>
                    <toggle-button :initial-value="agreedMonitoring ? true : false" class="privacy-edit__toggle"
                                   @toggle="updateSetting('monitoring', $event)"/>
                  </div>
                </div>
              </div>
              <div class="box__button">
                  <span @click="onCancel">
                    <text-link text="Cancel" link-style="primary"/>
                  </span>
                <b-overlay :show="busy" roundedopacity="0.6" spinner-smallspinner-variant="primary"
                           class="d-inline-block">
                  <form-button btntype="submit" button-size="regular" button-style="primary primary--style1"
                               label="UPDATE"/>
                </b-overlay>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import FormButton from '@/components/buttons/form-button'
import TextLink from '@/components/text-link'
import ToggleButton from "@/components/inputs/toggle-button";

export default {
  name: 'PrivacyEdit',
  components: {ToggleButton, FormButton, TextLink},
  data() {
    return {
      formData: this.$store.state.userdata,
      busy: false
    }
  },
  computed: {
    ...mapState(['userdata']),
    agreedMonitoring: {
      set(agreed_monitoring) {
        this.$store.commit('SET_USER_PROPERTY', {agreed_monitoring})
      },
      get() {
        return this.userdata.agreed_monitoring
      }
    },
    subscribedToNewsletter: {
      set(subscribed_to_newsletter) {
        this.$store.commit('SET_USER_PROPERTY', {subscribed_to_newsletter})
      },
      get() {
        return this.userdata.subscribed_to_newsletter
      }
    }
  },
  methods: {
    onUpdate() {
      const vm = this
      // Resetting Values
      vm.$emit('updateButtonClicked')

      // Wait until the models are updated in the UI
      vm.$nextTick(() => {
        this.$router.push('/user-account')
      })
    },
    onCancel() {
      const vm = this
      vm.$emit('cancelButton')
    },
    /**
     * Update a user preference
     * @param settingName
     * @param value
     */
    updateSetting(settingName, value) {
      switch (settingName) {
        case 'monitoring':
          this.agreedMonitoring = value
          break
        case 'newsletter':
          this.subscribedToNewsletter = value
          break
      }
    }
  }
}
</script>

<style lang="scss">
.privacy-edit {
  &__toggle {
    .toggle-button {
      &__toggle {
        &:before {
          display: none;
        }

        &:after {
          background-color: #F0EDEE;
        }

        &--on {

          &:after {
            background-color: #01A64B;
          }
        }
      }
    }
  }
}
</style>
