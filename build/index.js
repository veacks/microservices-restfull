(function() {
  "use strict";
  var HttpMicroService, RpcMicroservice, services;

  HttpMicroService = require("HttpMicroService");

  RpcMicroservice = require("RpcMicroservice");


  /*
   * @private services
   * @description Store the microservices internaly
   */

  services = {};

  module.exports = {

    /*
     * @method set
     * @description Set the services
     * @param {object} config - Services Configuration
     */
    set: function(config) {
      var serviceConf, serviceKey, _results;
      _results = [];
      for (serviceKey in config) {
        serviceConf = config[serviceKey];
        switch (false) {
          case !serviceConf.type.match(/http(s)?/):
            _results.push(services[serviceKey] = new HttpMicroService(serviceConf));
            break;
          case serviceConf.type !== "rpc":
            _results.push(services[serviceKey] = new RpcMicroservice(serviceConf));
            break;
          default:
            _results.push(void 0);
        }
      }
      return _results;
    },

    /*
     * @method get
     * @description Get the services by name or globally
     * @param {object} config - Services Configuration
     */
    get: function(name) {
      if (name != null) {
        return services[name];
      }
      return services;
    },

    /*
     * @member HttpMicroService - Direct access to the class HttpMicroService
     */
    HttpMicroService: HttpMicroService,

    /*
     * @member RpcMicroservice - Direct access to the class RpcMicroservice
     */
    RpcMicroservice: RpcMicroservice
  };

}).call(this);
