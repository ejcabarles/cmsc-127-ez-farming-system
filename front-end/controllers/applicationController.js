'use strict';
(function() {
    angular
        .module('app')
        .controller('applicationController', applicationController);

        function applicationController($scope, $http) {

            var applications = [];
            $scope.fertilizerList = [];
            $scope.plotList = [];
            $scope.fertilizers = [];
            $scope.plots = [];
            $scope.applicationList = [];
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
                applications = [];
                $scope.applicationList = [];
                $http
                .get('/viewFertilizerApplication')
                .then(function(response){
                    console.log(response.data);
                    applications = response.data[0];

                    console.log(applications);

                    for(var j=0; j<applications.length; j++){
                        applications[j].plotList = [];
                        applications[j].fertilizerList = [];
                    }

                    for(var j=0; j<applications.length; j++){
                        for(var i=0; i<$scope.applicationList.length; i++){
                            if($scope.applicationList[i].appid === applications[j].appid){
                                foundReq = true;
                            }
                        }
                        if(foundReq === false){
                            $scope.applicationList.push(applications[j])
                        }
                        foundReq = false;
                    }

                    for(var j=0; j<applications.length; j++){
                        for(var i=0; i<$scope.applicationList.length; i++){
                            if($scope.applicationList[i].appid === applications[j].appid){
                                console.log("aye");
                                if($scope.applicationList[i].plotList.indexOf(applications[j].plotid) <= -1){
                                    $scope.applicationList[i].plotList.push(applications[j].plotid);
                                }
                            }
                        }
                    }

                    for(var j=0; j<applications.length; j++){
                        for(var i=0; i<$scope.applicationList.length; i++){
                            if($scope.applicationList[i].appid === applications[j].appid){
                                if($scope.applicationList[i].fertilizerList.indexOf(applications[j].fertilizerid) <= -1){
                                    $scope.applicationList[i].fertilizerList.push(applications[j].fertilizerid);
                                }
                            }
                        }
                    }

                    console.log($scope.applicationList);

                });
            }

            view();

            $scope.delete = function(){
                var id = this.a.appid;
                $http
                    .delete('/deleteFertilizerApplication/' + id)
                    .then(function(response){
                        view();
                    });
            }

            $scope.copy = function(){
                var pd = new Date(this.a.planneddate);
                var ad = new Date(this.a.actualdate);

                this.planneddate = pd.getFullYear() + "-" + (pd.getMonth() + 1) + "-" + pd.getDate();
                this.actualdate = ad.getFullYear() + "-" + (ad.getMonth() + 1) + "-" + ad.getDate();
                this.applicationtype = this.a.applicationtype

                var f = this.a.fertilizerList;
                var p = this.a.plotList;

                angular.forEach($scope.fertilizerList, function(x){
                    if(f.indexOf(x.fertilizerid) > -1) x.selected = true;
                });


                angular.forEach($scope.plotList, function(y){
                    if(p.indexOf(y.plotid) > -1) y.selected = true;
                })


            }

            $scope.edit = function(){
                var thiz = this;
                var id = this.a.appid;
                var param = {
                    planneddate: this.planneddate,
                    actualdate: this.actualdate,
                    applicationtype: this.applicationtype,
                }
                console.log(param);
                $http
                    .put('editFertilizerApplication/' + id, param)
                    .then(function(response){
                        console.log(response);
                        $http
                            .delete('deleteAppPlot/' + id)
                            .then(function(response){
                                $http
                                    .delete('deleteAppFertilizer/' + id)
                                    .then(function(response){

                                        var fertilizers = [];
                                        var plots = [];

                                        angular.forEach($scope.fertilizerList, function(x){
                                            if (x.selected) fertilizers.push(x);
                                        });


                                        angular.forEach($scope.plotList, function(y){
                                            if (y.selected) plots.push(y);
                                        })


                                        for (var i = 0; i < fertilizers.length; i++) {
                                            var param = {
                                                appid : id,
                                                fertilizerid : fertilizers[i].fertilizerid

                                            }
                                            console.log(param);
                                            $http
                                                .post('/addAppFertilizer', param)
                                                .then(function(response) {
                                                    console.log(response)
                                                });
                                        }


                                        for (var i = 0; i < plots.length; i++) {
                                            var param = {
                                                appid : id,
                                                plotid : plots[i].plotid
                                            }
                                            console.log(param);
                                            $http
                                                .post('/addAppPlot', param)
                                                .then(function(response) {
                                                    console.log(response)
                                                    view();
                                                });
                                        }



                                        thiz.planneddate = '';
                                        thiz.actualdate = '';
                                        thiz.applicationtype = '';

                                        angular.forEach($scope.fertilizerList, function(x){
                                            if (x.selected){
                                                x.selected = false;
                                                console.log(x)
                                            }
                                        });


                                        angular.forEach($scope.plotList, function(y){
                                            if (y.selected){
                                                y.selected = false;
                                                console.log(y);
                                            }
                                        })
                                    });

                            });
                    });
            }

        }


})();