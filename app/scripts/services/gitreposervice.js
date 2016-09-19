'use strict';

/**
 * @ngdoc service
 * @name movioApp.gitRepoService
 * @description
 * # gitRepoService
 * Service in the movioApp.
 */
angular.module('movioApp')
    .service('gitRepoService', function($http, $q, $rootScope) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        var pullsId = [];
        var commentsId = [];
        var pullsArrayIndex = 0;
        var commentsArrayIndex = 0;
        var repoDetails = {
            repoName: '',
            repoOwner: ''
        };
        var reactionsType = {
            thumbsUp: 0,
            thumbsDown: 0,
            laugh: 0,
            confused: 0,
            heart: 0,
            hooray: 0
        };


        function searchGitRepo(searchCriteria) {
            var request = $http({
                method: 'get',
                url: 'https://api.github.com/search/repositories?q=' + searchCriteria
            });

            return (request.then(handleSuccess, handleError));
        }

        function getRepoPulls() {
            var request = $http({
                method: 'get',
                url: 'https://api.github.com/repos/' + repoDetails.repoOwner + '/' + repoDetails.repoName + '/pulls'
            });

            return (request.then(handleSuccess, handleError));
        }

        function getComments(pullRequestId) {
            var request = $http({
                method: 'get',
                url: 'https://api.github.com/repos/' + repoDetails.repoOwner + '/' + repoDetails.repoName + '/pulls/' + pullRequestId + '/comments'
            });

            return (request.then(handleSuccess, handleError));
        }

        function getReaction(commentId) {
            var request = $http({
                method: 'get',
                url: 'https://api.github.com/repos/' + repoDetails.repoOwner + '/' + repoDetails.repoName + '/pulls/comments/' + commentId + '/reactions',
                headers: {
                    'Accept': 'application/vnd.github.squirrel-girl-preview'
                }
            });

            return (request.then(handleSuccess, handleError));
        }

        function getAllCommentsReaction() {
            getReaction(commentsId[commentsArrayIndex]).then(function(response) {
                commentsArrayIndex++;

                if (response.length > 0) {


                    for (var i = response.length - 1; i >= 0; i--) {
                        switch (response[i].content) {
                            case '+1':
                                reactionsType.thumbsUp++;
                                break;
                            case '-1':
                                reactionsType.thumbsDown++;
                                break;
                            case 'laugh':
                                reactionsType.laugh++;
                                break;
                            case 'confused':
                                reactionsType.confused++;
                                break;
                            case 'heart':
                                reactionsType.heart++;
                                break;
                            case 'hooray':
                                reactionsType.hooray++;
                        }
                    }
                }


                if (commentsArrayIndex === 10) { //To limit the requests
                    commentsArrayIndex = 0;
                    $rootScope.$emit('reactionsUpdated', reactionsType);
                } else {
                    getAllCommentsReaction();

                }
            });
        }

        function getCommentsId() {
            getComments(pullsId[pullsArrayIndex]).then(function(response) {
                pullsArrayIndex++;
                for (var i = response.length - 1; i >= 0; i--) {
                    commentsId.push(response[i].id);
                }

                if (commentsId.length) {
                    if (pullsArrayIndex === 10) { //To limit the requests
                        pullsArrayIndex = 0;
                        getAllCommentsReaction();
                    } else {
                        getCommentsId();
                    }
                } else {
                    $rootScope.$emit('reactionsUpdated', reactionsType);
                }
            });
        }


        function getPullsReactions(repoName, repoOwner) {
            reactionsType.thumbsUp = 0;
            reactionsType.thumbsDown = 0;
            reactionsType.laugh = 0;
            reactionsType.confused = 0;
            reactionsType.heart = 0;
            reactionsType.hooray = 0;

            repoDetails.repoName = repoName;
            repoDetails.repoOwner = repoOwner;
            return getRepoPulls().then(function(response) {
                for (var i = response.length - 1; i >= 0; i--) {
                    pullsId.push(response[i].number);
                }
                if (pullsId.length) {
                    getCommentsId();
                } else {
                    $rootScope.$emit('reactionsUpdated', reactionsType);
                }
            });
        }

        function getRepoComments(repoName, repoOwner) {
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
            getRepoComments: getRepoComments,
            getPullsReactions: getPullsReactions
        });
    });
