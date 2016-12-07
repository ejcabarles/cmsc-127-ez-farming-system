var app = angular.module('app', ["ngRoute"]); // setter method

app.config(function($routeProvider) {
  $routeProvider

  .when('/plots', {
    templateUrl : '/../views/plots.html',
    controller  : 'plotController'
  })
  .when('/personnel', {
    templateUrl : '/../views/personnel.html',
    controller  : 'personnelController'
  })
  .when('/request', {
    templateUrl : '/../views/request.html',
    controller  : 'requestController'
  })
  .when('/fertilizer', {
    templateUrl : '/../views/fertilizer.html',
    controller  : 'fertilizerController'
  })

  .otherwise({redirectTo: '/'});
});
