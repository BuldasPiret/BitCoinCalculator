const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

app.post('/', function(req, res){
    
    let currency = req.body.currency;
    url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;
    console.log(currency);
    //res.send(`You have selected ${currency}`);

    //get bitcoin rates from external API
    request(url, function(error, response, body){
        console.log("Status message: ", response.statusMessage);
        console.log("Server status code", response.statusCode);
        console.log(response.body);

        let data = JSON.parse(response.body);
        let price;
        if(currency == "EUR"){
            price = data.bpi.EUR.rate;
            console.log("Price in EUR ", price);
        }else {
            price = data.bpi.USD.rate
            console.log("Price in USD ", price);
        }

        let disclaimer = data.disclaimer;

        res.write(`${disclaimer}`);
        res.write(`<br>`);
        res.write(`Current prize in ${currency} is ${price}`);
        res.send();


    });


});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

