import AuthService from "@/services/auth-service";

export default function ({route, next, redirect, app, store}) {
  const isLoggedIn = AuthService.isUserLoggedin(app)

  const protectedRoutes = [
    '/amenities-magnet',
    '/spatio-dynamic-analysis',
    '/city-index',
  ]
  if (
    protectedRoutes.indexOf(route.path) >= 0
    &&
    !isLoggedIn
  ) {
    return redirect('/login')
  }
  return next
}
