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
      .when('/searchResults/:searchCriteria', {
        templateUrl: 'views/searchresults.html',
        controller: 'SearchresultsCtrl',
        controllerAs: 'searchResults'
      })
      .when('/repoComments/:repoName/:repoOwner', {
        templateUrl: 'views/repocomments.html',
        controller: 'RepocommentsCtrl',
        controllerAs: 'repoComments'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
