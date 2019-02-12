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
    var date = document.getElementById("datepicker").value;
    alert(date[10]+date[11]);
    
}

