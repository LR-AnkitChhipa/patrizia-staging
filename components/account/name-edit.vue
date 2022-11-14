<template>
  <div class="nameupdate">
    <div class="nameupdate__content">
      <div class="nameupdate__content__form-details">
        <p class="mb-5">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        </p>
        <div class="nameupdate__content__form-details__form">
          <div class="box__text">
            <ValidationObserver ref="nameUpdate">
              <form @submit.prevent="onUpdate">
                <div class="form-row flex-wrap">
                  <div class="item col item--one mb-3">
                    <ValidationProvider v-slot="{ classes, errors }" :bails="false" name="title" rules="required">
                      <label :class="classes" for="title">Title</label>
                      <br>
                      <select-wrapper>
                        <select id="title" v-model="title" :class="classes" name="title" class="form-control">
                          <option v-for="option in options" :key="option.text" :value="option.value" :disabled="option.disable">
                            {{ option.text }}
                          </option>
                        </select>
                      </select-wrapper>
                      <span v-if="errors[0]">
                        <div class="error-box">
                          <img src="@/assets/img/error-icon-form.png" alt="">
                          <p>{{ errors[0] }}</p>
                        </div>
                      </span>
                    </ValidationProvider>
                  </div>
                  <div class="item col item--two mb-3">
                    <ValidationProvider v-slot="{ classes, errors }" :bails="false" name="first_name" rules="required">
                      <label :class="classes" for="first_name">First name</label>
                      <input
                        id="first_name"
                        v-model="first_name"
                        name="first_name"
                        type="text"
                        class="form-control"
                        :class="classes"
                        placeholder="First name"
                      >
                      <span v-if="errors[0]">
                        <div class="error-box">
                          <img src="@/assets/img/error-icon-form.png" alt="">
                          <p>{{ errors[0] }}</p>
                        </div>
                      </span>
                    </ValidationProvider>
                  </div>
                  <div class="item col item--three mb-3">
                    <ValidationProvider v-slot="{ classes, errors }" :bails="false" name="last_name" rules="required">
                      <label :class="classes" for="last_name">Surname</label>
                      <input
                        id="last_name"
                        v-model="last_name"
                        name="last_name"
                        type="text"
                        class="form-control"
                        :class="classes"
                        placeholder="Surname"
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
// import axios from 'axios'
// import Vuex from 'vuex'
import { ValidationProvider, extend, ValidationObserver, configure } from 'vee-validate'
import { required, alpha } from 'vee-validate/dist/rules'
import { mapState } from 'vuex'
import FormButton from '@/components/buttons/form-button'
import TextLink from '@/components/text-link'
import SelectWrapper from "@/components/inputs/select-wrapper";

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('alpha', {
  ...alpha,
  message: 'only alphabetic characters (without space)'
})

configure({
  classes: {
    valid: 'is-valid',
    invalid: ['is-invalid', 'text-danger']
  }
})

export default {
  name: 'Nameupdate',
  components: {SelectWrapper, FormButton, TextLink, ValidationProvider, ValidationObserver },
  data () {
    return {
      formData: this.$store.state.userdata,
      options: [
        { text: 'Select', value: '', disable: true },
        { text: 'Mr', value: 'Mr' },
        { text: 'Mrs', value: 'Mrs' },
        { text: 'Miss', value: 'Miss' },
        { text: 'Ms', value: 'Ms' },
        { text: 'Dr', value: 'Dr' }
      ],
      busy: false
    }
  },
  computed: {
    ...mapState(['userdata']),
    title: {
      set (title) {
        this.$store.commit('SET_USER_PROPERTY', { title })
      },
      get () {
        return this.userdata.title
      }
    },
    first_name: {
      // eslint-disable-next-line camelcase
      set (first_name) {
        this.$store.commit('SET_USER_PROPERTY', { first_name })
      },
      get () {
        return this.userdata.first_name
      }
    },
    last_name: {
      // eslint-disable-next-line camelcase
      set (last_name) {
        this.$store.commit('SET_USER_PROPERTY', { last_name })
      },
      get () {
        return this.userdata.last_name
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
        vm.$emit('updatedBox')

        // Wait until the models are updated in the UI
        vm.$nextTick(() => {
          vm.$refs.nameUpdate.reset()
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
