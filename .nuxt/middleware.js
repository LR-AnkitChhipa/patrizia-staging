const middleware = {}

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['authroute'] = require('../middleware/authroute.js')
middleware['authroute'] = middleware['authroute'].default || middleware['authroute']

middleware['breadcrumb'] = require('../middleware/breadcrumb.js')
middleware['breadcrumb'] = middleware['breadcrumb'].default || middleware['breadcrumb']

middleware['stagingauth'] = require('../middleware/stagingauth.js')
middleware['stagingauth'] = middleware['stagingauth'].default || middleware['stagingauth']

export default middleware
