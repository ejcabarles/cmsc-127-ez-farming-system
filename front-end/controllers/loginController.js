'use strict';
(function() {
    angular
        .module('app')
        .controller('loginController', loginController);

        function loginController($scope, $http, $location) {
            var found = false;

            $scope.login = function(){
                console.log(username.value);
                console.log(password.value);
                var usernameVal = username.value;
                var passwordVal = password.value;

                $http
                .get('/viewPersonnelInformation')
                .then(function(response){
                    var res = response.data[0];
                    for(var i=0; i<res.length; i++){
                        if(res[i].username === usernameVal
                            && res[i].password === passwordVal){
                                found = true;
                        }
                    }
                    if(found === true){
                        console.log("uM");
                        $location.path("/personnel");
                    }
                });
            }
        }


})();