(function() { 'use strict';

angular
  .module('botClient')
  .controller('NetworkCtrl', ['$scope', 'ircNetwork', function($scope, Network) {
    $scope.network = Network.$find('5873941466388103168');
    $scope.network.$getChannels();
  }]);
})();