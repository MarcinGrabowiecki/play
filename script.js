var fileref = document.createElement('script')
fileref.setAttribute("type", "text/javascript")
fileref.setAttribute("src", "http://underscorejs.org/underscore-min.js")
document.getElementsByTagName("head")[0].appendChild(fileref)


function enumerator() {

	this.pupa="11111111111";

    enumerator.interval = 1000;
    enumerator.process = true;
    enumerator.numery = [];

    enumerator.procesuj = function (){

        var nums = $.map($("label.radio"), function(e) {
            return $(e).attr("for").substring(2)
        })

        var nowe = _.difference(nums, enumerator.numery);
        if (nowe.length > 0) console.log(new Date().toUTCString() + ":1: " + nowe.length + " nowe numery:" + nowe)
        enumerator.numery = _.uniq(_.union(enumerator.numery, nums)).sort()

        if (enumerator.process && !ciekawe(nums)) {
            $("a.linkPointer > span:last").trigger("click")
            setTimeout(enumerator.procesuj, enumerator.interval)
        }

    }

    //var everySecond = 0;
    //$("#otherNumber0").bind('DOMSubtreeModified', function() {
    //if(!numerStop&&everySecond++%2) setTimeout(procesuj,200);
    //})

    var filtry = [
        function(n) {
            if (_.uniq(n.split('')).length < 5) return " maloCyferek"
        },
        function(nr) {
            if (_.uniq([nr.substring(0, 3), nr.substring(3, 6), nr.substring(6)]).length < 3) return " sekwencja"
            return ""
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
            var s="01234567890"
            var t="09876543210"
            for(i=0; i<7; i++){
                var reg1 = new RegExp(".*" + s.substring(i,i+5) + ".*");
                var reg2 = new RegExp(".*" + t.substring(i,i+5) + ".*");
                if(reg1.test(nr)) return " "+reg1+" "
                if(reg2.test(nr)) return " "+reg2+" "
            }
        }
    ]


    filtry.push(function(nr) {
        for (i = 0; i < nr.length - 3; i++) {
            var p = nr.substring(i, i + 3)
            var reg = new RegExp(p + ".*" + p + ".*" + p)
            if (reg.test(nr)) return " trzy powtórzenia dwójek"
        }
    })


    filtry.push(function(nr) {
        if (nr == window.szukanyNr) return " szukanyNr"
    })

    filtry.push(function(nr) {
        if (tescik == true) return " !!! break !!! "
    })

    enumerator.printNumery =function() {
        //_.each(numery,function(n){console.log(n)});
        console.log(_.reduce(enumerator.numery, function(a, b) {
            return a + "\n" + b
        }))
    }


    var obsluzoneNumery = []

    function ciekawe(nums) {

    	var r = "";
        _.each(nums, function(nr) {
            _.each(filtry, function(it) {
                if (!_.contains(obsluzoneNumery, nr)&&it(nr)) {
                	r += (nr+" "+it(nr)+"\n")
                	obsluzoneNumery.push(nr);
                }
            })
        })

        if (r.length > 1) {
            alert(r);
            return true;
        }

        return false;
    }

    this.dupa=function(){
    	alert("dupa");
    }

    setTimeout(enumerator.procesuj, 2000)



}



var tescik = false
enumerator()