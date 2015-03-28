var fileref = document.createElement('script')
fileref.setAttribute("type", "text/javascript")
fileref.setAttribute("src", "http://underscorejs.org/underscore-min.js")
document.getElementsByTagName("head")[0].appendChild(fileref)


enr = new function() {

	var _this=this;
    this.interval = 1000;
    this.stop = false;
    this.numery = [];
    this.szukanyNr="aaaaaaaaa"

    this.run = function (){
        var nums = $.map($("label.radio"), function(e) {
            return $(e).attr("for").substring(2)
        })

        var nowe = _.difference(nums, _this.numery);
        if (nowe.length > 0) console.log(new Date().toUTCString() + ":1: " + nowe.length + " nowe numery:" + nowe)
        _this.numery = _.uniq(_this.numery.concat(nums)).sort()

        if (!_this.stop && !ciekawe(nums)) {
            $("a.linkPointer > span:contains(Losuj)").trigger("click")
            setTimeout(enr.run, _this.interval)
        }

    }

    this.resume = function (){
    	_this.stop=false;
    	_this.run();
    }

    var everySecond = 0;
    $("#otherNumber0").bind('DOMSubtreeModified', function(ev) {
        if(everySecond++%2) setTimeout(function(){console.log(ev)},100);
    })

    var filtry = [
        function(n) {
            if (_.uniq(n.split('')).length < 5) return " maloCyferek"
        },
        function(nr) {
            if (_.uniq([nr.substring(0, 3), nr.substring(3, 6), nr.substring(6)]).length < 3) return " sekwencja"
        },
        function(nr) {
            for (i = 0; i < nr.length - 2; i++) {
                var p = nr.substring(i, i + 2)
                var reg = new RegExp(p + ".*" + p + ".*" + p)
                if (reg.test(nr)) return " 3Powtórzenia"
            }
        },
        function(nr) {
            for (i = 0; i < 10; i++) {
                var s = "" + i + i + i + i 
                if (nr.indexOf(s) > -1) return " poczwórne " + s
            }
        },
        function(nr) {
            for (i = 0; i < 10; i++) {
                var s = "" + i + i + i
                if (nr.substring(0, 3).indexOf(s) > -1||nr.substring(3, 6).indexOf(s) > -1||nr.substring(6).indexOf(s) > -1) return " potrójne " + s
            }
        },
        function(nr) {
            var s="01234567890"; var t="09876543210";
            for(i=0; i<7; i++){
                var reg1 = new RegExp(".*" + s.substring(i,i+5) + ".*");
                var reg2 = new RegExp(".*" + t.substring(i,i+5) + ".*");
                if(reg1.test(nr)) return " "+reg1+" "
                if(reg2.test(nr)) return " "+reg2+" "
            }
        },
        function(nr) {
        for (i = 0; i < nr.length - 3; i++) {
            var p = nr.substring(i, i + 3)
            var reg = new RegExp(p + ".*" + p + ".*" + p)
            if (reg.test(nr)) return " trzy powtórzenia dwójek"
          }
        },
        function(nr) {
       		if(nr.split("").sort().join("").indexOf("00000")==0) return "zawiera w sumie cztery zera";
        },
        function(nr) {
        	if (RegExp(_this.szukanyNr).test(nr)) return " szukanyNr "+nr
    	}
    ]

    this.printNr = function() {
        console.log(this.numery.join("\n"));
    }

    var obsluzoneNumery = [];

    function ciekawe(nums) {
        var r=(nums.filter(function(nr){return obsluzoneNumery.indexOf(nr)==-1}).map(function(nr){
            var r=filtry.map(function(f){return f(nr)}).filter(function(v){return v!=undefined})
            if(r.length>0) {obsluzoneNumery.push(nr);return nr+" : "+r};
        })).filter(function(u){return u!=undefined})
        if (r.length > 0) {
            alert(r.join("\n"));
            return true;
        }
        return false;
    }

    this.testNr=function(nr){
        console.log(ciekawe([nr]));
    }

    setTimeout(this.run, 2000)

}

