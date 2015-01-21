'use strict';

/**
 * @ngdoc function
 * @name gitProjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitProjApp
 */
angular.module('gitProjApp')
  .controller('MainCtrl', function ($scope, $http, config) {

    $scope.issues = [];
    $scope.backlog = [];
    $scope.progress = [];
    $scope.done = [];
    $scope.config = config;

    $scope.getIssues = function( token ) {
      $http({
        method: 'GET',
        url: $scope.config.url + 'issues?&state=open&access_token=' + token,
      })
      .success(function( data ){
        $scope.issues = data;

        $scope.issues.forEach(function( val ) {

          if ( val.labels.length > 0 ) {

            val.labels.forEach(function(issue){
              if ( issue.name === 'backlog' ) {
                $scope.backlog.push( val );
              }
              if ( issue.name === 'in progress' ) {
                $scope.progress.push( val );
              }
              if ( issue.name === 'done' ) {
                $scope.done.push( val );
              }
            });
          }

        });
      });
    };

    $scope.getIssues( $scope.config.token );

  });
