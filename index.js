var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var ex = express();
var mysql = require('mysql');
var qs = require('querystring');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다.
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : '111111',
database : 'travel',
port     : '3307'
});
connection.connect();

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
	if(pathname === '/')
	{
        response.writeHead(200,{'Content-Type':'text/html'});
	  fs.readFile(__dirname + 'include/html/Main.html', (err, data) => 
	  {
        if (err) {
          return console.error(err);
        }
        response.end(data, 'utf-8');
      });
	} 
	else if(pathname === '/create_process')
	{
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description
      });
      response.writeHead(200);
      response.end('success');
	} 
	else 
	{
      response.writeHead(404);
      response.end('Not found');
    }
 
 
 
});
app.listen(3000);
ex.use(express.static('include'));
