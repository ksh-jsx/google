var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var mysql = require('mysql');
var qs = require('querystring');

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
	fs.readFile('include/html/Main.html',function(err,data){
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(data);
	});
});

app.post('/insert_process', function(request, response){
  var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        connection.query(`INSERT INTO infos VALUES(?,?,?,?,?,?,?)`,[post.placeName, 1, 24, post.hour, post.minute, post.lat, post.lng], function (error, results, fields) {
          if(error){
            throw error;
          }
            response.writeHead(302, {Location: `/`});
            response.end();
          }
        )
    });
});

app.listen(2000);
