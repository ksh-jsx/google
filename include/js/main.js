var infoArr = 
[
    {Name:"후쿠오카 공항",time_h:5,time_m:20,lat:33.5903205871582,lng:130.4467010498047}
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
    infoArr.push({Name:nameValue,time_h:timeHValue,time_m:timeMValue,lat:latValue,lng:lngValue});
    mysql();
}

function mysql()
{
    connection.query(`INSERT INTO infos VALUES(?,?,?,?,?,?,?)`,[nameValue, 1, 24, timeHValue, timeMValue, latValue, lngValue], function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        console.log(results);
      });

    connection.end();

}