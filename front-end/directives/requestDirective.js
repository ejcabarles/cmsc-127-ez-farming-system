'use strict';
(function() {
    angular
        .module('app')
        .directive('request', request);
    
    function plot() {
        var directive = {
            restrict: 'E',
            controller: 'requestController',
            controllerAs: 'request'
        }
        return directive;
    }
})();