var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var mysql = require('mysql');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다.
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : '111111',
database : 'travel',
port     : '3307'
});

connection.connect();

app.get('/',function(request,response){
	fs.readFile('include/html/Main.html',function(err,data){
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(data);
	});
});
app.use(express.static('include'));
app.listen(3000);
