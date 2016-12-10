'use strict';
(function() {
    angular
        .module('app')
        .directive('login', login);
    
    function login() {
        var directive = {
            restrict: 'E',
            templateUrl: '/lgin',
            controller: 'loginController',
            controllerAs: 'login'
        }
        return directive;
    }
})();