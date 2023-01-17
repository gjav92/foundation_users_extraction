//Run this script on the browser console

var total=[]
async function get(offset){
  var result=await fetch("https://hasura2.foundation.app/v1/graphql", {
      "credentials": "omit",
      "headers": {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0",
          "Accept": "*/*",
          "Accept-Language": "es-AR,es;q=0.8,en-US;q=0.5,en;q=0.3",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "no-cors",
          "Sec-Fetch-Site": "same-site",
          "content-type": "application/json",
          "Pragma": "no-cache",
          "Cache-Control": "no-cache"
      },
      "referrer": "https://foundation.app/",
      "body": "{\"query\":\"\\n    query TrendingCreators($orderBy: trending_creator_order_by!, $offset: Int!, $limit: Int!) @cached(ttl: 300) {\\n  items: trending_creator(\\n    order_by: [$orderBy]\\n    offset: $offset\\n    limit: $limit\\n    where: {user: {moderationStatus: {_eq: \\\"ACTIVE\\\"}}}\\n  ) {\\n    oneDayVol\\n    oneDayNumSold\\n    oneDayCollectors\\n    oneDayPrimaryVol\\n    oneDaySecondaryVol\\n    oneWeekVol\\n    oneWeekNumSold\\n    oneWeekCollectors\\n    oneWeekPrimaryVol\\n    oneWeekSecondaryVol\\n    oneMonthVol\\n    oneMonthNumSold\\n    oneMonthCollectors\\n    oneMonthPrimaryVol\\n    oneMonthSecondaryVol\\n    totalVol\\n    totalNumSold\\n    totalCollectors\\n    totalPrimaryVol\\n    totalSecondaryVol\\n    user {\\n      name\\n      profileImageUrl\\n      publicKey\\n      username\\n    }\\n  }\\n}\\n    \",\"variables\":{\"limit\":1000,\"offset\":"+offset+",\"orderBy\":{\"oneDayVol\":\"desc\"}}}",
      "method": "POST",
      "mode": "cors"
  });
  var r=await result.json()
//   var users=r.data.items.map(e=>{
//     return e.user.username
//   })
  var users=r.data.items
  console.log(users)
  total=[...total,...users]
  if(users.length!==0){
//   if(offset<5000){
  	get(offset+1000)
  }
  else{
    console.log(total)
  }
}

get(0)