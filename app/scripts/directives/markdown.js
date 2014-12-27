'use strict';

/**
 * @ngdoc directive
 * @name gitProjApp.directive:markdown
 * @description
 * # markdown
 */
angular.module('gitProjApp')
  .directive('markdown', function ($http) {
    var converter = new Showdown.converter();
    return {
      restrict: 'E',
      replace: true,
      link: function (scope, element, attrs) {
        if (attrs.src) {
          element.html(converter.makeHtml(attrs.src));
        }
        else {
          element.html(converter.makeHtml(element.text()));
        }
      }
    };
  });
