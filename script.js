function enumerator(){

var interval=1000
var process=true;
var numery=[];

  function procesuj(){
 
    var nums = $.map($("label.radio"), function(e) {
      return $(e).attr("for").substring(2)
    })
    
    var isCiekawy=ciekawe(nums);

    var nowe=_.difference(nums,numery);
    if(nowe.length>0) console.log(new Date().toUTCString()+":1: "+nowe.length+" nowe numery:"+nowe)
    numery=_.uniq(_.union(numery,nums)).sort()

    if(process&&!isCiekawy){
      $("a.linkPointer > span:last").trigger("click")
      setTimeout(procesuj,interval)
    }
    
  }

//var everySecond = 0;
//$("#otherNumber0").bind('DOMSubtreeModified', function() {
	//if(!numerStop&&everySecond++%2) setTimeout(procesuj,200);
//})


var filtry=[
function(n){
  if(_.uniq(n.split('')).length<5) return " maloCyferek"
},
function(n){
  if(_.uniq(n.split('')).length<6) return " maloCyferek x"
},
function(nr){
  if(_.uniq([nr.substring(0, 3), nr.substring(3, 6), nr.substring(6)]).length<3) return " sekwencja"
  return ""
}
]


filtry.push(function(nr){
  for(i=0; i<nr.length-2;i++){
    var p=nr.substring(i,i+2)
    var reg=new RegExp(p+".*"+p+".*"+p)
    if(reg.test(nr)) return " 3Powtórzenia"
  }
})


filtry.push(
  function (nr){
  for(i=0;i<10;i++){
    var s=""+i+""+i+""+i+""+i
    if(nr.indexOf(s)>-1) return " potrójne "+s
  }
  }
)

filtry.push(
  function(nr){
  if(/12345/.test(nr)) return " Rosnacy"
  if(/23456/.test(nr)) return " Rosnacy"
  if(/34567/.test(nr)) return " Rosnacy"
  if(/45678/.test(nr)) return " Rosnacy"
  if(/56789/.test(nr)) return " Rosnacy"
  if(/67890/.test(nr)) return " Rosnacy"
}
)


filtry.push(function(nr){
    for(i=0; i<nr.length-3;i++){
    var p=nr.substring(i,i+3)
    var reg=new RegExp(p+".*"+p+".*"+p)
    if(reg.test(nr)) return " trzy powtórzenia dwójek"
  }
})


filtry.push(function(nr){
  if(nr==window.szukanyNr) return " szukanyNr"
})

filtry.push(function(nr){
  if(tescik==true) return " !!! break !!! "
})

function printNumery(){
  //_.each(numery,function(n){console.log(n)});
  console.log(_.reduce(numery,function(a,b){return a+"\n"+b}))
}

var obsluzoneNumery=[]

function ciekawe(nums){
_.each(nums, function(nr) {
  var r="";
  _.each(filtry,function(it){
    if(!it(nr)===undefined) r+=it(nr)
  })
  if(r.length>1) {
    if(_.contains(obsluzoneNumery,nr)) return false;
    obsluzoneNumery.push(nr);
    alert(nr+" "+r);
    return true;
  }
})
return false;
}
	setTimeout(procesuj,2000)
	//ciekawe()
	console.log(this);
	funkcja=this;
}


var fileref = document.createElement('script')
fileref.setAttribute("type", "text/javascript")
fileref.setAttribute("src", "http://underscorejs.org/underscore-min.js")
document.getElementsByTagName("head")[0].appendChild(fileref)

var tescik=false
enumerator()

