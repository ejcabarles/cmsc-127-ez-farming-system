'use strict';
(function() {
    angular
        .module('app')
        .controller('personnelController', personnelController);

        function personnelController($scope, $http) {

            
            $scope.personnelList = [];
            $scope.showData = false;
            $scope.username = '';
            $scope.firstname = '';
            $scope.lastname = '';
            $scope.birthday = '';
            $scope.position = '';
            
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


                                username.value = '';
                                password.value = '';
                                fname.value = '';
                                lname.value = '';
                                bday.value = '';
                                position.value = '';
                            });
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
                    username: this.username,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    birthday: this.bday,
                    position: this.position
                }
                console.log(param);
                console.log(id);
                $http
                    .put('/editPersonnelInformation/' + id, param)
                    .then(function(response){
                        console.log(response);
                        $http
                            .get('/viewPersonnelInformation')
                            .then(function(response){
                                console.log(response.data);
                                $scope.personnelList = response.data[0];

                                
                                this.username = '';
                                this.firstname = '';
                                this.lastname = '';
                                this.birthday = '';
                                this.position = '';
                            });
                    });
            }

            $scope.copy = function(txt){
                this.username = this.x.username;
                this.firstname = this.x.firstname;
                this.lastname = this.x.lastname;
                var bday = new Date(this.x.bday);
                this.bday = bday.getFullYear() + "-" + (bday.getMonth() + 1) + "-" + bday.getDate();
                this.position = this.x.position;
            };
        }


})();