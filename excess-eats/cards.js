$.get("http://excesseats-env.us-east-1.elasticbeanstalk.com/eats/order/distance", function(data){
	displayCards(data);
});

$(document).ready(function() {
	$('#sort-by-rating').click(function() {
		$('.card').remove();
		$.get("http://excesseats-env.us-east-1.elasticbeanstalk.com/eats/order/rating", function(data){
			displayCards(data);
		});
	});
	
	$('#sort-by-expire').click(function() {
		$('.card').remove();
		$.get("http://excesseats-env.us-east-1.elasticbeanstalk.com/eats/order/expires", function(data){
			displayCards(data);
		});
	});
	
	$('#sort-by-price').click(function() {
		$('.card').remove();
		$.get("http://excesseats-env.us-east-1.elasticbeanstalk.com/eats/order/price", function(data){
			displayCards(data);
		});
	});
	
	$('#sort-by-distance').click(function() {
		$('.card').remove();
		$.get("http://excesseats-env.us-east-1.elasticbeanstalk.com/eats/order/distance", function(data){
			displayCards(data);
		});
	});
});

function displayCards(data) {
	for (var i = 0; i < data.length; i++) {
		var myCards, card, myContainer, myPrice;
		myCards = $('#my-cards');
	
		card = $('<div class="card"></div>');
		cardImage = $('<img>');
		cardImage.attr("src", data[i].imgUrl);
		cardImage.attr("style", "width:100%; max-height:264px");
		myContainer = $('<div class="container"></div>');
	
		myCards.append(card);
		card.append(cardImage);
		card.append(myContainer);
		myContainer.append('<h4><b>' + data[i].description + '</b></h4>');
		myContainer.append('<p>' + data[i].producer + 
			'<span style="float:right">' + data[i].distanceString + '</span><br>' +
			'<s>' + "$" + data[i].price +'</s>' + 
			'<span style="color:green; font-weight:bold; padding-left:5px">' + "$" + data[i].discountedPrice + '</span>' +
			'<span style="float:right">' + data[i].rating + '\u2B06' + '</span>' +
			'</p>');
	}
}