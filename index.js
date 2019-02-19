var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var mysql = require('mysql');
var qs = require('querystring');
var template = require('./lib/template.js');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : '111111',
database : 'travel',
port     : '3307'
});

connection.connect();
app.use(express.static('include'));

app.get('/',function(request,response){
  connection.query(`select * from infos order by Month asc,Date asc,time_h asc,time_m asc`, function(error,topics){
    var timeline ='' 
    for(var i=0;i<topics.length;i++)
    {
     if(i == 0 || topics[i].Date>topics[i-1].Date)
     {
      timeline = timeline + 
      ` 
      <div id = "planDate">${topics[i].Month}월${topics[i].Date}일</div>
      <li id="Object${i}" onclick="">
        <div id="Object_img">
          <img src="../images/line_blue.png">
        </div>
        <div id="Object_info">${topics[i].Name}</div>
        <div id="Object_time" style="color:blue">${topics[i].time_h}:${topics[i].time_m}</div>
      </li>
      `
     } 
     else
     {
      timeline = timeline + 
      ` 
      <li id="Object${i}" onclick="">
        <div id="Object_img">
          <img src="../images/line_blue.png">
        </div>
        <div id="Object_info">${topics[i].Name}</div>
        <div id="Object_time" style="color:blue">${topics[i].time_h}:${topics[i].time_m}</div>
      </li>
      `
     }
    }
    var html = template.HTML(timeline);
    response.writeHead(200);
    response.end(html);
  });
});

app.post('/insert_process', function(request, response){
  var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        connection.query(`INSERT INTO infos VALUES(?,?,?,?,?,?,?)`,[post.placeName, post.Date[6]+post.Date[7], post.Date[10]+post.Date[11], post.hour, post.minute, post.lat, post.lng], function (error, results, fields) {
          if(error){
            throw error;
          }
            response.writeHead(302, {Location: `/`});
            response.end();
          }
        )
    });ls
});



app.listen(3000);
