'use strict';

var express = require('express');

// Set up auth

var vision = require('@google-cloud/vision')({
  projectId: 'ng-lerfish',
  keyFilename: './ng-lerfish-30961ae67952.json'
});

var app = express();

app.get('/', function(req, res) {

// supported types: 'crops','document','faces','landmarks','labels',
//          'logos','properties','safeSearch','similar','text'
var types = [
  'similar',
  'text'
];
var image = req.query.image;

console.log(image);

  vision.detect(image, types, function(err, detections, apiResponse) {
    if (err) {
      res.end('Cloud Vision Error');
      console.log(err);
      return;
    } else {
      res.json(apiResponse);
    }
  });

})

app.listen(8080);
console.log('Server Started');

// Turn image into Base64 so we can display it easily

function base64Image(src) {
  var data = fs.readFileSync(src).toString('base64');
  return util.format('data:%s;base64,%s', mime.lookup(src), data);
}