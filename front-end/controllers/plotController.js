'use strict';
(function() {
    angular
        .module('app')
        .controller('plotController', plotController);

        function plotController($scope, $http) {

            $scope.plotList = [];
            $scope.showData = false;
            
        	$http
				.get('/viewPlotInformation')
				.then(function(response){
					console.log(response.data);
                    $scope.plotList = response.data[0];
				});
            $scope.title = "Plots";
            console.log("wee");

            $scope.submit = function(){
                var param = {
                    zone: zone.value,
                    row: row.value,
                    col: col.value,
                }
                $http
                    .post('/addPlotInformation', param)
                    .then(function(response){
                        $http
                            .get('/viewPlotInformation')
                            .then(function(response){
                                console.log(response.data);
                                $scope.plotList = response.data[0];
                            });
                    });
                
            }

            $scope.toggle = function(){
                $scope.showData = true;
            }
        }


})();