var http;
var colors = [
    ["#808080", "#f08080"],
    ["#2f4f4f", "#cdcdc1"],
    ["#F3E4C3", "#191970"],
    ["#DD5C3D", "#495496"],
    ["#ffbdbd", "#bdffff"],
    ["#c9c9ff", "#282833"],
    ["#fff5ee", "#4682b4"]
]
var num = 0;
var temperature;

$(document).ready(function(){
	$.ajax({
		url: "http://api.ipstack.com/67.254.16.39?access_key=5e57d4c12b7c4f5385077c78c5c9fb68",
		cache: false,
		data: 'jsonp',
		success: function(data){
			var http = "https://api.darksky.net/forecast/43fdf11c01cc082e76946f315a89d013/"+data.latitude+","+data.longitude;
			//data sort out
			$.ajax({
				url: http,
				cache: false,
				crossDomain: true,
				dataType: 'jsonp',
				success: function(json){
					var location = (json.timezone).replace('_',' ').split('/');
					var city = location[1];
					var icon = json.currently.icon;
					temperature = parseFloat((json.currently.temperature).toFixed(1));
					$("#temp").html(temperature+"F");
					$("#city").html(city);
					$("#description").html(json.currently.summary);

					switch(icon){
						case "clear-day":
							$("#icon").html("<i class=\"wi wi-day-sunny\"></i>");
							 break;
                        case "clear-night":
                            $("#icon").html("<i class=\"wi wi-night-clear\"></i>");
                            break;
                        case "rain":
                            $("#icon").html("<i class=\"wi wi-rain\"></i>");
                            break;
                        case "snow":
                            $("#icon").html("<i class=\"wi wi-snow\"></i>");
                            break;
                        case "sleet":
                            $("#icon").html("<i class=\"wi wi-sleet\"></i>");
                            break;
                        case "wind":
                            $("#icon").html("<i class=\"wi wi-windy\"></i>");
                            break;
                        case "fog":
                            $("#icon").html("<i class=\"wi wi-fog\"></i>");
                            break;
                        case "cloudy":
                            $("#icon").html("<i class=\"wi wi-cloudy\"></i>");
                            break;
                        case "partly-cloudy-day":
                            $("#icon").html("<i class=\"wi wi-day-cloudy\"></i>");
                            break;
                        case "partly-cloudy-night":
                            $("#icon").html("<i class=\"wi wi-night-alt-partly-cloudy\"></i>");
                            break;
                        default:
                            $("#icon").html("<i class=\"wi wi-na\"></i>");
					}
				}
			})
		}
	}); //ajax for geo loc and weather data closed
		$("#f").click(function(){
			$("#temp").html(temperature+"F");
		});
		$("#c").click(function(){
			$("#temp").html(parseFloat((5/9) * (temperature-32)).toFixed(1)+"C")
		}); //fc button setting

		$("#refresh").click(function(){
			$("section").animate({
                backgroundColor: colors[num % colors.length][1],
            }, 500);
	        $("body").animate({
	                backgroundColor: colors[num % colors.length][0],
	            }, 500);
	        $("section").css("color", colors[num % colors.length][0]);
	        num++;
			}) //refresh button setting

		$(".box").delay(1500).fadeIn(1000); //box animation setting

})//js closed