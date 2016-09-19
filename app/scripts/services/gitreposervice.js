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
        var reactionsReceived = false;

        /*this.reactionsType = reactionsType;
        this.reactionsReceived = reactionsReceived;*/


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
                url: 'https://api.github.com/repos/' + repoDetails.repoOwner + '/' + repoDetails.repoName + '/pulls',
                params: {
                    client_id: 'c283f9efeb5d0328393e',
                    client_secret: '71dfe43e177fdcdb39cc77772233fa49b252f23a'
                }
            });

            return (request.then(handleSuccess, handleError));
        }

        function getComments(pullRequestId) {
            var request = $http({
                method: 'get',
                url: 'https://api.github.com/repos/' + repoDetails.repoOwner + '/' + repoDetails.repoName + '/pulls/' + pullRequestId + '/comments',
                params: {
                    client_id: 'c283f9efeb5d0328393e',
                    client_secret: '71dfe43e177fdcdb39cc77772233fa49b252f23a'
                }
            });

            return (request.then(handleSuccess, handleError));
        }

        function getReaction(commentId) {
            var request = $http({
                method: 'get',
                url: 'https://api.github.com/repos/' + repoDetails.repoOwner + '/' + repoDetails.repoName + '/pulls/comments/' + commentId + '/reactions',
                params: {
                    client_id: 'c283f9efeb5d0328393e',
                    client_secret: '71dfe43e177fdcdb39cc77772233fa49b252f23a'
                },
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
                        response[i].content

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


                if (commentsArrayIndex === commentsId.length) {
                    commentsArrayIndex = 0;
                    reactionsReceived = true;
                    $rootScope.$emit('reactionsUpdated', reactionsType);
                    console.log(reactionsType);
                } else {
                    getAllCommentsReaction();

                }
            })
        }

        function getCommentsId() {
            getComments(pullsId[pullsArrayIndex]).then(function(response) {
                pullsArrayIndex++;
                for (var i = response.length - 1; i >= 0; i--) {
                    commentsId.push(response[i].id);
                }

                if (pullsArrayIndex === pullsId.length) {
                    pullsArrayIndex = 0;
                    getAllCommentsReaction();
                } else {
                    getCommentsId();
                }
            });
        }


        function getPullsReactions(repoName, repoOwner) {
            repoDetails.repoName = repoName;
            repoDetails.repoOwner = repoOwner;
            reactionsReceived = false;
            return getRepoPulls().then(function(response) {
                for (var i = response.length - 1; i >= 0; i--) {
                    pullsId.push(response[i].number);
                }
                getCommentsId();
            })
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
