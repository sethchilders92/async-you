var http = require('http');
var async = require('async');

var url = process.argv[2];
var number = ['one', 'two', 'three'];

async.reduce(number, 0, function(memo, item, done) {
   http.get(url + "?number=" + item, function(res) {
      var body = 0;
      res.on('data', function(chunk) {
         body += Number(chunk);
      });
      res.on('end', function() {
         done(null, memo + body);
      })
   }).on('error', done);
   
}, function done(err, result) {
   if(err) return console.log(err);
   console.log(result);
});