import R from 'ramda'

export let Router = {
  //website
  index: '/',
  authenticate: '/authenticate',
  profile: '/profile',

  //security
  signin: '/signin',
  signup: '/signup',
  logout: '/logout',

  //helpers
  withQueryString(route, params) {
    let queryString = '';
    if ( params ) {
      const buildQueryString = (query, key) => [query, key, '=', params[key],'&'].join('');
      queryString = R.reduce(buildQueryString, '?', R.keys(params)).slice(0,-1);
    }
    return route + queryString;
  }
}
