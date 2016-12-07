'use strict';
(function() {
    angular
        .module('app')
        .controller('fertilizerController', fertilizerController);

        function fertilizerController($scope, $http) {
        	$http
				.get('/viewPlotInformation')
				.then(function(response){
					console.log(response);
				});
            $scope.title = "Request";
            console.log("wee");

        }


})();