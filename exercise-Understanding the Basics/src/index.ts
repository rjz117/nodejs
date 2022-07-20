import * as http from "http";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  const IP = req.socket.remoteAddress;
  console.log(method);
  console.log(IP);
  console.log(req.headers);
  console.log(req);

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Form</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><label>username</label><input name="username">'
    );
    res.write('<label>password</label><input name="password">');
    res.write('<button type="submit">Submit</button></form></body>');
    res.write("</html>");
    return res.end();
  }
  if (url === "/one") {
    setTimeout(() => {
      res.write("<html>");
      res.write("<body><h1>after one minute</h1></body>");
      res.write("<button onclick=\"history.back()\">Go Back</button>");
      res.write("</html>");
      return res.end();
    }, 1000);
  }
  if (url === "/message" && method === 'POST') {
    setTimeout(() => {
      res.write("<html>");
      res.write("<body><h1>Form submited.</h1></body>");
      res.write("<button onclick=\"history.back()\">Go Back</button>");
      res.write("</html>");
      return res.end();
    }, 1000);
  }
});

server.listen(3000);
