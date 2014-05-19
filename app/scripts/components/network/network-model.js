(function() { 'use strict';

function Network(futureNetworkData) {
  // if data is already resolved then return it
  if (!futureNetworkData.inspect) {
    Network.$_.extend(this, futureNetworkData);
    return;
  }

  this.$unwrap(futureNetworkData);
}

Network.$factory = [
  '_',
  '$timeout',
  'ircResource',
  'ircChannel',
  function($_, $timeout, Resource, Channel) {
    $_.extend(Network, {
      $_: $_,
      $timeout: $timeout,
      $$resource: new Resource('/networks/%s'),
      $Channel: Channel
    });

    return Network;
  }];

angular.module('botClient').factory('ircNetwork', Network.$factory);

Network.$find = function() {
  var args = Array.prototype.slice.call(arguments);
  var futureNetworkData = this.$$resource.find.apply(this.$$resource, args);

  // single network
  if (args.length) return new Network(futureNetworkData);

  // all networks
  return Network.$getCollection(futureNetworkData);
};

Network.prototype.$getChannels = function() {
  var self = this;

  if (!this.$futureNetworkData)
    return self.channels = Network.$Channel.$find(this.id);

  return this.$futureNetworkData.get('id').then(function(network) {
    self.channels = Network.$Channel.$find(network);
  });
};

// TODO: support multiple network resolves and subsequent channel lookups
// Network.$getCollection = function(futureNetworkData) {
//   var self = this;
//   var collection = [];

//   var deferred = Q.defer();

//   futureNetworkData.then(function(networks) {
//     Network.$_.reduce(networks, function(collect, network) {
//       collect.push(new Network(network));
//       return collect;
//     }, collection);

//     deferred.resolve(collection);

//   }, function (error) {
//     deferred.reject(error);
//   });

//   return deferred.promise;
// };

Network.prototype.$unwrap = function(futureNetworkData) {
  var self = this;

  this.$futureNetworkData = futureNetworkData;
  this.$futureNetworkData.then(function(data) {
    // inflate/hydrate this model with the data returned from the service
    Network.$timeout(function() { Network.$_.extend(self, data); });
  });
};

Network.$unwrapCollection = function(futureNetworkData) {
  var collection = {};

  collection.$futureNetworkData = futureNetworkData;

  futureNetworkData.then(function(networks) {
    Network.$_.reduce(networks, function(collect, network) {
      collect[network.id] = new Network(network);
      return collect;
    }, collection);
  });

  return collection;
};

})();