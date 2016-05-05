import R from 'ramda'

export let Router = {
  index: '/',
  authenticate: '/authenticate',
  signin: '/signin',
  signup: '/signup',
  'contact': '/contact',
  'travel':'/travel',
  'listTrip':'/trip',
  'tripview':'/tripview',

  withQueryString(route, params) {
    let queryString = '';
    if ( params ) {
      const buildQueryString = (query, key) => [query, key, '=', params[key],'&'].join('');
      queryString = R.reduce(buildQueryString, '?', R.keys(params)).slice(0,-1);
    }
    return route + queryString;
  }

}
