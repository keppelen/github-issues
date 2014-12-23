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
