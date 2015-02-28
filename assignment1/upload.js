/**
 * Created by psarode on 2/27/2015.
 */
var http = require("http");
var url = require("url");
var formidable = require('formidable');
var fs = require("fs");
var util = require('util');
var path = require('path');

var server = http.createServer(function(req, res) {
    // Simple path-based request dispatcher
    switch (url.parse(req.url).pathname) {
        case '/':
            display_form(req, res);
            break;
        case '/upload':
            upload_file(req, res);
            break;
        case '/download':
            download_file(req, res);
            break;
        default:
            show_404(req, res);
            break;
    }
});

// Server would listen on port 8000
server.listen(3000);

/*
 * Display upload form
 */
function display_form(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(
        '<form action="/upload" method="post" enctype="multipart/form-data">'+
        '<input type="file" name="upload-file">'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
    res.end();
}
/*
 * Handle file upload
 */
function upload_file(req, res) {
    // Handle request as multipart
    var form = new formidable.IncomingForm();
    form.on('fileBegin', function(name, file) {
        file.path = path.resolve(__dirname, 'upload', file.name);
    });
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });

    return;
}

/*
 * Handle file download
 */
function download_file(req, res) {
    var queryData = url.parse(req.url, true).query;
    filePath = path.resolve(__dirname, 'upload', queryData.fileName);
    console.log(' filePath download :'+ filePath);
    fs.exists(filePath, function (exists) {
        if (exists) {
            var stat = fs.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Length': stat.size
            });
            var fileReadStream = fs.createReadStream(filePath, {encoding: 'utf8'});
            fileReadStream.pipe(res);
        }else{
            res.writeHead(404);
            res.write(filePath + " not found");
            res.end();
        }
    });

    return;
}
/*
 * Handles page not found error
 */
function show_404(req, res) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("Incorrect URL!");
    res.end();
}