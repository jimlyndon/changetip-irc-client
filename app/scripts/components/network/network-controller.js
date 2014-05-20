(function() { 'use strict';

angular
  .module('botClient')
  .controller('NetworkCtrl', ['$scope', 'ircNetwork', function($scope, Network) {
    $scope.network = Network.$find('5874312407144202240');
    $scope.network.$getChannels();
  }]);
})();