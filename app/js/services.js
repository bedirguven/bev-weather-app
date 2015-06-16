'use strict';

/* Services */

angular.module('cicekSepetiweatherSimulationApp.services', ['ngResource'])

  //
  // Define a standard list of "example locations"
  //
  .value('weatherLocations',[])
  // Storm "Xaver" special locations
  //
  //
  // Register service for openweathermap.com
  //
  // - Inject $resource from angular-resource context
  // - Generate custom resource object able to query open weather map api with custom parameters
  // -
  // - Tricky: Avoid needing a server/proxy by forcing a JSONP request: Angular handles callback
  //   if JSON_CALLBACK is set as function name parameter in which response should be wrapped
  //   (subject to be made configurable through service initialization so that server mode using
  //    "normal" json api is supported as well)
  //
  .factory('weatherInformationMap', function($resource) {

    // API key is currently unused (work either with or without key)
    var apiKey = 'f794dbd40c6c420bd989030dec1f724e';
    var apiBaseUrl = 'http://api.openweathermap.org/data/2.5/';
    var cnt = '';

    return $resource(apiBaseUrl + ':path/:subPath?q=:location&lang=:lang',
      {
//        APPID: apiKey,
        mode: 'jsonp',
        callback: 'JSON_CALLBACK',
        units: 'metric',
        lang: 'tr'
      },
      {
        
        queryForecast: {
          method: 'JSONP',
          params: {
            path: 'forecast'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        },
        queryForecastDaily: {
          method: 'JSONP',
          params: {
            path: 'forecast',
            subPath: 'daily',
            cnt: cnt,
            lang:'tr'
          },
          isArray: false,
          headers: {
            'x-api-key': apiKey
          }
        }
      }
    )
  });