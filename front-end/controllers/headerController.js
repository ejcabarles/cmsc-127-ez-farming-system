'use strict';
(function() {
    angular
        .module('app')
        .controller('headerController', headerController);

        function headerController($scope, $http) {

            var vm = this;
            
            $scope.plot = true;
            
        }


})();