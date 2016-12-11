'use strict';
(function() {
    angular
        .module('app')
        .directive('addRequest', addRequest);
    
    function addRequest() {
        var directive = {
            restrict: 'E',
            templateUrl : 'views/request.html',
            controller: 'requestController',
            controllerAs: 'request'
        }
        return directive;
    }
})();