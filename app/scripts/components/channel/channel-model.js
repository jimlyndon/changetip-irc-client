(function() { 'use strict';

function Channel(futureChannelData) {
  // if data is already resolved then return it
  if (!futureChannelData.inspect) {
    Channel.$_.extend(this, futureChannelData);
    return;
  }

  this.$unwrap(futureChannelData);
}

Channel.$factory = [
  '_',
  '$timeout',
  'ircResource',
  function($_, $timeout, Resource) {
  $_.extend(Channel, {
    $_: $_,
    $timeout: $timeout,
    $$resource: new Resource('/networks/%s/channels/%s')
  });

  return Channel;
}];

angular.module('botClient').factory('ircChannel', Channel.$factory);

Channel.$find = function() {
  var futureChannelData = this.$$resource.find.apply(this.$$resource, arguments);

  // single channel, nid and cid
  if (arguments.length > 1) return new Channel(futureChannelData);

  // all channels, nid only
  return Channel.$unwrapCollection(futureChannelData);
};

Channel.prototype.$unwrap = function(futureChannelData) {
  var self = this;

  this.$futureChannelData = futureChannelData;
  this.$futureChannelData.then(function(data) {
    Channel.$timeout(function() { Channel.$_.extend(self, data); });
  });
};

Channel.$unwrapCollection = function(futureChannelData) {
  var collection = {};

  collection.$futureChannelData = futureChannelData;

  futureChannelData.then(function(channels) {
    Channel.$timeout(function() {
      Channel.$_.reduce(channels, function(collect, channel) {
        collect[channel.id] = new Channel(channel);
        return collect;
      }, collection);
    });
  });

  return collection;
};

})();