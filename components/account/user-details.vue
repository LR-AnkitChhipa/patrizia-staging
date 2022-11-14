<template>
  <div class="userdetails">
    <div class="userdetails__content">
      <div class="userdetails__content__form-details">
        <div class="userdetails__content__form-details__box">
          <div class="box__text">
            <h4>{{ boxes[0].title }}</h4>
            <b-skeleton v-if="!userData" animation="wave" width="100%" />
            <p v-if="userData">
              {{ userData.title }}
              {{ userData.first_name }}
              {{ userData.last_name }}
            </p>
          </div>
          <div class="box__button" @click="$emit('editButtonClicked', {link: boxes[0].link })">
            <form-button button-size="regular" button-style="primary primary--style1" label="EDIT" />
          </div>
        </div>
        <div class="userdetails__content__form-details__box">
          <div class="box__text">
            <h4>{{ boxes[1].title }}</h4>
            <b-skeleton v-if="!userData" animation="wave" width="100%" />
            <p v-if="userData">
              {{ userData.email }}
            </p>
          </div>
          <div class="box__button" @click="$emit('editButtonClicked', {link: boxes[1].link })">
            <form-button button-size="regular" button-style="primary primary--style1" label="EDIT" />
          </div>
        </div>
        <div class="userdetails__content__form-details__box">
          <div class="box__text">
            <h4>{{ boxes[2].title }}</h4>
            <b-skeleton v-if="!userData" animation="wave" width="100%" />
            <p v-if="userData">
              {{ boxes[2].text }}
            </p>
          </div>
          <div class="box__button" @click="$emit('editButtonClicked', {link: boxes[2].link })">
            <form-button button-size="regular" button-style="primary primary--style1" label="EDIT" />
          </div>
        </div>
        <div class="userdetails__content__form-details__box">
          <div class="box__text">
            <h4>{{ boxes[3].title }}</h4>
            <b-skeleton v-if="!userData" animation="wave" width="100%" />
            <p v-if="userData">
              {{ userData.company }}
            </p>
          </div>
          <div class="box__button" @click="$emit('editButtonClicked', {link: boxes[3].link })">
            <form-button button-size="regular" button-style="primary primary--style1" label="EDIT" />
          </div>
        </div>
        <div class="userdetails__content__form-details__box">
          <div class="box__text">
            <h4>{{ boxes[4].title }}</h4>
            <p>
              Cookie and Newsletter settings
            </p>
          </div>
          <div class="box__button" @click="$emit('editButtonClicked', {link: boxes[4].link })">
            <form-button button-size="regular" button-style="primary primary--style1" label="EDIT" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ButtonLink from '@/components/buttons/button-link'
import FormButton from '@/components/buttons/form-button'
import AuthService from '@/services/auth-service'

export default {
  name: 'Userdetails',
  components: { ButtonLink, FormButton },
  data () {
    return {
      boxes: [
        { title: 'Name', text: 'Mr Andrew Didenko', link: 'name-edit' },
        { title: 'Email', text: 'andrew.d@chaosdesign.com', link: 'email-edit' },
        { title: 'Password', text: '••••••••••••', link: 'password-edit' },
        { title: 'Company', text: 'Chaos Design Ltd', link: 'company-edit' },
        { title: 'Privacy & Subscriptions', text: '', link: 'privacy-edit' }
      ],
      httpResponse: null
    }
  },
  computed: {
    userData() {
      return this.$store.state.userdata
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
