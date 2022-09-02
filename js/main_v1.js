//Date in dd/mm format
function dateFormat(date) { 
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var day  = date.getDate(); 
    var monthIndex = date.getMonth();
    return day + ' ' + months[monthIndex];     
} 

var date = document.getElementById('date');
date.innerHTML =  dateFormat(new Date());



function getCurrentTemp() {
	var currentTemp = (responseObject[0]["Temperature"]["Metric"]["Value"]);
	var el = document.getElementById('current');
	el.innerHTML = Math.round(currentTemp) + "°";
}

//get Low Temp
function getLowTemp() {
	var lowTemp = (responseObject["DailyForecasts"][0]["Temperature"]["Minimum"]["Value"]);
	var el = document.getElementById("low_temp");
	el.innerHTML = Math.round((lowTemp - 32) * (5/9));
}

//get High Temp
function getHighTemp() {
	var highTemp = (responseObject["DailyForecasts"][0]["Temperature"]["Maximum"]["Value"]);
	var el = document.getElementById("high_temp");
	el.innerHTML = Math.round((highTemp - 32) * (5/9));
}

function getUvIndex() {
	var uvIndex = (responseObject[0]["UVIndex"]);
	var el = document.getElementById("uv");
	el.innerHTML = ("UV Index: " + uvIndex);
}

function getBreakdown() {
	var breakdown = [responseObject[0]["WeatherText"]];
}

//Icon no
function iconNum() {
	
	// var array of imgs
	var imgArray = new Array();

	imgArray[0] = new Image();
	imgArray[0].src = 'img/icon_sunny.png';

	imgArray[1] = new Image();
	imgArray[1].src = 'img/icon_partly_cloudy.png';

	imgArray[2] = new Image();
	imgArray[2].src = 'img/icon_cloudy.png';

	imgArray[3] = new Image();
	imgArray[3].src = 'img/icon_rainy.png';
    
    imgArray[4] = new Image();
	imgArray[4].src = 'img/icon_rain_sun.png';

	imgArray[5] = new Image();
	imgArray[5].src = 'img/icon_thunder.png';

	imgArray[6] = new Image();
	imgArray[6].src = 'img/icon_snow.png';

	imgArray[7] = new Image();
	imgArray[7].src = 'img/icon_night_clear.png';

	imgArray[8] = new Image();
	imgArray[8].src = 'img/icon_night_partly_cloudy.png';

	imgArray[9] = new Image();
	imgArray[9].src = 'img/icon_night_partly_cloudy_showers.png';
    
	var num = [responseObject[0]["WeatherIcon"]];

	//WEATHER ICON NUMBER FROM ACCUWEATHER API
	var sunny = [1, 2];
	var partlyCloudy = [3, 4, 5];
	var cloudy = [6, 7, 8, 11];
	var rainy  = [12, 13, 18, 19, 20, 25, 26, 29, 38, 40, 43];
	var partlyCloudyRain = [14,21];
	var thunder = [15, 16, 17, 41, 42];
	var snow = [22, 23, 44];
	var clear = [33, 34];
	var partlyCloudyNight = [35, 36, 37];
	var partlyCloudyRainNight = [39];

	var imgRep = document.getElementById("weather_icons_img");

	for(var i = 0; i < sunny.length; i++) {
		if(num == sunny[i]) {
			imgRep.src = imgArray[0].src;
		}		
	}

	for(var i = 0; i < partlyCloudy.length; i++) {
		if(num == partlyCloudy[i]) {
			imgRep.src = imgArray[1].src;
		}		
	}

	for(var i = 0; i < cloudy.length; i++) {
		if(num == cloudy[i]) {
			imgRep.src = imgArray[2].src;
		}
	}

	for (var i = 0; i < rainy.length; i++) {
		if(num == rainy[i]) {
			imgRep.src = imgArray[3].src;	
		} 
	};

	for (var i = 0; i < partlyCloudyRain.length; i++) {
		if(num == partlyCloudyRain[i]) {
			imgRep.src = imgArray[4].src;
		}
	}

	for(var i = 0; i < thunder.length; i++) {
		if(num == thunder[i]) {
			imgRep.src = imgArray[5].src;
		}
	}

	for (var i = 0; i < snow.length; i++) {
		if(num == snow[i]) {
			imgRep.src = imgArray[6].src;
		}
	}

	for (var i = 0; i < clear.length; i++) {
		if(num == clear[i]) {
			imgRep.src = imgArray[7].src;
		}
	}

	for (var i = 0; i < partlyCloudyNight.length; i++) {
		if(num == partlyCloudyNight[i]) {
			imgRep.src = imgArray[8].src;
		}
	}

	for (var i = 0; i < partlyCloudyRainNight.length; i++) {
		if(num == partlyCloudyRainNight[i]) {
			imgRep.src = imgArray[9].src;
		}
	}	
}


