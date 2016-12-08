'use strict';
(function() {
    angular
        .module('app')
        .controller('personnelController', personnelController);

        function personnelController($scope, $http) {

            
            $scope.personnelList = [];
            $scope.showData = false;
            
        	$http
				.get('/viewPersonnelInformation')
				.then(function(response){
					console.log(response.data);
                    $scope.personnelList = response.data[0];
				});

            $scope.submit = function(){
            	console.log(password.value);
                var param = {
                    username: username.value,
                    password: password.value,
                    firstname: fname.value,
                    lastname: lname.value,
                    birthday: bday.value,
                    position: position.value
                }
                console.log(param)
                $http
                    .post('/addPersonnelInformation', param)
                    .then(function(response){
                        $http
                            .get('/viewPersonnelInformation')
                            .then(function(response){
                                console.log(response.data);
                                $scope.personnelList = response.data[0];
                            });
                        username.value = '';
                        password.value = '';
                        fname.value = '';
                        lname.value = '';
                        bday.value = '';
                        position.value = '';
                    });
                
            }

            $scope.delete = function(){
                var id = this.x.userid;
                $http
                    .delete('/deletePersonnelInformation/' + id)
                    .then(function(response){
                        console.log(response);
                        $http
                            .get('/viewPersonnelInformation')
                            .then(function(response){
                                console.log(response.data);
                                $scope.personnelList = response.data[0];
                            });
                    });
            }

            $scope.edit = function(){
                var id = this.x.userid;
                var param = {
                    username: usernameField.value,
                    firstname: fnameField.value,
                    lastname: lnameField.value,
                    birthday: bdayField.value,
                    position: positionField.value,
                }
                $http
                    .put('/editPersonnelInformation/' + id, param)
                    .then(function(response){
                        console.log(response);
                        $http
                            .get('/viewPersonnelInformation')
                            .then(function(response){
                                console.log(response.data);
                                $scope.personnelList = response.data[0];
                            });
                    });
            }

            $scope.toggle = function(){
                if($scope.showData == true){
                    $scope.showData = false;
                    return $scope.showData;
                }
                else{
                    $scope.showData = true;
                    return $scope.showData;
                }
            }
            
        }


})();