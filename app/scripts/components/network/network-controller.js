(function() { 'use strict';

angular
  .module('botClient')
  .controller('NetworkCtrl', ['$scope', 'ircNetwork', function($scope, Network) {
    $scope.network = Network.$find('5874683146829561856');
    $scope.network.$getChannels();
  }]);
})();