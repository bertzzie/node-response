var http = require('http');

var port = process.env.port || 1337;

var onRequest = function (request, response) {
    var fs = require('fs');
    var file = fs.createReadStream('./index.html');
    var content = '';
    
    file.on('data', function (data) {
        content = content + data;
    });

    file.on('end', function () {
        var result = content;

        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': result.length
        });

        response.write(result);
        response.end();
    });
};

var server = http.createServer(onRequest);

server.listen(port, 'localhost');