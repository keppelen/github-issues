'use strict';

/**
 * @ngdoc overview
 * @name gitProjApp
 * @description
 * # gitProjApp
 *
 * Main module of the application.
 */
angular
  .module('gitProjApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/new-issue', {
        templateUrl: 'views/new-issue.html',
        controller: 'IssueCtrl'
      })
      .when('/detail/:id', {
        templateUrl: 'views/detail-issue.html',
        controller: 'DetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
