'use strict';

var lowdash = angular.module('lowdash', []);
lowdash.factory('_', function() {
  return window._;
});

// TODO: inject Q, for testability
// var kriskowalQ = angular.module('kriskowalQ', []);
// kriskowalQ.factory('Q', function() {
//   return window.Q;
// });

angular.module('botClient', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'lowdash'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/network.html',
        controller: 'NetworkCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });


angular
  .module('botClient')
  .constant('bot', {
    endpoint : 'http://changetip.herokuapp.com'
  }
);