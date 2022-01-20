const fs = require('fs'); 
const csv = require('csv-parser');
const https = require('https');
const args = process.argv.slice(2);
//Data Structures to hold CSV values
var Index=-1;
var Timestamp=[];
var Transaction=[];
var Token=[];
var Amount=[];
//Extract CSV Values
fs.createReadStream("./transactions.csv")
.pipe(csv())
.on('data', function(data){
    try 
    {
        Index++;
        Timestamp[Index]=data.timestamp;
        Transaction[Index]=data["transaction_type"];
        Token[Index]=data.token;
        Amount[Index]=parseFloat(data.amount);     
    }
    catch(err) {
        console.log("File-size too big to be processed");    
    }
})
.on('end',function()
{
    //Command Terminal
    if(args.length==2)TimeandTokenPortfolio();
    else if(args.length==1)
        {
            if(Number.isInteger(parseInt(args[0])))TimePortfolio();
            else TokenPortfolio();
        }
    else FullPortfolio();    
});

//Given a date and a token, return the portfolio value of that token in USD on that date
TimeandTokenPortfolio=function()
{
    let inputTimestamp=args[0];
    let inputToken=args[1];
    var total=0;
    for(let i=0;i<=Index;i++)
    {
    if(Token[i]==inputToken)
        {
            if(Timestamp[i]>inputTimestamp)break;
            if(Transaction[i]=="DEPOSIT")total+=parseFloat(Amount[i]);
            else if(Transaction[i]=="WITHDRAW")total-=parseFloat(Amount[i]);
        }
    }
    let apiBase="https://min-api.cryptocompare.com/data/price?fsym=";
    let apiKey="&tsyms=USD&api_key=2d216d6c02f07b08973c48969018528905ae696649cd2b256b954f9548f717f9"
    https.get(apiBase+inputToken+apiKey, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
    data += chunk;
    });
    resp.on('end', () => {
    console.log(JSON.parse(data).USD*total);
    });
    }).on("error", (err) => {
  console.log("Error: " + err.message);
    });
}

//Given a date, return the portfolio value per token in USD on that date
TimePortfolio=function()
{
    var distinctToken=[];
    var tokenBalance=[];
    var distinctTokenNumber=-1;
    let inputTimestamp=args[0];
    for(let i=0;i<=Index;i++)
    {
        if(Timestamp[i]>inputTimestamp)break;
        var flag=-1;
        for(var k=0;k<=distinctTokenNumber;k++)
        {
            if(distinctToken[k]==Token[i]){flag=k;break;}
        }
        if(flag==-1)
        {
            distinctTokenNumber++;
            distinctToken[distinctTokenNumber]=Token[i];
            tokenBalance[distinctTokenNumber]=Amount[i];
        }
        else
        {
            if(Transaction[i]==="DEPOSIT")tokenBalance[flag]+=parseFloat(Amount[i]);
            else
            if(Transaction[i]==="WITHDRAW")tokenBalance[flag]-=parseFloat(Amount[i]);
        }  
    }
    for(var l=0;l<=distinctTokenNumber;l++)
    {
        let currentToken=distinctToken[l];
        let currentBalance=tokenBalance[l];
        let apiBase="https://min-api.cryptocompare.com/data/price?fsym=";
        let apiKey="&tsyms=USD&api_key=2d216d6c02f07b08973c48969018528905ae696649cd2b256b954f9548f717f9"
        https.get(apiBase+currentToken+apiKey, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
        data += chunk;
        });
        resp.on('end', () => {
        console.log(currentToken+"=>"+JSON.parse(data).USD*currentBalance);
        });
        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });
    }
}

//Given a token, return the latest portfolio value for that token in USD
TokenPortfolio=function()
{
    let inputToken=args[0];
    var total=0;
    for(let i=0;i<=Index;i++)
    {
        if(Token[i]==inputToken)
        {
            if(Transaction[i]=="DEPOSIT")total+=parseFloat(Amount[i]);
            else if(Transaction[i]=="WITHDRAW")total-=parseFloat(Amount[i]);
        }
    }
    let apiBase="https://min-api.cryptocompare.com/data/price?fsym=";
    let apiKey="&tsyms=USD&api_key=2d216d6c02f07b08973c48969018528905ae696649cd2b256b954f9548f717f9"
    https.get(apiBase+inputToken+apiKey, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
    data += chunk;
    });
    resp.on('end', () => {
    console.log(JSON.parse(data).USD*total);
    });
    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}

//Given no parameters, return the latest portfolio value per token in USD
FullPortfolio=function()
{
    var distinctToken=[];
    var tokenBalance=[];
    var distinctTokenNumber=-1;
    for(let i=0;i<=Index;i++)
    {
        var flag=-1;
        for(var k=0;k<=distinctTokenNumber;k++)
        {
            if(distinctToken[k]==Token[i]){flag=k;break;}
        }
        if(flag==-1)
        {
            distinctTokenNumber++;
            distinctToken[distinctTokenNumber]=Token[i];
            tokenBalance[distinctTokenNumber]=Amount[i];
        }
        else
        {
        if(Transaction[i]==="DEPOSIT")tokenBalance[flag]+=parseFloat(Amount[i]);
        else
        if(Transaction[i]==="WITHDRAW")tokenBalance[flag]-=parseFloat(Amount[i]);
        }  
  }
  for(var l=0;l<=distinctTokenNumber;l++)
  {
    let currentToken=distinctToken[l];
    let currentBalance=tokenBalance[l];
    let apiBase="https://min-api.cryptocompare.com/data/price?fsym=";
    let apiKey="&tsyms=USD&api_key=2d216d6c02f07b08973c48969018528905ae696649cd2b256b954f9548f717f9"
    https.get(apiBase+currentToken+apiKey, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
    data += chunk;
  });
    resp.on('end', () => {
    console.log(currentToken+"=>"+JSON.parse(data).USD*currentBalance);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
  }
}