var express = require('express');
var app = express();
var url = require('url');

var page = url.pathname;
console.log(page);

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/vendor/bootstrap/css/bootstrap.min.css',function(req,res){
	res.sendFile(__dirname + '/vendor/bootstrap/css/bootstrap.min.css');
});

app.get('/vendor/bootstrap/css/bootstrap.css',function(req,res){
	res.sendFile(__dirname + '/vendor/bootstrap/css/bootstrap.css');
});

app.get('/img/bg-masthead.jpg',function(req,res){
	res.sendFile(__dirname + '/img/bg-masthead.jpg');
});

app.get('/img/silhouette.jpeg',function(req,res){
	res.sendFile(__dirname + '/img/silhouette.jpeg');
});

app.get('/img/peter.jpg',function(req,res){
	res.sendFile(__dirname + '/img/peter.jpg');
});

app.get('/img/sunny.png',function(req,res){
	res.sendFile(__dirname + '/img/sunny.png');
});

app.get('/vendor/fontawesome-free/css/all.min.css',function(req,res){
	res.sendFile(__dirname + '/vendor/fontawesome-free/css/all.min.css');
});

app.get('/css/grayscale.min.css',function(req,res){
	res.sendFile(__dirname + '/css/grayscale.min.css');
});

app.get('/vendor/bootstrap/js/bootstrap.bundle.min.js',function(req,res){
	res.sendFile(__dirname + '/vendor/bootstrap/js/bootstrap.bundle.min.js');
});

app.get('/vendor/jquery-easing/jquery.easing.min.js',function(req,res){
	res.sendFile(__dirname + '/vendor/jquery-easing/jquery.easing.min.js');
});

app.get('/vendor/jquery/jquery.min.js',function(req,res){
	res.sendFile(__dirname + '/vendor/jquery/jquery.min.js');
});

app.get('/js/grayscale.min.js',function(req,res){
	res.sendFile(__dirname + '/js/grayscale.min.js');
});

app.get('/about/sagar.html',function(req,res){
	res.sendFile(__dirname + '/about/sagar.html');
});

app.get('/about/andrew.html',function(req,res){
        res.sendFile(__dirname + '/about/andrew.html');
});

app.get('/about/david.html',function(req,res){
        res.sendFile(__dirname + '/about/david.html');
});

app.get('/about/peter.html',function(req,res){
        res.sendFile(__dirname + '/about/peter.html');
});

app.get('/about/steven.html',function(req,res){
        res.sendFile(__dirname + '/about/steven.html');
});

app.get('/about/sunny.html',function(req,res){
        res.sendFile(__dirname + '/about/sunny.html');
});

app.get('/about/zolboo.html',function(req,res){
        res.sendFile(__dirname + '/about/zolboo.html');
});

app.get('/index.html',function(req,res){
	res.sendFile(__dirname + '/index.html');
});
app.listen(3000,function(){
	console.log('Running');
}); 
