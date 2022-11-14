import AuthService from '@/services/auth-service'

export default function ({ redirect, app }) {
  // If the user is not authenticated
  if (
    app.$cookies.get('basic_auth_logged_in') !== true
    &&
    process.env.VUE_APP_BASIC_AUTH_ENABLED === 'true'
  ) {
    return redirect('/auth')
  }
}