//GET CURRENT TIME
//GLOBAL VAR TO WORK WITH SURFCOND(), GETTIDES() AND SUNSETTIMES()
var time = new Date();
time = Math.round(time.getTime() / 1000);

function surfCond() {
	//ICON IMAGES
	urlArr = [
		"img/clean_icon.png",
		"img/average_icon.png",
		"img/choppy_icon.png"	
	];

    var myDiv = document.getElementById("surf_icon");
	var icon = document.createElement("img");
	
	// WIND DATA
    var obj  = responseObject;

	for(var i = 0; i < obj.length; i++) {
		//get localtimestampstimestamps
        var localTimes = obj[i].localTimestamp;
         //check local time matches with current time
        if((time >= localTimes) && (time < (localTimes + 10800))) {
            var minWave = obj[i].swell.minBreakingHeight;
            //wave height
            var maxWave = obj[i].swell.maxBreakingHeight;
            var avg = Math.round((minWave + maxWave) / 2);
            
            var el = document.getElementById("wave_height_text");
            el.innerHTML = (avg + "ft");

            //wind speed
            var speed = obj[i].wind.speed;
            var el = document.getElementById("wind_speed");
            el.innerHTML = (speed + "mph");

            //wind direction
            var dir = obj[i].wind.compassDirection;
            
            //The wind direction in surfing terms & breakdown of conditions
            //CROSS-ONSHORE
            if(dir.match(/^(N|WSW)$/)) {
                dir = "Cross - Onshore";
                if(speed <= 5) {
                	icon.src = urlArr[0];
                } else if ((speed > 5) && (speed <= 12)) {
                	icon.src = urlArr[1];
                } else {
                	icon.src = urlArr[2];
                }
            //CROSS - SHORE
            } else if (dir.match(/^(NNE|SSW|SW)$/)) {
                dir = "Cross-shore";
                if(speed <= 8) {
                	icon.src = urlArr[0];
                } else if((speed > 8) && (speed <= 15)) {
                	icon.src = urlArr[1];
                } else {
                	icon.src = urlArr[2]; 	
                }
            //CROSS - OFFSHORE
            } else if (dir.match(/^(ENE|S)$/)) {
                dir = "Cross - Offshore";
                if(speed <= 10) {
                	icon.src = urlArr[0];
                } else if((speed > 10) &&(speed <= 15)) {
                	icon.src = urlArr[1];
                } else {
	               	icon.src = urlArr[2];
                }
            //OFFSHORE
            } else if(dir.match(/^(E|ESE|SE|SSE|NE)$/)) {
                dir = "Offshore";
                if(speed <= 20) {
                	icon.src = urlArr[0];
                } else if((speed > 20) && (speed <= 35)) {
                	icon.src = urlArr[1];
                } else {
                	icon.src = urlArr[2];
                }
            //ONSHORE
            } else if (dir.match(/^(W|WNW|NW|NNW)$/)) {
                dir = "Onshore";
                if(speed <= 5){
                	icon.src = urlArr[0];
                }else if((speed > 5) && (speed <= 12)) {
                	icon.src = urlArr[1];
                } else {
                	icon.src = urlArr[2];
                }
            }

            //INSERT ICON
            myDiv.appendChild(icon);

            var el = document.getElementById("wind_dir");
            el.innerHTML = (dir);

            //if(direct = "Cross - Onshore" && speed < 12){
            //	alert("cross-onshore and average");
            //}

            break;
        }
        
    } 
}

