//Run this script on the browser console


var startPage=1
var stopPage=0;



(function(console) {
    console.save = function(data, filename){
        if(!data) {
            console.error('Console.save: No data')
            return;
        }
        if(!filename) filename = 'console.html'
        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }
        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)


var total = []
async function get(page) {
  console.log("Current page", page)
  var result = await fetch("https://gitcoin.co/api/v0.1/users_fetch/?page=" + page, {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "es-AR,es;q=0.8,en-US;q=0.5,en;q=0.3",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1"
    },
    "method": "GET",
    "mode": "cors"
  });
  try {
    var r = await result.json()
    console.log(r)
    var users = r.data
    console.log(users)

console.save(users,"page-"+page+".json")
    
    total = [...total, ...users]
    if((stopPage==0 && users.length !== 0) || (stopPage!==0 && page<=stopPage)){
       get(page + 1)
    }

		 else {
      console.log(total)
    	window.location.href = "https://gitcoin.co/api/v0.1/users_fetch/?page=" + page
    }
  } catch (e) {
    console.log("Captcha required")
    console.log(total)
    window.location.href = "https://gitcoin.co/api/v0.1/users_fetch/?page=" + page
  }
  
}


var params = new URLSearchParams(window.location.search);
var px = params.get('page') | startPage
get(px)
