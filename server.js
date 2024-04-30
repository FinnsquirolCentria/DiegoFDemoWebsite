const http = require('http');
const fs = require('fs');
const path = require('path');

const wwwroot = './www';

const server = http.createServer((req, res) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // Map request URLs to file paths
  let filePath = path.join(wwwroot, req.url === '/' ? 'index.html' : req.url);
  const extname = path.extname(filePath);

  // Serve static files or handle API request for posts
  if (req.url === '/posts' && req.method === 'GET') {
    // Read posts data from posts.json
    fs.readFile('posts.json', 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading posts.json:', err);
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }

      try {
        const posts = JSON.parse(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(posts));
      } catch (error) {
        console.error('Error parsing posts.json:', error);
        res.writeHead(400);
        res.end('Invalid JSON format in posts.json');
      }
    });
  } else {
    // Handle other requests (static files or 404)
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // Handle 404 Not Found for non-existent files
          res.writeHead(404);
          res.end('404 Not Found');
        } else {

          res.writeHead(500);
          res.end('Internal Server Error');
        }
      } else {
        const contentType = getContentType(extname);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Function to determine Content-Type based on file extension
function getContentType(extname) {
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.pdf':
      return 'application/pdf';
    case '.json': 
      return 'application/json';
    default:
      return 'application/octet-stream';
  }
}