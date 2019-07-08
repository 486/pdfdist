const express = require('express')
const app = express()
const Busboy = require('busboy');
const protectPdf = require('./server/protect_pdf')
const contentDisposition = require('content-disposition')
const ps = require('./server/ps')

app.use(express.static('public'));

/*
app.get('/', function (req, res) {
  res.send('Hello World')
})
*/

app.post('/protect_pdf', function (req, res) {
  var busboy = new Busboy({ 
    headers: req.headers,
    limits: {
      fields: 0,
      fileSize: 20 * Math.pow(10, 6),
      files: 1,
      parts: 100
    } 
  });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    const psInfo = setInterval(function() {
      ps()
    }, 500)
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    /*
    file.on('data', function (data) {
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
    });
    */
    // res.writeHead(200)
    // res.setHeader('Content-Type', 'application/pdf');
    res.writeHead(200, {
      'Content-Disposition': contentDisposition(filename),
      'Content-Type': 'application/pdf'
    });
    const stream = protectPdf(file)
    stream.pipe(res)
    stream.on('end', function() {
      clearInterval(psInfo)
    })
    file.on('end', function () {
      console.log('File [' + fieldname + '] Finished');
    });
  });
  busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('Field [' + fieldname + ']: value: ' + val);
  });
  busboy.on('finish', function () {
    console.log('Done parsing form!');
    // res.writeHead(303, { Connection: 'close', Location: '/' });
    // res.end();
  });
  req.pipe(busboy);
})

app.listen(process.env.PORT || 8080)