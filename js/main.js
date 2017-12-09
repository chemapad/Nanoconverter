var btn = document.getElementById('btn');
var preciodolar;
var xrbpriceUSD;
var template = '<p>precio: :precio:</p>' ;


var coinmarketRequest = new XMLHttpRequest ();
coinmarketRequest.open('GET', 'https://api.coinmarketcap.com/v1/ticker/Raiblocks/');
coinmarketRequest.onload = function(){
	var ourdata= JSON.parse(coinmarketRequest.responseText);
	xrbpriceUSD = parseFloat(ourdata[0].price_usd); 
	 
};

coinmarketRequest.send();



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
	$('#dolartoday')
    .find('form')
    .submit(function (ev) {
      ev.preventDefault();
      var busqueda = $(this)
        .find('input[type="number"]')
        .val();
         var  y = busqueda * xrb;
         var z = accounting.formatMoney(y, "Bsf ", 2, ".", ",");
	  		var article = template
       
          .replace(':precio:', z)
          
          
        document.getElementById("lol").innerHTML = busqueda+' XRB '+ '  = '+ z ; 
        
	

});
   
if (xrbpriceUSD==undefined) {
	var intervalo= setInterval (calculadora, 500);
}else {
	document.getElementById("dolar").innerHTML = '$: '+preciodolar+ 'VEF' ;
     document.getElementById("calendario").innerHTML = 'Xrb: ' +xrbpriceUSD+ '$' ;
} ;

};


