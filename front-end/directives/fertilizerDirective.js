'use strict';
(function() {
    angular
        .module('app')
        .directive('fertilizer', fertilizer);
    
    function plot() {
        var directive = {
            restrict: 'E',
            templateUrl: '/fertilizer',
            controller: 'fertilizerController',
            controllerAs: 'fertilizer'
        }
        return directive;
    }
})();