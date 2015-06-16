'use strict';

// Declare app level module which depends on filters, and services
angular.module('cicekSepetiweatherSimulationApp', [
  'ngRoute',
  'cicekSepetiweatherSimulationApp.filters',
  'cicekSepetiweatherSimulationApp.services',
  'cicekSepetiweatherSimulationApp.directives',
  'cicekSepetiweatherSimulationApp.controllers',
  "iso-3166-country-codes"
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dailyForecast', {templateUrl: 'partials/dailyForecast.html', controller: 'OpenWeatherCtrl'});
}]);
