var map;
var mousedUp = false;
var markers = [];
function initMap()
{

	map = new google.maps.Map(document.getElementById('map'),
	{
		center: {lat: 33.55, lng: 130.4},
		zoom: 12
	});

	google.maps.event.addListener(map, 'mousedown', function(event){
		  mousedUp = false;
		  setTimeout(function(){
			  if(mousedUp === false){
				setMapOnAll(null);//기존의 마커 삭제
				placeMarker(event.latLng);//마커 찍기
			  }
		  }, 700);
	});
	google.maps.event.addListener(map, 'mouseup', function(event){
	  mousedUp = true;
	});
}

function placeMarker(location)
{

	var marker = new google.maps.Marker
	({
		position: location,
		map: map
	});
	markers.push(marker);//배열에 마커 위치 넣기
}

function setMapOnAll(map) //배열에 저장된 마커 삭제
{
	for (var i = 0; i < markers.length; i++) {
	  markers[i].setMap(map);
	}
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
function init()
{
	var input = document.getElementById('locationTextField');
	var Searched_lat,Searched_lng
	var autocomplete = new google.maps.places.Autocomplete(input);
	google.maps.event.addListener(autocomplete, 'place_changed', function () {
				var marker;
				var place = autocomplete.getPlace();
				var size_x = 60; // 마커 크기
		        var size_y = 60;
		        // 마커 정보
		        var image = new google.maps.MarkerImage( 'http://www.larva.re.kr/home/img/boximage3.png',
                            new google.maps.Size(size_x, size_y),
                            '',
                            '',
                            new google.maps.Size(size_x, size_y));
				//검색된 위치 좌표
                Searched_lat = place.geometry.location.lat();
                Searched_lng = place.geometry.location.lng();
				var markLocation = new google.maps.LatLng(Searched_lat, Searched_lng);
				//검색된 위치 마커찍기
				map = new google.maps.Map(document.getElementById('map'),
				{
					center: {lat: Searched_lat, lng: Searched_lng},
					zoom: 15
				});

				marker = new google.maps.Marker({
				position: markLocation, // 위치
				map: map,
				icon: image, // 마커 모양
//				info: 정보
				title: place.name // 클릭시 나오는 정보
		        });
            });


}

google.maps.event.addDomListener(window, 'load', init);
