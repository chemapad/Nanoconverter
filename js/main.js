var btn = document.getElementById('btn');
var preciodolar;
var xrbpriceUSD;
var xrbpricebitcoin;
var ethpricebitcoin;
var bccpricebitcoin;
var dogepricebitcoin;
var eurpricebitcoin;
var e = document.getElementById("opciones");
var opcion = e.options[e.selectedIndex].value;


var template = '<p>precio: :precio: <br> :preciousd:</p>' ;


var coinmarketRequestxrb = new XMLHttpRequest ();
coinmarketRequestxrb.open('GET', 'https://api.coinmarketcap.com/v1/ticker/Raiblocks/');
coinmarketRequestxrb.onload = function(){
	var ourdata= JSON.parse(coinmarketRequestxrb.responseText);
  xrbpricebitcoin= parseFloat(ourdata[0].price_btc); 
	xrbpriceUSD = parseFloat(ourdata[0].price_usd); 
	 
};

coinmarketRequestxrb.send(); 


var coinmarketRequesteur = new XMLHttpRequest ();
coinmarketRequesteur.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice/EUR.json');
coinmarketRequesteur.onload = function(){
  var ourdata= JSON.parse(coinmarketRequesteur.responseText);
  eurpricebitcoin= parseFloat(ourdata['bpi']['EUR'].rate_float);
   
};

coinmarketRequesteur.send();



var coinmarketRequesteth = new XMLHttpRequest ();
coinmarketRequesteth.open('GET', 'https://api.coinmarketcap.com/v1/ticker/Ethereum/');
coinmarketRequesteth.onload = function(){
  var ourdata= JSON.parse(coinmarketRequesteth.responseText);
  ethpricebitcoin= parseFloat(ourdata[0].price_btc);
   
};

coinmarketRequesteth.send();

var coinmarketRequestbcc = new XMLHttpRequest ();
coinmarketRequestbcc.open('GET', 'https://api.coinmarketcap.com/v1/ticker/Bitcoin-cash/');
coinmarketRequestbcc.onload = function(){
  var ourdata= JSON.parse(coinmarketRequestbcc.responseText);
  bccpricebitcoin= parseFloat(ourdata[0].price_btc);
   
};

coinmarketRequestbcc.send();


var coinmarketRequestdoge = new XMLHttpRequest ();
coinmarketRequestdoge.open('GET', 'https://api.coinmarketcap.com/v1/ticker/dogecoin/');
coinmarketRequestdoge.onload = function(){
  var ourdata= JSON.parse(coinmarketRequestdoge.responseText);
  dogepricebitcoin= parseFloat(ourdata[0].price_btc);
   
};

coinmarketRequestdoge.send();


var dolartodayRequest = new XMLHttpRequest();
dolartodayRequest.open('GET', 'https://s3.amazonaws.com/dolartoday/data.json');
dolartodayRequest.onload = function () {
	var datadolar = JSON.parse(dolartodayRequest.responseText);
	 preciodolar = datadolar.USD.bitcoin_ref;
	calculadora();
}

dolartodayRequest.send();

function calculadora (dolarprecio, xrbprecio ){
	var xrb= Number(preciodolar) * xrbpriceUSD;	
	var $tvShowsContainer = $('#appdolar').find('#dolartoday');
	/*$('#dolartoday')
    .find('form')
    .submit(function (ev) {
      ev.preventDefault();*/
      var busqueda = $('.input-group')
        .find('input[type="number"]')
        .val();
        
        var h=document.getElementById("boton");
        h.addEventListener('click', function () {


       


        // Xrb-Bitcoin

         /*if (opcion==1) {
          var z= busqueda*xrbpricebitcoin;
          document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ z + ' BTC'; 
        }*/
        var e = document.getElementById("opciones");
        var y = e.options[e.selectedIndex].value;

        if (y==1) {
            $(document).ready(function(){
              $("form").submit(function(){
                   var z= busqueda*xrbpricebitcoin;
           
            document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ z + ' BTC'; 
             });
          });
        }


        e.addEventListener('change',
            function(){    
            var y = e.options[e.selectedIndex].value;
          //XRB-BTC
          if (y==1) {
            $(document).ready(function(){
              $("form").submit(function(){
                   var z= busqueda*xrbpricebitcoin;
           
            document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ z + ' BTC'; 
             });
          });
        }

        //Xrb-Eth
        if (y==2) {
          $(document).ready(function(){
              $('form').submit(function(){
                var xrbpriceeth= xrbpricebitcoin/ethpricebitcoin;
                var z = busqueda*xrbpriceeth;
                document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ z +'ETH' ;
             });
          });
         
        }
          
         
        
        //XRB-BCH
        if (y==3) {

          var xrbpricebcc= xrbpricebitcoin/bccpricebitcoin;
          var z = busqueda*xrbpricebcc;
          document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ z +'BCH' ;

        }
        //XRB-DOGE
        if (y==4) {

          var xrbpricedoge= xrbpricebitcoin/dogepricebitcoin;
          var z = busqueda*xrbpricedoge;
          document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ z
           +'DOGE' ;

        }

        // Xrb-Dollar
        if (y==5) {
          var x = busqueda * xrbpriceUSD;
          document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ x + '$' ; 


        }if (y==6) {
          var x = xrbpricebitcoin * eurpricebitcoin;
          var  y = busqueda * x;
          //var z = accounting.formatMoney(y, "Bsf ", 2, ".", ",");
          document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ y + '€' ; 

          //Xrb-Bolivar
        }if (y==7) {
            var x = busqueda * xrbpriceUSD;
            var  y = busqueda * xrb;
            var z = accounting.formatMoney(y, "Bsf ", 2, ".", ",");
            document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ z ; 
        }
             
              });
        

      /* var article = template
          .replace(':precio:', z)*/
         
       /* if (opcion==1) {
          var z= busqueda*xrbpricebitcoin;
          document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ z + ' BTC';
          var article = template
          .replace(':precio:', z)
        }
         if (opcion==2) {
          var xrbpriceeth= xrbpricebitcoin/ethpricebitcoin;
          var z = busqueda*xrbpriceeth;
          document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ z +'ETH' ;
          var article = template
          .replace(':precio:', z)
        }*/
         
         
	  		
       
          
         
       
       // document.getElementById("lol2").innerHTML = busqueda+' XRB '+ '  = ' + a; 
        
	

});


if (xrbpriceUSD==undefined) {
	var intervalo= setInterval (calculadora, 500);
}else {
	document.getElementById("dolar").innerHTML = 'Coinmarketcap Raiblocks:' ;
     document.getElementById("calendario").innerHTML = xrbpriceUSD+ '$ '  +'/ '+ xrbpricebitcoin+' BTC' ;
} ;

};


