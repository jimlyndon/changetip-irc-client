(function() { 'use strict';

  function Resource($_, $http, bot, path) {
    $_.extend(this, {
      _http: $http,
      _path: bot.endpoint + path
    });
  }

  Resource.$factory =  ['_', '$http', 'bot', function($_, $http, bot) {
    return function(path) {
      return new Resource($_, $http, bot, path);
    };
  }];

  angular.module('botClient').factory('ircResource', Resource.$factory);

  Resource.prototype.find = function() {
    var deferred = Q.defer();

    this._http.get(this.path.apply(this, arguments))
      .success(deferred.resolve)
      .error(deferred.reject);

    return deferred.promise;
  };

  Resource.prototype.path = function() {
    var params = [this._path];
    params.push.apply(params, arguments);
    return format.apply(this, params);
  };

  function format(f) {
    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(/%[sdj%]/g, function(x) {
      if (i >= len) return '';
      switch (x) {
        case '%s': return String(args[i++]);
        default:
          return x;
      }
    });

    return str;
  };

})();
