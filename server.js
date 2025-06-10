const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 8000;

const server = http.createServer(function(req, res) {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  // Handle file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  }[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, function(err, data) {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
      return;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(port, function() {
  console.log(`Server running at http://localhost:${port}`);
});