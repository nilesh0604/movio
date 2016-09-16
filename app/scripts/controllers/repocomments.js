'use strict';

/**
 * @ngdoc function
 * @name movioApp.controller:RepocommentsCtrl
 * @description
 * # RepocommentsCtrl
 * Controller of the movioApp
 */
angular.module('movioApp')
    .controller('RepocommentsCtrl', function($scope, $routeParams, gitRepoService) {
    	$scope.repoName = $routeParams.repoName;
    	$scope.repoOwner = $routeParams.repoOwner;
    	$scope.repoComments = [];
    	$scope.loading = false;

        function renderRepoComments(response) {
            $scope.repoComments = response;
            $scope.loading = false;
        }


        function getRepoComments() {
        	$scope.loading = true;
            gitRepoService.getRepoComments($scope.repoName, $scope.repoOwner).then(function(response) {
                renderRepoComments(response);
            });
        }

        getRepoComments();

    });
