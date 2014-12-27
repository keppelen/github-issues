'use strict';

/**
 * @ngdoc service
 * @name gitProjApp.config
 * @description
 * # config
 * Service in the gitProjApp.
 */
angular.module('gitProjApp')
  .service('config', function config( $http ) {
    var obj;

    $http({
      method: 'GET',
      url: 'http://localhost:9989/token'
    })
    .success(function( data ){
      console.log(obj, data);
    });

    return obj;
  });
