'use strict';

/**
 * @ngdoc function
 * @name gitProjApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the gitProjApp
 */
angular.module('gitProjApp')
  .controller('DetailCtrl', function ($scope, $http, $routeParams, config) {

    $scope.issue = [];
    $scope.comments = [];
    $scope.issueId = $routeParams.id;
    $scope.config = config;

    $scope.getComments = function(token) {
      $http({
        method: 'GET',
        url: $scope.config.url + 'issues/'+ $scope.issueId +'/comments?&access_token=' + token,
      })
      .success(function( data ){
        $scope.comments = data;
      });
    };

    $scope.getIssue = function(token) {
      $http({
        method: 'GET',
        url: $scope.config.url + 'issues/'+ $scope.issueId +'?&access_token=' + token,
      })
      .success(function( data ){
        $scope.issue = data;
        $scope.getComments( token );
      });
    };

    $scope.getIssue($scope.config.token);


  });
