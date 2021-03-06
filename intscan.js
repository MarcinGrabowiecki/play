var expandCollapseApp = angular.module('expandCollapseApp', ['ngAnimate']);

expandCollapseApp.controller('expandCollapseCtrl', function($scope, $http) {
    $scope.active = true;
    $scope.active1 = true;

    $scope.status = "bla"
    $scope.linie = []

    var url='http://mjg.dnsd.info/cgi-bin/intscan'
    //var url='http://192.168.1.1/cgi-bin/intscan'

    function ltrim(s){
    	//return x.replace(/^\s+|\s+$/gm,'');
    	return s.replace(/^\s+/gm,'');
    }

    function lsize(s){
    	return s.length-ltrim(s).length
    }

    $scope.load = function() {
    	$scope.status = "w"
        $http.get(url).success(function(data, status, headers, config) {
            $scope.status = status;
            var r = data.split("\n").reduce(function(p,c,i){
                re=/Link.Quality=([0-9][0-9]).([0-9][0-9]).*Signal level=-(..)/
                if(re.test(c)){
                    match=c.match(re)
                    p.push({id:i,txt:c,val:match[1],max:match[2],dbi:match[3]})
                }
                return p;
            },[{txt:'start'}])
            console.log(r)
            $scope.linie = r;
        }).
        error(function(data, status, headers, config) {
            $scope.status = status;
            console.log(data, status, headers, config);
        });
    }

});