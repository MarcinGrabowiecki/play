function getData(){

var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
	};

    if(window.re===undefined) return data;

    data.labels=window.re.map(function(v){return v.time});
    var ads = re.map(function(v){return v.address});
    
    return data;

}

window.onload=function(){
	console.log("bla")
	var ctx = document.getElementById("myChart").getContext("2d");
	// This will get the first returned node in the jQuery collection.
	var myNewChart = new Chart(ctx);
	myNewChart.Line(getData());
}


var expandCollapseApp = angular.module('expandCollapseApp', ['ngAnimate']);

skany=[]

expandCollapseApp.controller('expandCollapseCtrl', function($scope, $http, $timeout) {
    $scope.active = true;
    $scope.active1 = true;

    $scope.status = "bla"
    $scope.linie = []

    //var url='http://mjg.dnsd.info/cgi-bin/iwlist'
    var url='http://192.168.1.1/cgi-bin/iwlist'

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
            var now = new Date().getTime()-1427743702624;
            var r = data.split("\n").reduce(function(p,c,i){
                //console.log(c);
                if(/Cell [0-9][0-9]/.test(c)){
                	var match=c.match("Cell (\\d{2}) - Address: (.*)")
                    var cell={idx:ltrim(c),indent:lsize(c),nr:match[1],address:match[2],time:now}
                    p.push(cell)
                } else {
                    var cell=p.slice(-1)[0]
                    //console.log(cell.indent+" - "+lsize(c))
                    cell.indent=lsize(c);
                    //console.log(c.split(':'))
                    //console.log(cell)
                    if(lsize(c)==20 && /Quality=/.test(c)){
                    	match=c.match('Quality=(\\d{2})/(\\d{2}).*Signal level=-(\\d{2})')
                    	cell.quality=parseInt(match[1])
                    	cell.qualityRange=parseInt(match[2])
                    	cell.signal=parseInt(match[3])
                    }

                    if(/^ *ESSID:/.test(c)){
                    	cell.essid=c.match('ESSID:"(.*)"')[1]
                    }
                }
                l={idx:i}
                l.txt=c
                return p;
            },[{txt:'start'}])

            r=r.sort(function(a,b){return a.quality>b.quality})
            re=r
            $scope.linie = r;
            skany[now]=r
            $timeout($scope.load,1000)
        }).
        error(function(data, status, headers, config) {
            $scope.status = status;
            console.log(data, status, headers, config);
        });
    }

}); 