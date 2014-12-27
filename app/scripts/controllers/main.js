'use strict';

/**
 * @ngdoc function
 * @name gitProjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitProjApp
 */
angular.module('gitProjApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.issues = [];
    $scope.backlog = [];
    $scope.progress = [];
    $scope.done = [];
    $scope.config = {};

    $http({
      method: 'GET',
      url: 'http://localhost:9989/token'
    })
    .success(function( data ){
      $scope.config = data;
      $scope.getIssues(data.token);
    });

    $scope.getIssues = function( token ) {
      $http({
        method: 'GET',
        url: $scope.config.url + 'issues?&state=open&access_token=' + token,
      })
      .success(function( data ){
        $scope.issues = data;

        $scope.issues.forEach(function( val ) {

          if ( val.labels.length > 0 ) {

            val.labels.forEach(function(teste){
              if ( teste.name === 'backlog' ) {
                $scope.backlog.push( val );
              }
              if ( teste.name === 'in progress' ) {
                $scope.progress.push( val );
              }
              if ( teste.name === 'done' ) {
                $scope.done.push( val );
              }
            });
          }

        });
      });
    };

  });
