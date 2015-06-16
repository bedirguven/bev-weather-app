'use strict';

/* Controllers */

angular.module('cicekSepetiweatherSimulationApp.controllers', ["angucomplete-alt"])

  // Controller for "open weather map" api data search
  .controller('OpenWeatherCtrl',
    ['$scope','$http','weatherInformationMap','weatherLocations',
      function($scope,$http,weatherInformationMap,weatherLocations) {


    $scope.message = '';
    $scope.hasState = '';
    $scope.dayNumber = [1,2,3];
    $scope.day1Hide = false;
    $scope.day2Hide = false;
    $scope.day3Hide = false;


    $http.get('js/turkishCities.json').
      success(function(data, status, headers, config) {
        $scope.countries = data;
        console.log(data[19].name);
      }).
      error(function(data, status, headers, config) {
        $scope.message = 'Parse exception';
      });

    
    // Expose example locations to $scope
    $scope.weatherLocations = weatherLocations;
    
    $scope.iconBaseUrl = 'http://openweathermap.org/img/w/';

    // On initialization load data for first example entry
    $scope.forecast = weatherInformationMap.queryForecastDaily({
      location: weatherLocations[ 0 ]
    });



    // Get forecast data for location as given in $scope.location
    $scope.getForecastByLocation = function() {

      if ($scope.location == '' || $scope.location == undefined) {
        $scope.hasState = 'has-warning';
        $scope.message = 'Please provide a location';
        return;
      }

      $scope.hasState = 'has-success';

      $scope.forecast = weatherInformationMap.queryForecastDaily({
        location: $scope.location,
        cnt: $scope.number
      });
    };

    $scope.addLocation = function(){
      if ($scope.weatherLocations.length < 5) {
        $scope.weatherLocations.push($scope.location.title);
      }else{
        $scope.message = 'En fazla 5 şehir eklenebilir.';
      }
      
    };

    // Set $scope.location and execute search on API
    $scope.setLocation = function(loc) {
      $scope.location = loc;
      $scope.getForecastByLocation();
    };

    $scope.setDayNumber = function(number){
     $scope.number = number;
     $scope.dayHideOrShow(number);
      $scope.getForecastByLocation();
    };

    $scope.dayHideOrShow = function(number){
      if (number == 1) {
        $scope.day1Hide = false;
        $scope.day2Hide = true;
        $scope.day3Hide = true;
      }else if (number == 2) {
        $scope.day1Hide = false;
        $scope.day2Hide = false;
        $scope.day3Hide = true;
      }else{
        $scope.day1Hide = false;
        $scope.day2Hide = false;
        $scope.day3Hide = false;
      }
    }

    // Get icon image url
    $scope.getIconImageUrl = function(iconName) {
      return (iconName ? $scope.iconBaseUrl + iconName + '.png' : '');
    };

  }])
