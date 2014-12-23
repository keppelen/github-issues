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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/new-issue', {
        templateUrl: 'views/new-issue.html',
        controller: 'IssueCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
