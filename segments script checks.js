var tagOnThePage;

_pbjsGlobals.map(hb=>hb===pbjs?checkPbjs():notStandard(hb));

function checkPbjs(){
if(pbjs.adUnits.length>0){
    console.log('%cpbjs found',"color:green;", pbjs.version)
pbjs.adUnits.map(slot=>slotDetails(slot));
}else{
    console.log('%cThis is a server 2 server pbjs wrapper or a custom headerBidding wrapper', "color:red;");
    notStandard()
  }
};

function notStandard(hb){
  var cPbjs=eval(hb);
    console.log('%cname of the custom wrapper: ','color:red',hb);
    !!cPbjs.adUnits?console.log('%cthis wrapper has potential to be compatible with Segments, please talk to product','color:orange;'):console.log('this wrapper does not have an adunits property, is likely s2s or a custom wrapper');
    console.log(cPbjs.adUnits);
    cPbjs.adUnits.map(slot=>slotDetails(slot));
};

function slotDetails(slot){
console.log('%cadunit: ',"color:orange;", slot.code);

slot.bids.map(bid=>checkBidder(bid));
}

function checkBidder(bid){
if(bid.bidder=='sovrn'){
console.log('this adunit has sovrn as a bidder, see params: ', bid.params);
}



};
function tagOnThePage(tagOnPage,tagPosition,indexGtp,indexOneTag,indexPrebid){
    (tagOnPage)? tagFound(tagOnPage,tagPosition,indexGtp,indexOneTag,indexPrebid):tagNotFound
}

function tagFound(tagOnPage,tagPosition,indexGtp,indexOneTag,indexPrebid){
    console.log(indexGtp, 'doubleclick.net');
    console.log(indexOneTag, 'onetag');
    console.log(indexPrebid, 'pbjs');
    const fruits = [indexGtp +'gtp script', indexOneTag+'Signal tag script', indexPrebid+'HB script'];
    console.log(tagPosition);
    console.log(fruits.sort());
}
var count=0;
var tagPosition;
var arrHead = document.head.outerHTML.split(/></g);//split removes the >< so we need to determine where to put them back in.
var arrBody = document.body.outerHTML.split(/></g);
function compareSequenceOfScripts(arr){
    //split html into array of tags
    
    
for(var i = 0; i < arr.length; i++){
  if(arr[i].substring(0, 1) != '<'){
    arr[i] = '<' + arr[i];
  }

  if(arr[i].slice(-1) != '>'){
    arr[i] = arr[i] + '>';
  }
}
    //crate an array of elements and keep the scripts only
    var scriptArr = [];
    arr.forEach(el=> el.includes('\x3Cscript')&&scriptArr.push(el));

    //serach for doubleclick.net
    var indexGtp = scriptArr.findIndex(el => el.includes('doubleclick.net'));
    
    // console.log(scriptArr);
    //serach for sovrn tag
    var indexOneTag = scriptArr.findIndex(el => el.includes('get.s-onetag.com/'));
   
    (indexOneTag>-1)?tagOnPage=1:tagOnPage=0
  
    if (!indexOneTag&&count<3){
        count++;
        (count=1)&&compareSequenceOfScripts(arrBody)
        (count=2)&&compareSequenceOfScripts(arrBody)
    }

    //search for prebid
    var indexPrebid = scriptArr.findIndex(el => el.includes('prebid.js'));
      //validate if the tag is on the page 
    tagOnThePage(tagOnPage,tagPosition,indexOneTag,indexGtp,indexPrebid);
}
compareSequenceOfScripts(arrHead);
