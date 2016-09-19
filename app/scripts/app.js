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
    'ngRoute',
    'satellizer'
  ])
  .config(function ($routeProvider, $authProvider) {
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
      .when('/repoComments/:repoName/:repoOwner', {
        templateUrl: 'views/repocomments.html',
        controller: 'RepocommentsCtrl',
        controllerAs: 'repoComments'
      })
      .otherwise({
        redirectTo: '/'
      });

    $authProvider.github({
      clientId: 'c283f9efeb5d0328393e',
      clientSecret: '71dfe43e177fdcdb39cc77772233fa49b252f23a'
    });
  });
