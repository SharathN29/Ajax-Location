var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src',
		'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

var lat;
var long;

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getPosition);
	} else {
		$("#content").empty();
		$("#content").html("Geolocation is not supported by this browser.");
	}
}

function getPosition(position) {
	lat = position.coords.latitude;
	long = position.coords.longitude;
	$("#content").empty();
	$("#content").html('Lattitude : ' + lat + '<br /> Longitude : ' + long );
}

function getWeather() {
	$.ajax({
		url:'https://api.openweathermap.org/data/2.5/find?lat='+lat+'&lon='+long+'&cnt=10&appid=7730d133653739fa949dec8ac025885b',
		type: "GET",
		dataType: "json",
		success: function(data) {
			var cities = "";
			$("#content1").empty();
			for(var city = 0; city < data.list.length; city++) {
				var c = data.list[city].name;
				//cities.concat(data.list[city].name);
				
				cities += c;
				cities += "<br/>";
			}
			console.log(cities);
			//$("content1").html(cities);
			document.getElementById("content1").innerHTML = cities;
			
			
		},
		error: function(x) {
			var error_message =JSON.parse(x.responseText);
			$("#content").html(error_message.message);
		}
	});
}

