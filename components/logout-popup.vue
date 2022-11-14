<template>
  <b-modal id="logoutbox" class="modal" centered hide-header hide-footer>
    <b-row class="m-0">
      <b-col class="item">
        <h4>{{ getLabel('logout_popup_title') }}</h4>
        <p>{{ getLabel('logout_popup_content') }}</p>
        <div class="btns">
          <span @click.prevent="logout">
            <button-link button-size="regular" button-style="primary primary--style1" :label="getLabel('log_out')"/>
          </span>
          <span @click.prevent="close">
            <text-link url="#" :text="getLabel('cancel')" link-style="primary" />
          </span>
        </div>
      </b-col>
      <b-col cols="12" sm="5" class="item">
        <h4>{{ getLabel('logout_popup_expert_help_title') }}</h4>
        <p>{{ getLabel('logout_popup_expert_help_content') }}</p>
        <button-link button-size="regular" button-style="primary primary--style1" :label="getLabel('contact_us')" :prismic-link-object="{url: 'mailto:citypulse@patrizia.ag', title:'Contact Us', link_type: 'Web'} "/>
      </b-col>
    </b-row>
    <a @click="$bvModal.hide('logoutbox')" href="#" class="closebtn">
      <img src="@/assets/img/logout-cancel-btn.svg" alt="">
    </a>
  </b-modal>
</template>

<script>
import AuthService from '@/services/auth-service'
import ButtonLink from '@/components/buttons/button-link'
import TextLink from '@/components/text-link'

export default {
  name: 'Logoutbox',
  components: {ButtonLink, TextLink},
  methods: {
    /**
     * Close the modal window
     */
    close() {
      this.$bvModal.hide('logoutbox')
    },
    /**
     * Log the user out
     */
    logout() {
      AuthService.logout(this)
      this.$store.commit('setAuth', null)
      this.$bvModal.hide('logoutbox')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
#logoutbox.modal {
  .modal-dialog {
    max-width: 950px !important;

    .modal-content {
      border-radius: 0;

      .modal-body {
        position: relative;
        padding: 0;

        .item {
          padding: 40px;

          &:last-child {
            background: #F0ECED;
            max-width: 398px;
            flex: 0 0 398px;
          }

          h4 {
            margin-bottom: 20px;
          }

          p {
            margin-bottom: 45px;
          }

          .btns {
            display: flex;
            align-items: center;

            a.textlink {
              margin-left: 20px;
              margin-bottom: 10px;
            }
          }
        }

        a.closebtn {
          position: absolute;
          top: 20px;
          right: 20px;
        }
      }
    }
  }
}
</style>
