'use strict';
(function() {
    angular
        .module('app')
        .controller('requestController', requestController);

        function requestController($scope, $http) {

            var requests = [];
            $scope.fertilizerList = [];
            $scope.plotList = [];
            $scope.fertilizers = [];
            $scope.plots = [];
            $scope.requestList = [];
            var foundReq = false;
            var foundFer = false;
            var foundPlo = false;

            $http
            .get('/viewPlotInformation')
            .then(function(response){
                console.log(response.data);
                $scope.plotList = response.data[0];
            });

            $http
            .get('/viewFertilizerInformation')
            .then(function(response){
                console.log(response);
                $scope.fertilizerList = response.data[0];
            });


            function view(){
                requests = [];
                $scope.requestList = [];
                $http
                .get('/viewRequestInformation')
                .then(function(response){
                    console.log(response.data);
                    requests = response.data[0];

                    console.log(requests);

                    for(var j=0; j<requests.length; j++){
                        requests[j].plotList = [];
                        requests[j].fertilizerList = [];
                    }

                    for(var j=0; j<requests.length; j++){
                        for(var i=0; i<$scope.requestList.length; i++){
                            if($scope.requestList[i].requestid === requests[j].requestid){
                                foundReq = true;
                            }
                        }
                        if(foundReq === false){
                            $scope.requestList.push(requests[j])
                        }
                        foundReq = false;
                    }

                    for(var j=0; j<requests.length; j++){
                        for(var i=0; i<$scope.requestList.length; i++){
                            if($scope.requestList[i].requestid === requests[j].requestid){
                                console.log("aye");
                                if($scope.requestList[i].plotList.indexOf(requests[j].plotid) <= -1){
                                    $scope.requestList[i].plotList.push(requests[j].plotid);
                                }
                            }
                        }
                    }

                    for(var j=0; j<requests.length; j++){
                        for(var i=0; i<$scope.requestList.length; i++){
                            if($scope.requestList[i].requestid === requests[j].requestid){
                                if($scope.requestList[i].fertilizerList.indexOf(requests[j].fertilizerid) <= -1){
                                    $scope.requestList[i].fertilizerList.push(requests[j].fertilizerid);
                                }
                            }
                        }
                    }

                    console.log($scope.requestList);

                });
            }

            view();

            $scope.submit = function() {

                
                angular.forEach($scope.fertilizerList, function(x){
                    if (x.selected) $scope.fertilizers.push(x);
                });


                angular.forEach($scope.plotList, function(y){
                    if (y.selected) $scope.plots.push(y);
                })

                var fertilizers = $scope.fertilizers;
                var plots = $scope.plots;
                var reqid;


                var param = {
                    planneddate : plannedDate.value,
                    actualdate : null,
                    applicationtype : applicationType.value,
                    status : 'PENDING',
                    userid : 1,
                }
                console.log(param);
                $http
                    .post('/addRequest', param)
                    .then(function(response) {
                        $http
                            .get('/getLastInsertId', param)
                            .then(function(response) {
                                reqid = response.data[0].lastid;
                                console.log(reqid);


                                for (var i = 0; i < fertilizers.length; i++) {
                                    var param = {
                                        requestid : reqid,
                                        fertilizerid : fertilizers[i].fertilizerid

                                    }
                                    console.log(param);
                                    $http
                                        .post('/addFertilizers', param)
                                        .then(function(response) {
                                            console.log(response)
                                        });
                                }


                                for (var i = 0; i < plots.length; i++) {
                                    var param = {
                                        requestid : reqid,
                                        plotid : plots[i].plotid
                                    }
                                    console.log(param);
                                    $http
                                        .post('/addPlots', param)
                                        .then(function(response) {
                                            console.log(response)
                                            view();

                                            plannedDate.value = '';
                                            applicationType.value = '';

                                            angular.forEach($scope.fertilizerList, function(x){
                                                if (x.selected) x.selected = false;
                                            });

                                            angular.forEach($scope.plotList, function(x){
                                                if (x.selected) x.selected = false;
                                            });
                                        });
                                }
                            });


                    });

                    
            }

            $scope.approve = function(){
                console.log(this);
                var planneddate = new Date(this.a.planneddate);
                var actualdate = new Date();
                console.log(actualdate);
                var pd = planneddate.getFullYear() + "-" + (planneddate.getMonth() + 1) + "-" + planneddate.getDate();
                var ad = actualdate.getFullYear() + "-" + (actualdate.getMonth() + 1) + "-" + actualdate.getDate();
                var thiz = this;
                var param = {
                    planneddate : pd,
                    actualdate : ad,
                    applicationtype : this.a.applicationtype,
                    userid : 1,
                };
                console.log(param);
                $http
                    .post('/addApplicationInformation', param)
                    .then(function(response) {
                        $http
                            .get('/getLastInsertId', param)
                            .then(function(response) {
                                var apid = response.data[0].lastid;
                                var plotsApp = thiz.a.plotList;
                                var fertilizersApp = thiz.a.fertilizerList;

                                for(var i=0; i<fertilizersApp.length; i++){
                                    var param = {
                                        appid : apid,
                                        fertilizerid : fertilizersApp[i]
                                    }
                                    $http
                                        .post('/addAppFertilizer', param)
                                        .then(function(response) {
                                        });
                                }

                                for(var i=0; i<plotsApp.length; i++){
                                    var param = {
                                        appid : apid,
                                        plotid : plotsApp[i]
                                    }
                                    $http
                                        .post('/addAppPlot', param)
                                        .then(function(response) {
                                        });
                                }

                                var id = thiz.a.requestid;
                                $http
                                    .put('/approveRequest/' + id)
                                    .then(function(response) {
                                        view();
                                    });
                            });
                    });
            }

            $scope.decline = function(){
                console.log(this)
                console.log(this.a.requestid);
                var id = this.a.requestid;
                $http
                    .put('/declineRequest/' + id)
                    .then(function(response) {
                        console.log(response);
                        view();
                    });
            }

        }


})();