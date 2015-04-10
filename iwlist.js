function getData(){

var colorIndex=0;
function addColor(o){
	var colors = ['166,206,227','31,120,180','178,223,138','51,160,44','251,154,153','227,26,28','253,191,111','255,127,0','202,178,214','106,61,154','255,255,153','177,89,40'];
	o.fillColor='rgba('+colors[colorIndex%11]+',0.15)'
	o.strokeColor='rgb('+colors[colorIndex%11]+')'
	o.pointColor='rgb('+colors[colorIndex%11]+')'
	o.pointHighlightStroke='rgb('+colors[colorIndex%11]+')'
	o.pointStrokeColor="#fff"
	o.pointHighlightFill="#fff"
	colorIndex++
	return o;
}


var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "220,220,220,0.2)",
            strokeColor: "220,220,220,1)",
            pointColor: "220,220,220,1)",pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "220,220,220,1)",
            data: [10,20,30]
        }
    ]
	};

	data={datasets:[]};

    if(window.re===undefined) return data;

    //data.labels=window.re.map(function(v){return v.time});
    data.labels=Object.keys(skany)
    //var ads = re.map(function(v){return v.address});    
	//var 	= re.map(function(v){console.log(v);if(v.essid=='FE:94:E3:32:0B:D5') return 100; return 0})
	//
	//data.datasets[0].data=skany.map(function(v){return v.reduce(function(a,b,c){console.log(a,b);if(a.address=="FE:94:E3:32:0B:D5")return a; return b}).quality});
	var adresy={}
	skany.map(function(v){v.map(function(c){adresy[c.address]=c.essid})})
    
    Object.keys(adresy).map(function(adres){
    	
    	var quals=skany.map(function(skan){
				return skan.reduce(function(a,b){
					if(a.address==adres) return a;
					return b;
				}).quality
    	})
    	
//    	console.log(adres,quals)
    	
    	data.datasets.push(addColor(
    		{
    			label:"wifi:"+adres+" "+adresy[adres],
    			data:quals
    		})
    	)
    })

    console.log(data);
    return data;
}



function fillPlot(){
	myNewChart.Line(getData());
}

var myNewChart;

window.onload = function (){
	Chart.defaults.global.animation = false;
	var ctx = document.getElementById("myChart").getContext("2d");
	myNewChart = new Chart(ctx);
}


var expandCollapseApp = angular.module('expandCollapseApp', ['ngAnimate']);

skany=[]

expandCollapseApp.controller('expandCollapseCtrl', function($scope, $http, $timeout) {
    $scope.active = true;
    $scope.active1 = true;

    $scope.status = "bla"
    $scope.linie = []

    var url='http://mjg.dnsd.info/cgi-bin/iwlist'
    //var url='http://192.168.1.1/cgi-bin/iwlist'

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
                console.log(c);
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

                    if(/^ *Extra: Last beacon:.*ms ago/.test(c)){
                    	cell.beacon=c.match('Extra: Last beacon: (\\d*)ms ago')[1]
                    }

                    if(/^ *Encryption key:/.test(c)){
                    	cell.encryptionKey=c.match('Encryption key:(.*)')[1]
                    }

                    if(/^ *Frequency:.* GHz .Channel/.test(c)){
                    	var m="Frequency:(2.\\d*) GHz .Channel (\\d*)."
                    	cell.frequency=c.match(m)[1]
                    	cell.channel=c.match(m)[2]
                    }

                    if(cell.bitRatesNext==2){
                    	cell.bitRates+=c;
                    	delete cell.bitRatesNext;
                    	return;
                    }

                    if(cell.bitRatesNext==1){
                    	cell.bitRates+=c;
                    	cell.bitRatesNext=2;
                    	return;
                    }

                    if(/^ *Bit Rates:/.test(c)){
                    	cell.bitRates=c;
                    	console.log(p,c)
                    	cell.bitRatesNext=1;
                    	return;
                    }


                }
                l={idx:i}
                l.txt=c
                return p;
            },[{txt:'start'}])

            r=r.sort(function(a,b){return a.quality>b.quality})
            re=r
            $scope.linie = r;
            skany.push(r);
            $timeout($scope.load,5000);
        }).
        error(function(data, status, headers, config) {
            $scope.status = status;
            console.log(data, status, headers, config);
        });
    }

}); 