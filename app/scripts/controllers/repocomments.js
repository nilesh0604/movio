'use strict';

/**
 * @ngdoc function
 * @name movioApp.controller:RepocommentsCtrl
 * @description
 * # RepocommentsCtrl
 * Controller of the movioApp
 */
angular.module('movioApp')
    .controller('RepocommentsCtrl', function($scope, $routeParams, gitRepoService, $rootScope) {
    	$scope.repoName = $routeParams.repoName;
    	$scope.repoOwner = $routeParams.repoOwner;
    	$scope.repoComments = [];
    	$scope.loading = false;
        $scope.reactions = [];

        function renderRepoComments(response) {
            $scope.repoComments = response;
            $scope.loading = false;
        }

        function getRepoComments() {
        	$scope.loading = true;
            gitRepoService.getPullsReactions($scope.repoName, $scope.repoOwner);

        }

        $rootScope.$on('reactionsUpdated', function(event, arg){
            $scope.loading = false;
            $scope.reactions = arg;
            console.log(arg);
        })

        getRepoComments();

    });
