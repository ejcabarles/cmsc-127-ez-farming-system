'use strict';
(function() {
    angular
        .module('app')
        .controller('fertilizerController', fertilizerController);

        function fertilizerController($scope, $http) {
            $scope.fertilizerList = [];
            $scope.brand = '';
            $scope.type = '';
            $scope.n = '';
            $scope.p = '';
            $scope.k = '';

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


                                brand.value = '';
                                type.value = '';
                                n.value = '';
                                p.value = '';
                                k.value = '';
                            });
                    });
                
            }

            $scope.delete = function(){
                var id = this.x.fertilizerid
                $http
                    .delete('/deleteFertilizerInformation/' + id)
                    .then(function(response){
                        console.log(response);
                        $http
                            .get('/viewFertilizerInformation')
                            .then(function(response){
                                console.log(response.data);
                                $scope.fertilizerList = response.data[0];
                            });
                    });
            }

            $scope.edit = function(){
                var id = this.x.fertilizerid;
                var param = {
                    brand: this.brand,
                    type: this.type,
                    nitrogen: this.n,
                    phosphorus: this.p,
                    potassium: this.k,
                }
                console.log(param);
                console.log(id);
                $http
                    .put('/editFertilizerInformation/' + id, param)
                    .then(function(response){
                        console.log(response);
                        $http
                            .get('/viewFertilizerInformation')
                            .then(function(response){
                                console.log(response.data);
                                $scope.fertilizerList = response.data[0];

                                
                                this.brand = '';
                                this.type = '';
                                this.n = '';
                                this.p = '';
                                this.k = '';
                            });
                    });
            }

            $scope.copy = function(){
                this.brand = this.x.fertilizerbrand;
                this.type = this.x.fertilizertype;
                this.n = this.x.nitrogen;
                this.p = this.x.phosphorus;
                this.k = this.x.potassium;
            }

        }


})();