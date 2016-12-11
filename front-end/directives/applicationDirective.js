'use strict';
(function() {
    angular
        .module('app')
        .directive('application', application);
    
    function application() {
        var directive = {
            restrict: 'E',
            templateUrl : 'views/application.html',
            controller: 'applicationController',
            controllerAs: 'application'
        }
        return directive;
    }
})();