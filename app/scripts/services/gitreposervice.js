'use strict';

/**
 * @ngdoc service
 * @name movioApp.gitRepoService
 * @description
 * # gitRepoService
 * Service in the movioApp.
 */
angular.module('movioApp')
    .service('gitRepoService', function($http, $q) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        function searchGitRepo(searchCriteria) {
            var request = $http({
                method: 'get',
                url: 'https://api.github.com/search/repositories?q=' + searchCriteria
            });

            return (request.then(handleSuccess, handleError));
        }

        function getRepoComments (repoName, repoOwner) {
        	var request = $http({
                method: 'get',
                url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/pulls/comments'
            });

            return (request.then(handleSuccess, handleError));
        }

        function handleSuccess(response) {
            return (response.data);
        }

        function handleError(response) {
            if (!angular.isObject(response.data) || !response.data.message) {
                return ($q.reject('An unknown error occured.'));
            }
        }

        return ({ 
        	searchGitRepo: searchGitRepo,
        	getRepoComments: getRepoComments
        });
    });
