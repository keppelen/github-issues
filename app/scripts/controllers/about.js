'use strict';

/**
 * @ngdoc function
 * @name gitProjApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gitProjApp
 */
angular.module('gitProjApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
