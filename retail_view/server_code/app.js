var express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');

app.use(cors());
app.listen(8088);

console.log("Server started at 8088");

app.get("/getRetailData", function(req, res){
	var contents = fs.readFileSync(__dirname+'/data_files/Webdev_data2.json', 'utf8');
	res.send(contents);
})