function getTides() {
	//loop through object
	for(var i = 0; i < tides.length; i++) {
		var d = tides[i].date;
		var highOne = tides[i].highFirst;
		var highTwo = tides[i].highSec;
		var lowOne = tides[i].lowFirst;
		var lowTwo = tides[i].lowSec;

		//match today with appropriate day
		if((time >= d) && (time < d + 86400)) {
			var arr = [];
			arr.push(highOne, highTwo, lowOne, lowTwo);

			arr.forEach(function(element) {
		})

		var el = document.getElementById("high_one");
        el.innerHTML = ( "High: " + highOne);

        var el = document.getElementById("high_two");
        el.innerHTML = ("High: " + highTwo);

        var el = document.getElementById("low_one");
        el.innerHTML = ("Low: " + lowOne);

        var el = document.getElementById("low_two");
        el.innerHTML = ("Low: " + lowTwo);

		break;
		}
	}	
}

getTides();

function sunsetTimes() {
	var sunTime =  (responseObject["DailyForecasts"][0]["Sun"]);
  	var sunrise = (sunTime["Rise"]);
  	var sunset = (sunTime["Set"]);

  	sunrise = new Date(sunrise);
  	sunset = new Date(sunset);

  	var sunriseHr = sunrise.getHours();
  	var sunriseMn = sunrise.getMinutes();
  	if(sunriseMn.toString().length == 1) {
  		sunriseMn = "0" + sunriseMn;
  	}
  	
  	var sunsetHr = sunset.getHours();
  	var sunsetMn = sunset.getMinutes();
  	if(sunsetMn.toString().length == 1) {
  		sunsetMn = "0" + sunsetMn;
  	}
  	
  	var el = document.getElementById("sunrise");
  	el.innerHTML = ("Sunrise: " +  "0" + sunriseHr + " " + sunriseMn);
  	var el = document.getElementById("sunset");
  	el.innerHTML = ("Sunset: " + sunsetHr+ " " + sunsetMn);     	
}


// code to allow cross domain requests 
(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

//get Low Temp

var xhr = new XMLHttpRequest(); //create rquest object

xhr.onreadystatechange = function() {
	if(this.readyState == 4 && this.status == 200) { //if server status iisok
		responseObject = JSON.parse(xhr.responseText);
		getCurrentTemp();
		getBreakdown();
		iconNum();
		getUvIndex();
	}
};

xhr.open('GET', 'http://dataservice.accuweather.com/currentconditions/v1/53390_PC?apikey=%09EcYCSFObX0RZVLdJ72p3r7Vmb60AQmJV&details=true', true);
xhr.send(null);


var xhrTwo = new XMLHttpRequest(); //create rquest object

xhrTwo.onreadystatechange = function() {
	if(this.readyState == 4 && this.status == 200) { //if server status iisok
		responseObject = JSON.parse(xhrTwo.responseText);
		getLowTemp();
		getHighTemp();
		sunsetTimes();

	}
};

xhrTwo.open('GET', 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/53390_PC?apikey=EcYCSFObX0RZVLdJ72p3r7Vmb60AQmJV&details=true', true);
xhrTwo.send(null);


var xhrThree = new XMLHttpRequest(); //create rquest object

xhrThree.onreadystatechange = function() {
	if(this.readyState == 4 && this.status == 200) { //if server status iisok
		responseObject = JSON.parse(xhrThree.responseText);
		surfCond();
		
	}
};

xhrThree.open('GET', 'https://magicseaweed.com/api/6r25hUV2gzFO64v9WKj341sn4ODm996C/forecast/?spot_id=1363&units=uk', true);
//http://magicseaweed.com/api/YOURAPIKEY/forecast/?spot_id=10&fields=timestamp,wind.*,condition.temperature
xhrThree.send(null);






