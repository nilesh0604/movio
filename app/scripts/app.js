'use strict';

/**
 * @ngdoc overview
 * @name movioApp
 * @description
 * # movioApp
 *
 * Main module of the application.
 */
angular
  .module('movioApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/searchResults/:searchCriteria', {
        templateUrl: 'views/searchresults.html',
        controller: 'SearchresultsCtrl',
        controllerAs: 'searchResults'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
