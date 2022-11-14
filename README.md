# Patrizia Living Cities PWA App

## API Sanctum authentication notes 2020.10.20

How the authentication works:

###Dev
Must be running `yarn dev` and accessing the site via http://localhost:3000/.

The project use '@nuxtjs/proxy'
 to proxy requests to the laravel auth api. See the proxy section of the nuxt.config.js file

https://laravel.com/docs/8.x/sanctum#spa-authentication

Authentication makes a first request to /sanctum/csrf-cookie to get the XSRF-TOKEN cookie
Then on getting this, it posts  to /login with email and password, if successful, a 200 is returned from the server

Laravel API configuration
The SESSION_DOMAIN env var must be set to `.livingcities.patrizia.local` this allows the cookie to be set by the Vue app for use via the proxy

###Production
For production, set the SESSION_DOMAIN to .tld.com



## Service Worker notes - MW 2020.08.18

The service worker uses the Nuxt.js PWA modules service worker
which is built on top of Google's workbox project.

The service worker is configured in the nuxt.config.js file. The docs at https://pwa.nuxtjs.org/workbox
give some detail on the configuration options.

The configuration for this project is set up like so to cache a mock API and precache some 
content.

```json
workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://run.mocky.io/.*',
          handler: 'networkFirst',
          method: 'GET',
          strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
        },
        {
          urlPattern: 'https://fonts.gstatic.com/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
        },
      ],
      preCaching: [
        'https://run.mocky.io/v3/cad70fc9-7bd8-4504-aec2-ba328c62b889',
        'https://run.mocky.io/v3/83fdc91c-e2b5-4190-8022-6fb63bc0582a'
      ]
    }
```

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
