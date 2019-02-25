var map;
var mousedUp = false;
var markers = [];
var locations = [];
var inputLat,inputLng,inputName;
function initMap()
{

	map = new google.maps.Map(document.getElementById('map'),
	{
		center: {lat: 33.55, lng: 130.4},
		zoom: 12
	});

	makeMarker(map);
	new AutocompleteDirectionsHandler(map);
}

function makeMarker(map)
{
	google.maps.event.addListener(map, 'click', function(event){
		setMapOnAll(null);
		placeMarker(event.latLng);
		var result = [me.latLng.lat(), me.latLng.lng()];
        transition(result);
});
}

function placeMarker(location)
{
	var marker = new google.maps.Marker
	({
		position: location,
		map: map
	});
	markers.push(marker);
	document.getElementById("Lat").value = location.lat();
	document.getElementById("Lng").value = location.lng();
	
}

function setMapOnAll(map) 
{
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(map);
	}
}

function init()
{
	var input = document.getElementById('locationTextField');
	var autocomplete = new google.maps.places.Autocomplete(input);
	var Searched_lat,Searched_lng;
	google.maps.event.addListener(autocomplete, 'place_changed', function () 
	{
		var marker;
		var place = autocomplete.getPlace();
		var size_x = 60; 
		var size_y = 60;
		var strlength = document.getElementById("locationTextField").value;
		strlength.length;
	
		var image = new google.maps.MarkerImage( 'http://www.larva.re.kr/home/img/boximage3.png',
                '',
                '',
                new google.maps.Size(size_x, size_y));
	
    	Searched_lat = place.geometry.location.lat();
    	Searched_lng = place.geometry.location.lng();
		var markLocation = new google.maps.LatLng(Searched_lat, Searched_lng);
	
		map = new google.maps.Map(document.getElementById('map'),
		{
			center: {lat: Searched_lat, lng: Searched_lng},
			zoom: strlength.length
		});
		marker = new google.maps.Marker
		({
			position: markLocation, 
			map: map,
			icon: image,
			animation: google.maps.Animation.DROP,
			title: place.name 
		});
		markers.push(marker);
		makeMarker(map);
		if(document.getElementById("timeLine").style.display==="none")
		{
			document.getElementById("Lat").value = Searched_lat;
			document.getElementById("Lng").value = Searched_lng;
		}
  });
}

function goto(inputLat,inputLng)
{
	var markLocation = new google.maps.LatLng(inputLat,inputLng);
	var image = new google.maps.MarkerImage( 'http://www.larva.re.kr/home/img/boximage3.png',
                '',
                '',
                new google.maps.Size(60, 60));

	map = new google.maps.Map(document.getElementById('map'),
	{
		center: {lat: inputLat, lng: inputLng},
		zoom: 18
	});
	var marker = new google.maps.Marker
	({
		position: markLocation, 
		map: map,
		icon: image, 
		animation: google.maps.Animation.DROP,
		title: 'serachedLocation' 
	});
	markers.push(marker);
	makeMarker(map);
}

function AutocompleteDirectionsHandler(map) {
	this.map = map;
	this.originPlaceId = null;
	this.destinationPlaceId = null;
	this.travelMode = 'WALKING';
	this.directionsService = new google.maps.DirectionsService;
	this.directionsDisplay = new google.maps.DirectionsRenderer;
	this.directionsDisplay.setMap(map);
  
	var originInput = document.getElementById('origin-input');
	var destinationInput = document.getElementById('destination-input');
	var modeSelector = document.getElementById('mode-selector');
  
	var originAutocomplete = new google.maps.places.Autocomplete(originInput);
	// Specify just the place data fields that you need.
	originAutocomplete.setFields(['place_id']);
  
	var destinationAutocomplete =
		new google.maps.places.Autocomplete(destinationInput);
	// Specify just the place data fields that you need.
	destinationAutocomplete.setFields(['place_id']);
  
	this.setupClickListener('changemode-walking', 'WALKING');
	this.setupClickListener('changemode-transit', 'TRANSIT');
	this.setupClickListener('changemode-driving', 'DRIVING');
  
	this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
	this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
  
	this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
	this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
		destinationInput);
	this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }
  
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  AutocompleteDirectionsHandler.prototype.setupClickListener = function(
	  id, mode) {
	var radioButton = document.getElementById(id);
	var me = this;
  
	radioButton.addEventListener('click', function() {
	  me.travelMode = mode;
	  me.route();
	});
  };
  
  AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(
	  autocomplete, mode) {
	var me = this;
	autocomplete.bindTo('bounds', this.map);
  
	autocomplete.addListener('place_changed', function() {
	  var place = autocomplete.getPlace();
  
	  if (!place.place_id) {
		window.alert('Please select an option from the dropdown list.');
		return;
	  }
	  if (mode === 'ORIG') {
		me.originPlaceId = place.place_id;
	  } else {
		me.destinationPlaceId = place.place_id;
	  }
	  me.route();
	});
  };
  
  AutocompleteDirectionsHandler.prototype.route = function() {
	if (!this.originPlaceId || !this.destinationPlaceId) {
	  return;
	}
	var me = this;
  
	this.directionsService.route(
		{
		  origin: {'placeId': this.originPlaceId},
		  destination: {'placeId': this.destinationPlaceId},
		  travelMode: this.travelMode
		},
		function(response, status) {
		  if (status === 'OK') {
			me.directionsDisplay.setDirections(response);
		  } else {
			window.alert('Directions request failed due to ' + status);
		  }
		});
  };



google.maps.event.addDomListener(window, 'load', init);