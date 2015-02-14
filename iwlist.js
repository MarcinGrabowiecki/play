var expandCollapseApp = angular.module('expandCollapseApp', ['ngAnimate']);

expandCollapseApp.controller('expandCollapseCtrl', function($scope, $http) {
    $scope.active = true;
    $scope.active1 = true;

    $scope.status = "bla"
    $scope.linie = []

    //var url='http://mjg.dnsd.info/cgi-bin/iwlist'
    var url='http://192.168.1.1/cgi-bin/iwlist'

    function ltrim(s){
    	//return x.replace(/^\s+|\s+$/gm,'');
    	return x.replace(/^\s+/gm,'');
    }


    $scope.load = function() {
    	$scope.status = "w"
        $http.get(url).success(function(data, status, headers, config) {
            $scope.status = status;
            var r = data.split("\n").reduce(function(p,c,i){
                console.log(c)
                if(/Cell [0-9][0-9]/.test(c)){
                    cell={idx:c,txt:"-"+c}
                    p.push(cell)
                } else {
                    cell=p.slice(-1)[0]
                    //console.log(c.split(':'))
                    //console.log(cell)
                }


                l={idx:i}
                l.txt=c
                //p.push(l);
                return p;
            },[{txt:'start'}])
            $scope.linie = r;
        }).
        error(function(data, status, headers, config) {
            $scope.status = status;
            console.log(data, status, headers, config);
        });
    }

});