'use strict';
(function() {
    angular
        .module('app')
        .controller('plotController', plotController);

        function plotController($scope, $http) {
        	$http
				.get('/viewPlotInformation')
				.then(function(response){
					console.log(response);
				});
            $scope.title = "Plots";
            console.log("wee");

        }


})();