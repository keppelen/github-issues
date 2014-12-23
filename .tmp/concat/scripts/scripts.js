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
  .config(["$routeProvider", function ($routeProvider) {
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
  }]);

'use strict';

/**
 * @ngdoc function
 * @name gitProjApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitProjApp
 */
angular.module('gitProjApp')
  .controller('MainCtrl', ["$scope", "$http", "config", function ($scope, $http, config) {

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

  }]);

'use strict';

/**
 * @ngdoc function
 * @name gitProjApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gitProjApp
 */
angular.module('gitProjApp')
  .controller('AboutCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

'use strict';

/**
 * @ngdoc service
 * @name gitProjApp.config
 * @description
 * # config
 * Service in the gitProjApp.
 */
angular.module('gitProjApp')
  .service('config', function config() {
    return {
      'clientId': '8525ac7a0c9fe5d45644',
      'clientSecret': 'e48378ecd961810a35a1e04efb65235679e813ea',
      'url': 'https://api.github.com/repos/Planedia/planedia-site/',
      'token': '395d5b9c48d1283c0567dffb9f7a90e98f90441a',
      'members': 'https://api.github.com/orgs/planedia/members'
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name gitProjApp.controller:IssueCtrl
 * @description
 * # IssueCtrl
 * Controller of the gitProjApp
 */
angular.module('gitProjApp')
  .controller('IssueCtrl', ["$scope", "$http", "config", function ($scope, $http, config) {

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

  }]);
