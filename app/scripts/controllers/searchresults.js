'use strict';

/**
 * @ngdoc function
 * @name movioApp.controller:SearchresultsCtrl
 * @description
 * # SearchresultsCtrl
 * Controller of the movioApp
 */
angular.module('movioApp')
  .controller('SearchresultsCtrl', function ($scope, $routeParams, gitRepoService) {
    $scope.searchCriteria = $routeParams.searchCriteria;
    $scope.searchResults = [];
    $scope.loading = false;

    function renderSearchResult (response) {
    	$scope.searchResults = response.items;
    	$scope.loading = false;
    }

    function searchGitRepo () {
    	$scope.loading = true;
    	gitRepoService.searchGitRepo($scope.searchCriteria).then(function(response){
    		renderSearchResult(response);
    	});
    }

    searchGitRepo();
  });
