'use strict';
(function() {
    angular
        .module('app')
        .controller('requestController', requestController);

        function requestController($scope, $http) {
        	$http
				.get('/viewPlotInformation')
				.then(function(response){
					console.log(response);
				});
            $scope.title = "Request";
            console.log("wee");

        }


})();