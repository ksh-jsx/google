var infos = 
[
    {Name:"후쿠오카 공항",time_h:5,time_m:20,lat:33.55,lng:130.4}
];

var nameValue = document.getElementById("placeName").value;
var timeHValue = document.getElementById("hour").value;
var timeMValue = document.getElementById("minute").value;
var latValue = document.getElementById("Lat").value;
var lngValue = document.getElementById("Lng").value;

function mkPlan()
{

    document.getElementById("addInfo").style.display="block";
    document.getElementById("timeLine").style.display="none";

}

function ok()
{
    document.getElementById("addInfo").style.display="none";
    document.getElementById("timeLine").style.display="block";
    infos.push({Name:nameValue,time_h:timeHValue,time_m:timeMValue,lat:latValue,lng:lngValue});

}
