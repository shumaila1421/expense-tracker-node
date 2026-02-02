import http from "http";
const port = 5000;
const server = http.createServer((req, res) => {
  res.end("Hey this is our server");
});
server.listen(port, () => {
  console.log(`Server is up and listening on ${port}`);
});
