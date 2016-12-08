'use strict';
(function() {
    angular
        .module('app')
        .controller('requestController', requestController);

        function requestController($scope, $http) {
            $scope.requestList = [];
        	$http
				.get('/viewRequestInformation')
				.then(function(response){
					console.log(response);
                    $scope.requestList = response.data[0];
				});

        }


})();