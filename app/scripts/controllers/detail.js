'use strict';

/**
 * @ngdoc function
 * @name gitProjApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the gitProjApp
 */
angular.module('gitProjApp')
  .controller('DetailCtrl', function ($scope, $http, $routeParams) {

    $scope.comments = [];
    $scope.issueId = $routeParams.id;

    $http({
      method: 'GET',
      url: 'http://localhost:9989/token'
    })
    .success(function( data ){
      $scope.config = data;
      $scope.getComments(data.token);
    });

    $scope.getComments = function(token) {
      $http({
        method: 'GET',
        url: $scope.config.url + 'issues/'+ $scope.issueId +'/comments?&access_token=' + token,
      })
      .success(function( data ){
        $scope.comments = data;
        console.log( $scope.comments );
      })
    }


  });
