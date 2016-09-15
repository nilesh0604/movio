'use strict';

/**
 * @ngdoc function
 * @name movioApp.controller:SearchresultsCtrl
 * @description
 * # SearchresultsCtrl
 * Controller of the movioApp
 */
angular.module('movioApp')
  .controller('SearchresultsCtrl', function ($scope, $routeParams) {
    $scope.searchCriteria = $routeParams.searchCriteria;
  });
