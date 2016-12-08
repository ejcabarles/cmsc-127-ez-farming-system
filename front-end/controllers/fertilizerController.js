'use strict';
(function() {
    angular
        .module('app')
        .controller('fertilizerController', fertilizerController);

        function fertilizerController($scope, $http) {
            $scope.fertilizerList = [];
        	$http
				.get('/viewFertilizerInformation')
				.then(function(response){
					console.log(response);
                    $scope.fertilizerList = response.data[0];
				});

            $scope.submit = function(){
                var param = {
                    brand: brand.value,
                    type: type.value,
                    nitrogen: n.value,
                    phosphorus: p.value,
                    potassium: k.value,
                }
                $http
                    .post('/addFertilizerInformation', param)
                    .then(function(response){
                        $http
                            .get('/viewFertilizerInformation')
                            .then(function(response){
                                console.log(response.data);
                                $scope.fertilizerList = response.data[0];
                            });
                    });
                
            }

        }


})();