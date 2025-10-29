const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Błąd serwera");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    } else if (req.url === "/style.css") {
        fs.readFile("style.css", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);
        });
    } else if (req.url === "/script.js") {
        fs.readFile("script.js", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.end(data);
        });
    } else if (req.url === "/comments" && req.method === "GET") {
        fs.readFile("comments.json", (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("Nie znaleziono pliku comments.json");
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(data);
            }
        });
    } else if (req.url === "/comments" && req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () => {
            let newComment = JSON.parse(body);
            fs.readFile("comments.json", (err, data) => {
                let comments = JSON.parse(data);
                comments.push(newComment);
                fs.writeFile("comments.json", JSON.stringify(comments, null, 2), (err) => {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Dodano komentarz!" }));
                });
            });
        });
    } else {
        res.writeHead(404);
        res.end("404 - Nie znaleziono strony");
    }
});

server.listen(port, () => {
    console.log("Serwer działa na porcie " + port);
});
