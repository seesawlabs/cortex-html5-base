var app;

$(document).ready(function(){
	app = new App();
});

function uiLog(message) {
	var ts = new Date();
	$('#log h1').after('<div>' + ts + ' - ' + message + '</div>');
}

function App(){
	var _this = this,
			_isEnvDev = false; //True if testing/deving. Change to false when going live.

	this.$headerCopy = $("#header-copy");
	this.$subheaderCopy = $("#subheader-copy");
	this.$lockup = $("#lockup");
	this.$url = $("#url");
	this.$tc = $("#tc");
	this.$frame1BG = $("#frame-1-bg");
	this.$frame1 = $("#frame-1");
	this.$defaultFrame1 = $("#default-frame-1");
	this.$frame2 = $("#frame-2");

	this.isDataLoaded = false;
	this.DATA_LOAD_TIMEOUT_MS = !_isEnvDev ? 6000 : 1000000000; //SHOW BACKUP IF DATA HASN'T LOADED IN 6 SECONDS
	this.dataLoadTimeout = null;

	this.bgImage = new Image();

	uiLog('LOADING');
	uiLog('Is Dev: ' + _isEnvDev)

	//SEE THE WHOLE UNIT, FOR TESTING ONLY. REMOVE THESE RESIZE FUNCTIONS FOR LAUNCH.
	if(_isEnvDev){
		$(window).on("resize", function(){
			_this.handleWindowResize();
		});
		this.handleWindowResize();
	}

	//If LINK ID from query string is invalid, show a default img.
	this.LINK_ID = this.getQueryStringVars()["id"];
	if(this.LINK_ID == undefined || !this.LINK_ID){
		this.showDefaultFrame();
		return;
	}

	//GET FLIGHT DATA FROM SERVER
	this.loadFlightData(this.LINK_ID);
};

App.prototype.loadFlightData = function(ID){
	var _this = this;

	uiLog('Loading Venue ID: ' + ID);

	//IF DATA DOESN'T LOAD QUICK ENOUGH, SHOW DEFAULT IMAGE
	this.dataLoadTimeout = setTimeout(function(){
		_this.onFightDataLoadTimeout();
	}, this.DATA_LOAD_TIMEOUT_MS);

	$.getJSON( "https://wlr3dhvzt7.execute-api.us-east-1.amazonaws.com/prod/flights/" + ID, function( Data ) {
	  _this.onFlightDataLoadComplete(Data);
		uiLog('Data Received: ' + ID);
		console.log(Data);
	}).fail(function(Data) {
		//IF NO DATA FOUND BASED ON LINK ID, SHOW DEFAULT IMAGE
		_this.onFlightDataError(Data);
		uiLog('Data Error: ' + ID);
		console.log(Data);
	});
};

App.prototype.onFightDataLoadTimeout = function(){
	if(!this.isDataLoaded){
		console.log("LOAD TIMEOUT");
		uiLog('Showing Default Frame');
		this.showDefaultFrame();
	}
};

App.prototype.onFlightDataLoadComplete = function(Data){
	console.log("LOAD COMPLETE", Data);
	var _this = this;
	clearTimeout(this.dataLoadTimeout);
	this.isDataLoaded = true;

	var	_departingTimeArray = this.msToTime(new Date(Data.departure).getTime() - new Date().getTime()),
			_departingHourStr = _departingTimeArray[0] > 1 ? _departingTimeArray[0] + " hr. " : _departingTimeArray[0] + " hr. ",
			_departingMinStr = _departingTimeArray[1] > 1 ? _departingTimeArray[1] + " min." : _departingTimeArray[1] + " min.",
			_style = this.getStyleFromDestIATA(Data.destination.iata);

	Data.location.name = Data.location.name.replace("-", "–");

	this.$headerCopy.html("The faster way from<br>" + Data.location.name + "<br>to " + Data.destination.name + ".")
	this.$subheaderCopy.html(Data.origin + "&rarr;" + Data.destination.iata + " departs in " + _departingHourStr + _departingMinStr + "");
	this.$lockup.attr("src", _style.lockupImg);
	this.$url.css("color", _style.urlColor);
	this.$tc.css("color", _style.urlColor);

	this.bgImage.onload = function(){
		_this.$frame1BG.attr("src", this.src);
		_this.$frame1.css("display", "block");
		setTimeout(function(){
			uiLog('Displaying 2nd Image');
			_this.$frame2.css("display", "block");
		}, 8000);
	};
	this.bgImage.src = "img/destinations/" + Data.destination.iata + ".jpg";
};

App.prototype.getStyleFromDestIATA = function(IATA){
	//MOST FRAME-1 FOOTER ELEMENTS ARE WHITE. THE ARRAY BELOW ARE EXCEPTIONS AND WILL BE STYLED AS DARK.
	var _darkIATAs = ["ANU", "AUA", "DEN", "GND", "LAX", "MBJ", "PUJ", "SDQ", "POS", "PLS"];

	uiLog('IATA: ' + IATA);

	if(_darkIATAs.indexOf(IATA) != -1){
		return {
			lockupImg: "img/logo-dark.png",
			urlColor: "#15386F"
		}
	} else {
		return {
			lockupImg: "img/logo-white.png",
			urlColor: "#FFFFFF"
		}
	}
};

App.prototype.onFlightDataError = function(){
	clearTimeout(this.dataLoadTimeout);
	this.showDefaultFrame();
	uiLog('On Flight Data Error');
};

App.prototype.showDefaultFrame = function(){
	//RANDOMLY SHOWS 1 OF 4 DEFAULT IMAGES SHOULD SOMETHING FAIL.

	var _this = this,
			_defaultImagePaths = [
				"img/default1.jpg",
				"img/default2.jpg",
				"img/default3.jpg",
				"img/default4.jpg"
			],
			_defaultImagePath = _defaultImagePaths[Math.floor(Math.random() * _defaultImagePaths.length)];

	this.bgImage.onload = function(){
		_this.$defaultFrame1.attr("src", this.src);
		_this.$defaultFrame1.css("display", "block");
	};
	this.bgImage.src = _defaultImagePath;
	uiLog('Show Default Frame');
};

App.prototype.handleWindowResize = function(){
	var _scale = $(window).height()/1920,
			_scaleString = "scale(" + _scale + ", " + _scale + ")";

	$("body").css({
		"-ms-transform-origin": "0 0",
		"-webkit-transform-origin": "0 0",
    "transform-origin": "0 0",

    "-ms-transform": _scaleString,
		"-webkit-transform": _scaleString,
    "transform": _scaleString
	});
};

App.prototype.msToTime = function(MS) {
	var milliseconds = parseInt((MS%1000)/100),
			seconds = parseInt((MS/1000)%60),
			minutes = parseInt((MS/(1000*60))%60),
			hours = parseInt((MS/(1000*60*60))%24);

	return [hours, minutes];
};

App.prototype.getQueryStringVars = function(){
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++){
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
};
