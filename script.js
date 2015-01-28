// Code goes here

if (1 == 2) {
  var fileref = document.createElement('script')
  fileref.setAttribute("type", "text/javascript")
  fileref.setAttribute("src", "https://rawgit.com/MarcinGrabowiecki/play/master/script.js")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}


var fileref = document.createElement('script')
fileref.setAttribute("type", "text/javascript")
fileref.setAttribute("src", "http://underscorejs.org/underscore-min.js")
document.getElementsByTagName("head")[0].appendChild(fileref)

var numerInterval=1000
var numerStop=false;

  function procesuj(){    
    var numery = $.map($("label.radio"), function(e) {
      return $(e).attr("for").substring(2)
    })
    
    if(!ciekawe(numery)&&!numerStop){
      $("a.linkPointer > span:last").trigger("click")
      setTimeout(procesuj,numerInterval)
    }
    
    if(window.numery===undefined){
      window.numery=numery
    }

    var nowe=_.difference(numery,window.numery);
    if(nowe.length>0) console.log(new Date().toUTCString()+": "+nowe.length+" nowe numery:"+nowe)
    var zbior=_.union(window.numery,numery)
    window.numery=_.uniq(zbior.sort())

  }

//var everySecond = 0;
//$("#otherNumber0").bind('DOMSubtreeModified', function() {
	//if(!numerStop&&everySecond++%2) setTimeout(procesuj,200);
//})


function maloCyfr(n){
  if(_.uniq(n.split('')).length<5) return " maloCyferek"
  return ""
}

function sekwencja(nr){
  if(_.uniq([nr.substring(0, 3), nr.substring(3, 6), nr.substring(6)]).length<3) return " sekwencja"
  return ""
}

var filtry=[maloCyfr,sekwencja];

filtry.push(function(nr){
  for(i=0; i<nr.length-2;i++){
    var p=nr.substring(i,i+2)
    var reg=new RegExp(p+".*"+p+".*"+p)
    if(reg.test(nr)) return " 3Powtórzenia"
  }
  return ""
})



filtry.push(
  function (nr){
  for(i=0;i<10;i++){
    var s=""+i+""+i+""+i+""+i
    if(nr.indexOf(s)>-1) return " potrójne "+s
  }
  return ""
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
  return ""
}
)


filtry.push(function(nr){
    for(i=0; i<nr.length-3;i++){
    var p=nr.substring(i,i+3)
    var reg=new RegExp(p+".*"+p+".*"+p)
    if(reg.test(nr)) return " trzy powtórzenia dwójek"
  }
  return ""
})


filtry.push(function(nr){
  if(nr==window.szukanyNr) return " szukanyNr"
    return ""
})




function printNumery(){
  //_.each(numery,function(n){console.log(n)});
  console.log(_.reduce(numery,function(a,b){return a+"\n"+b}))
}

var obsluzoneNumery=[]

function ciekawe(nums){
//nums=["505151110","720801589","720803979","720804167","720804344","720804347","720804932","720807872","720809285","720811439","720812393","720812608","720812958","720813073","720813144","720814963","720815651","720816619","720816652","720816779","720816842","720816993","720817313","720817602","720817641","720817789","720817859","720818063","720818364","720818876","720818923","720819391","720819975","720821272","720822539","720824045","720824158","720824552","720825107","720825137","720825838","720826053","720826379","720826418","720826551","720826837","720826854","720827106","720827384","720827467","720828064","720828712","720828736","720828894","720829189","720829208","720829210","720829356","720829408","720829563","720829740","720829743","720829769","720829813","720829942","720829948","720830349","720830387","720830613","720830981","720830982","720831021","720831043","720831088","720831204","720831206","720831242","720831259","720831292","720831302","720831426","720831609","720831674","720831751","720833405","720833475","720835083","720836483","720837283","720837485","720837983","720838495","720839209","720839402","720839503","720839783","720839803","720840384","720840536","720841576","720842516","720846536","720846586","720847506","720847584","720847884","720849205","720849207","720849304","720849306","720849308","720849402","720849503","720849506","720849603","720849609","720849706","720849709","720849804","720849903","720850647","720851627","720851647","720852687","720852969","720853617","720853657","720854185","720854385","720854667","720855607","720855627","720856687","720856886","720856985","720857385","720857647","720858677","720859103","720859205","720859208","720859302","720859306","720859405","720859503","720859602","720859617","720859677","720859704","720859705","720859709","720859804","720859907","720859908","720860748","720861486","720861728","720861786","720861798","720862748","720862758","720862798","720863718","720864173","720864286","720864738","720864758","720864786","720864986","720865286","720865965","720866758","720867738","720867758","720868728","720868758","720869105","720869109","720869186","720869202","720869302","720869409","720869768","720869804","720870487","720872819","720872987","720873787","720875899"]
_.each(nums, function(nr) {
  var r="";
  _.each(filtry,function(it){
    r+=it(nr)
  })
  if(r.length>1) { 
    if(_.contains(obsluzoneNumery,nr)) return true;
    obsluzone.push(nr)
    alert(nr+" "+r); return false
  }
  return true;
})
}

//ciekawe()

