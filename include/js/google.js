var map;
var mousedUp = false;
var markers = [];
var locations = [];
function initMap()
{

	map = new google.maps.Map(document.getElementById('map'),
	{
		center: {lat: 33.55, lng: 130.4},
		zoom: 12
	});

	makeMarker(map);

}

function makeMarker(map)
{
	google.maps.event.addListener(map, 'click', function(event){
		setMapOnAll(null);//기존의 마커 삭제
		placeMarker(event.latLng);//마커 찍기
});
}

function placeMarker(location)
{
	var marker = new google.maps.Marker
	({
		position: location,
		map: map
	});
	markers.push(marker);//배열에 마커 정보 넣기
	document.getElementById("Lat").value = location.lat();
	document.getElementById("Lng").value = location.lng();
	
}

function setMapOnAll(map) //배열에 저장된 마커 삭제
{
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(map);
	}
}

function init()
{
	var input = document.getElementById('locationTextField');
	var Searched_lat,Searched_lng
	var autocomplete = new google.maps.places.Autocomplete(input);
	google.maps.event.addListener(autocomplete, 'place_changed', function () 
	{
		var place = autocomplete.getPlace();
			//검색된 위치 좌표
      Searched_lat = place.geometry.location.lat();
      Searched_lng = place.geometry.location.lng();
			//검색된 위치로 이동
			map = new google.maps.Map(document.getElementById('map'),
			{
				center: {lat: Searched_lat, lng: Searched_lng},
				zoom: 15
			});
			makeMarker(map);
  });
}

/*function setMarker(map)
{


    var infowindow = new google.maps.InfoWindow();

    var marker, i;
	//배열에 저장된 정보로 마커 생성
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
		visible:true
      });
	//클릭 시 보여지는 정보 삽입
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}
*/

google.maps.event.addDomListener(window, 'load', init);