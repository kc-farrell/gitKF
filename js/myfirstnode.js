var http = require('http');
var grabDate = require('./myfirstmodule'); /* means reference the file where the function will be 
	executed from ./ = same folder as this NODE file */
var uc = require('upper-case'); /* Demonstrate using an NPM package (upper-case) */

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'watersigndesign@gmail.com',
    pass: 'whatever'
  }
});

var mailOptions = {
  from: 'watersigndesign@gmail.com',
  to: 'kevin.farrell@qsrsoft.com',
  subject: 'TEST-TEST: Sending Email using Node.js',
  text: 'If this works, we\'ll eat like kings!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


var fs = require('fs');
/* 
	Common use for the File System (fs) module:

	Read...Create...Update...Delete...Rename files
 */

/* Create a server Object that gets feed request (http.IncmingMessage object) and response(s) */
/* res = RESPONSE not resource -  
	this res.writeHead stuff... 200 = status indicator of OK; the object contains the response header...

	A response header is an HTTP header that can be used in an HTTP response and 
	that doesn't relate to the content of the message. 
	Response headers, like Age, Location or Server are used to give a more detailed context of the response. 
	However, these entity requests are usually called responses headers in such a context.

	Seymour here---> https://www.tutorialspoint.com/http/http_responses.htm
 */
http.createServer(function (req, res) {
	/* Read in my existing VSTi plugin file/app to this request/URL */
	fs.readFile('../index.html', function(err, data) {
	    res.writeHead(200, {'Content-Type': 'text/html'});
	    res.write(uc('The upper-case package is capitalizing this text. Requested url: ') +req.url + '<br />' + 'The QsrSoft Date and Time: ' + grabDate.myDateTime() + '<br />comes from the grabDate function located in myfirstmodule.js');
	    res.write('<p class="whatever">The createServer Object is inserting this text via res.write into a P tag.</p>');   
	    res.write('The fetched index.html file via fs package is unformatted and non-functional at this time, because its resources are static and not yet known by Node.');
	    res.write(data);
		res.end(); /* END the response */
	});

	/*listen('.whatever', 'click', function(e) {
		console.log(e);
	});	*/

}).listen(8080);



//Create an event handler w built in events module:
var events = require('events'); /* built in modules for event listeners */
var eventEmitter = new events.EventEmitter();
var myEventHandler = function () {
  console.log('Using Nodes built-in events package to display this. Now this is progress!');
}
//Assign the event handler to an event:
eventEmitter.on('progress', myEventHandler);
//Fire the 'progress' event:
eventEmitter.emit('progress');