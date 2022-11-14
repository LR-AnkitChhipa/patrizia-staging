import AuthService from '@/services/auth-service'

export default function ({ store, redirect, app }) {
  // If the user is not authenticated
  if (!AuthService.isUserLoggedin(app)) {
    return redirect('/login')
  }
}
