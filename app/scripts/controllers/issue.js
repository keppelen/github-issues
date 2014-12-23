'use strict';

/**
 * @ngdoc function
 * @name gitProjApp.controller:IssueCtrl
 * @description
 * # IssueCtrl
 * Controller of the gitProjApp
 */
angular.module('gitProjApp')
  .controller('IssueCtrl', function ($scope, $http, config) {

    $scope.label = [];
    $scope.form = {};

    $scope.createIssue = function( form ) {
      $scope.form = form;
      $scope.form.labels = [];
      $scope.form.labels = $scope.label;
      $scope.form.labels.push('backlog');

      if ( !$scope.form.title ) {
        window.alert('Você deve colocar um titulo para issue');
        return false;
      }
      if ( !$scope.form.body ) {
        window.alert('Você deve colocar uma descrição para issue');
        return false;
      }
      if ( !$scope.form.assignee ) {
        window.alert('Você deve associar alguém a issue');
        return false;
      }

      $http({
        method: 'POST',
        data: $scope.form,
        url: config.url + 'issues?access_token=' + config.token
      })
      .success(function( ){
        window.alert(' Issue criada com sucesso ');
      });
    };

    $scope.toggleSelection = function toggleSelection(labelName) {
      var idx = $scope.label.indexOf(labelName);

      if (idx > -1) {
        $scope.label.splice(idx, 1);
      }
      else {
        $scope.label.push(labelName);
      }
    };

    // List all labels
    $http({
      method: 'GET',
      url: config.url + 'labels?access_token=' + config.token
    })
    .success(function( data ){
      $scope.labels = data;
    });

    // List all members organizations
    $http({
      method: 'GET',
      url: config.members + '?access_token=' + config.token
    })
    .success(function( data ){
      $scope.users = data;
    });

  });
