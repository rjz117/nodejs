import * as http from 'http';
import * as fs from 'fs';

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter the message.</title></head>');
        res.write('<body><form action="/message" method="POST"><input name="message"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url ==="/message" && method==="POST") {
        const text = [];
        req.on('data', (chunk) => {
            text.push(chunk);
        })
        req.on('end', () => {
            const data = Buffer.concat(text).toString();
            const message = data.split('=')[1];
            console.log(data.split('=')[1]);
            fs.writeFileSync('message.txt',message)
        })
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end();
    }
    res.setHeader('content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page.</title></head>');
    res.write('<body><h1>Hello this is !my first Node server.</h1></body>');
    res.write('</html>');
    res.end();
})

server.listen(4000)