var expandCollapseApp = angular.module('expandCollapseApp', ['ngAnimate']);

expandCollapseApp.controller('expandCollapseCtrl', function($scope, $http) {
    $scope.active = true;
    $scope.active1 = true;

    $scope.status = "bla"
    $scope.linie = []

    $scope.load = function() {
        //$http.get('http://192.168.1.1/cgi-bin/iwlist').
        $http.get('//mjg.dnsd.info/cgi-bin/iwlist').
        success(function(data, status, headers, config) {
            $scope.status = status;
            var l = data.split("\n")
            var ret = [];
            var o = {};
            for (i in l) {
                if (/Cell.[0-9]{2,}/.test(l[i])) {
                    ret.push(o);
                    o = {}
                }
                o.txt = l[i]
                o.id = i

            }
            $scope.linie = ret;

        }).
        error(function(data, status, headers, config) {
            $scope.status = status;
            console.log(data, status, headers, config);
        });
    }

});