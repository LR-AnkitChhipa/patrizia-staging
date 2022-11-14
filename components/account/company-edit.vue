<template>
  <div class="nameupdate">
    <div class="nameupdate__content">
      <div class="nameupdate__content__form-details">
        <p class="mb-5">
          Current company name: <span>{{ formData.company }}</span>
        </p>
        <div class="nameupdate__content__form-details__form">
          <div class="box__text">
            <ValidationObserver ref="nameUpdate">
              <form @submit.prevent="onUpdate">
                <div class="form-row flex-wrap">
                  <div class="item col item--three mb-3">
                    <ValidationProvider v-slot="{ classes, errors }" :bails="false" name="company" rules="required">
                      <label :class="classes" for="company">NEW COMPANY NAME</label>
                      <input
                        id="company"
                        v-model="newCompany"
                        name="company"
                        type="text"
                        class="form-control"
                        :class="classes"
                        placeholder="Company name"
                      >
                      <span v-if="errors[0]">
                        <div class="error-box">
                          <img src="@/assets/img/error-icon-form.png" alt="">
                          <p>{{ errors[0] }}</p>
                        </div>
                      </span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="box__button">
                  <span @click="onCancel">
                    <text-link text="Cancel" link-style="primary" />
                  </span>
                  <b-overlay :show="busy" roundedopacity="0.6" spinner-smallspinner-variant="primary" class="d-inline-block">
                    <form-button btntype="submit" button-size="regular" button-style="primary primary--style1" label="UPDATE" />
                  </b-overlay>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver, configure } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { mapState } from 'vuex'
import FormButton from '@/components/buttons/form-button'
import TextLink from '@/components/text-link'

extend('required', {
  ...required,
  message: 'This field is required'
})

configure({
  classes: {
    valid: 'is-valid',
    invalid: ['is-invalid', 'errorborder', 'errortext']
  }
})

export default {
  name: 'Emailupdate',
  components: { FormButton, TextLink, ValidationProvider, ValidationObserver },
  data () {
    return {
      formData: this.$store.state.userdata,
      busy: false
    }
  },
  computed: {
    ...mapState(['userdata']),
    newCompany: {
      set (company) {
        this.$store.commit('SET_USER_PROPERTY', { company })
      },
      get () {
        return this.userdata.company
      }
    }
  },
  methods: {
    resetForm () {
      const self = this
      Object.keys(this.formData).forEach(function (key, index) {
        self.formData[key] = ''
      })
    },
    onUpdate () {
      this.$refs.nameUpdate.validate().then((success) => {
        if (!success) {
          return
        }

        const vm = this

        // Resetting Values
        // vm.resetForm()
        vm.$emit('updateButtonClicked')

        // Wait until the models are updated in the UI
        vm.$nextTick(() => {
          vm.$refs.nameUpdate.reset()
          this.$router.push('/user-account')
        })
      })
    },
    onCancel () {
      const vm = this
      vm.$emit('cancelButton')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
