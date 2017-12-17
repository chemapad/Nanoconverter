var preciodolar;
var xrbpriceUSD;
var xrbpricebitcoin;
var ethpricebitcoin;
var bccpricebitcoin;
var dogepricebitcoin;
var eurpricebitcoin;



var coinmarketRequestxrb = new XMLHttpRequest();
coinmarketRequestxrb.open('GET', 'https://api.coinmarketcap.com/v1/ticker/Raiblocks/');
coinmarketRequestxrb.onload = function () {
    var ourdata = JSON.parse(coinmarketRequestxrb.responseText);
    xrbpricebitcoin = parseFloat(ourdata[0].price_btc);
    xrbpriceUSD = parseFloat(ourdata[0].price_usd);

};

coinmarketRequestxrb.send();


var coinmarketRequesteur = new XMLHttpRequest();
coinmarketRequesteur.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice/EUR.json');
coinmarketRequesteur.onload = function () {
    var ourdata = JSON.parse(coinmarketRequesteur.responseText);
    eurpricebitcoin = parseFloat(ourdata['bpi']['EUR'].rate_float);

};

coinmarketRequesteur.send();


var coinmarketRequesteth = new XMLHttpRequest();
coinmarketRequesteth.open('GET', 'https://api.coinmarketcap.com/v1/ticker/Ethereum/');
coinmarketRequesteth.onload = function () {
    var ourdata = JSON.parse(coinmarketRequesteth.responseText);
    ethpricebitcoin = parseFloat(ourdata[0].price_btc);

};

coinmarketRequesteth.send();

var coinmarketRequestbcc = new XMLHttpRequest();
coinmarketRequestbcc.open('GET', 'https://api.coinmarketcap.com/v1/ticker/Bitcoin-cash/');
coinmarketRequestbcc.onload = function () {
    var ourdata = JSON.parse(coinmarketRequestbcc.responseText);
    bccpricebitcoin = parseFloat(ourdata[0].price_btc);

};

coinmarketRequestbcc.send();


var coinmarketRequestdoge = new XMLHttpRequest();
coinmarketRequestdoge.open('GET', 'https://api.coinmarketcap.com/v1/ticker/dogecoin/');
coinmarketRequestdoge.onload = function () {
    var ourdata = JSON.parse(coinmarketRequestdoge.responseText);
    dogepricebitcoin = parseFloat(ourdata[0].price_btc);

};

coinmarketRequestdoge.send();


var dolartodayRequest = new XMLHttpRequest();
dolartodayRequest.open('GET', 'https://s3.amazonaws.com/dolartoday/data.json');
dolartodayRequest.onload = function () {
    var datadolar = JSON.parse(dolartodayRequest.responseText);
    preciodolar = datadolar.USD.bitcoin_ref;
}

dolartodayRequest.send();
var selected = 1; //bitcoin by default
$('#opciones').on('change', function () {
    selected = Number(this.value);
});


function calculadora() {
    var xrb = Number(preciodolar) * xrbpriceUSD;
    var amount = $('.input-group')
        .find('input[type="number"]')
        .val();
    var html = amount + ' XRB ' + '  = ';
    switch (selected) {
        case 1:
            //XRB-BTC
            html+= (amount * xrbpricebitcoin) + ' BTC';
            console.log(amount * xrbpricebitcoin);
            break;
        case 2:
            //XRB-ETH
            html += (amount * (xrbpricebitcoin / ethpricebitcoin)) + ' ETH';
            break;
        case 3:
            //XRB-BCH
            html += (amount * (xrbpricebitcoin / bccpricebitcoin)) + ' BCH';
            break;
        case 4:
            //XRB-DOGE
            html += (amount * (xrbpricebitcoin / dogepricebitcoin)) + ' DOGE';
            break;
        case 5:
            //XRB-USD
            html += (amount * xrbpriceUSD) + ' $';
            break;
        case 6:
            //XRB-EUR
            html += (amount * (xrbpricebitcoin * eurpricebitcoin)) + ' €'
            break;
        case 7:
            //XRB-VEF
            html += (accounting.formatMoney(amount * xrb, "Bsf ", 2, ".", ","))
            break;
    }
    document.getElementById("lol").innerHTML = html;

    if (xrbpriceUSD == undefined) {
        setInterval(calculadora, 500);
    } else {
        document.getElementById("dolar").innerHTML = 'Coinmarketcap Raiblocks:';
        document.getElementById("calendario").innerHTML = xrbpriceUSD + '$ ' + '/ ' + xrbpricebitcoin + ' BTC';
    }
}


