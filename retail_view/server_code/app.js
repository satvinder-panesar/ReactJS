var express = require('express');
var app = express();
var fs = require('fs');

app.listen(8088);

console.log("Server started at 8088");

app.get("/getRetailData", function(req, res){
	var contents = fs.readFileSync(__dirname+'/public/Webdev_data2.json', 'utf8');
	res.send(contents);
})