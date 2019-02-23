var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var app = express();
var path= require("path");

var server = http.createServer(function(req, res) {
var page = url.parse(req.url).pathname;
console.log(page);

if(page == '/'){
	fs.readFile("index.html",function(err,data){
		p
		r
		res.writeHead(

if(page == '/about/andrew.html'){
fs.readFile("about/andrew.html",function(err,data){
  res.writeHead(200, {'Content-type':'text/html'});
  res.write(data);
  res.end();
});
}

else if(page == '/about/peter.html'){
fs.readFile("about/peter.html",function(err,data){
  res.writeHead(200, {'Content-type':'text/html'});
  res.write(data);
  res.end();
});
}

else if(page == '/about/david.html'){
fs.readFile("about/david.html",function(err,data){
  res.writeHead(200, {'Content-type':'text/html'});
  res.write(data);
  res.end();
});
}

else if(page == '/about/sagar.html'){
fs.readFile("about/sagar.html",function(err,data){
  res.writeHead(200, {'Content-type':'text/html'});
  res.write(data);
  res.end();
});
}

else if(page == '/about/steven.html'){
fs.readFile("about/steven.html",function(err,data){
  res.writeHead(200, {'Content-type':'text/html'});
  res.write(data);
  res.end();
});
}

else if(page == '/about/sunny.html'){
fs.readFile("about/sunny.html",function(err,data){
  res.writeHead(200, {'Content-type':'text/html'});
  res.write(data);
  res.end();
});
}

else if(page == '/about/zolboo.html'){
fs.readFile("about/zolboo.html",function(err,data){
  res.writeHead(200, {'Content-type':'text/html'});
  res.write(data);
  res.end();
});
}

});
server.listen(8081);
