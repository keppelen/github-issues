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

    $http({
      method: 'GET',
      url: config.url + 'issues?per_page=100&state=all&page=1&access_token=' + config.token,
    })
    .success(function( data ){
      $scope.issues = data;
      console.log($scope.issues);

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

  });
