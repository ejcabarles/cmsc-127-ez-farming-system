'use strict';
(function() {
    angular
        .module('app')
        .directive('personnel', personnel);
    
    function personnel() {
        var directive = {
            restrict: 'E',
            templateUrl: '/personnel',
            controller: 'personnelController',
            controllerAs: 'personnel'
        }
        return directive;
    }
})();