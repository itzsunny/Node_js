// let fs = require('fs');
// fs.readFile('./sample.txt','utf-8',(error,context) => {
//     console.log(error,context);
// })
// var content = fs.readFileSync('./sample.txt','utf-8');
// console.log(content)

// let url = require('url');
// let parsed = url.parse("https://localhost:4000/editors/dashboard?uname=asdf&key=ah463hg");
// console.log(parsed);

// var pi = 3.14;
// var sum = (a,b) =>{
//     return a+b;
// }
// module.exports = {
//     pi,sum,multiply
// }
// module.exports = {
//      pi : 3.14;
//      sum : (a,b) =>{
//     return a+b;
// }
// }
// exports.pi = 3.14;
// exports.sum = (a,b) => {
//     return a+b;
// }

// exports.multiply = (a,b) => {
//     return a*b;
// }

// day2

// let http = require('http');
// let url = require('url');
// let fs = require('fs');

// http.createServer((req, res) => {
// let parsedUrl = url.parse(req.url,true)
//     console.log(req.url, parsedUrl)

//     if (req.url === '/') {
//         fs.readFile('index.html',(error,context) => {
//             res.setHeader('content-Type','text/html')
//             res.write(context)
//             res.end();
//         });
//     }
//     if (req.url.includes('.css')){

//         console.log('inside css');
//         fs.readFile("./css"+req.url,(error,context) => {
//             res.setHeader('content-Type','text/css')
//             res.write(context)
//             res.end();

//     })

// }
// }).listen(4000,'localhost')

// let http = require('http');
// let url = require('url');
// let fs = require('fs');

// const server = http.createServer(handleserver);

//  function handleserver(req,res){
//      let parsedUrl = url.parsed(req.url,true);
//      if (parsedUrl.pathname === '/'){
//          fs.readFile('./index.html',(err,content) => {
//             if(err){
//                 res.writeHead(500,{'content-Type':'text/plain'});
//                 res.write('could not read');
//                 return res.end(error)
//             }
//             res.writeHead(200,{'content-type':'text/html'});
//             res.end(content)
//          })

//          }
//          else if (parsedUrl.pathname === './about'){
//             fs.readFileSync('./about.html',(err,context) => {
//                 if(err) {
//                     res.writeHead(500,{'content-Type':'text/plain'});
//                     res.write('could not read');
//                     return res.end(err)
//                 }
//                 res.writeHead(200,{'cntext-Type':'text/html'});
//                 res.end(context)
//             })
//          }
//         else if(req.url.includes('./css')) {
//             fs.readFile('./css' + req.url,(err,css) => {
//                 if (err){
//                     res.writeHead(500,{'content-Type':'text/plain'});
//                     res.write('could not read');
//                     return res.end(err)
//                 }
//                 res.writeHead(200,{'context-Type':'text/css'});
//                 res.end(css);
//             })
//       }
//       else if (req.url['jpg','jpeg','png','svg'].indexOf(req.url.split('.').pop() > -1)){
//           fs.readFile('./img'+ req.url ,(err,img) => {
//               if (err){
//                   res.writeHead(500,{'content-Type':'text/plain'});
//                   res.write('could not read');
//                   return res.end(err);
//               }
//               res.writeHead(200,{'content-Type':'image/'+ req.url.split('.').pop()});
//               res.end(img);
//           })
//       }
//       else {
//         res.statusCode = 404;
//         console.log(res.statusCode);

//         res.end('Page Not Found');
//       }
//      }

//      server.listen(4000,'localhost',() => {
//          console.log('you are logged in')
//      })

// day3

// const http = require("http");
// const url = require("url");
// const fs = require("fs");

// const server = http.createServer();

// server.on("request", (req, res) => {
//   let postData = "";

//   req
//     .on("data", (chunk) => {
//       postData += chunk;
//       JSON.parse(postData);
//     })
//     .on("end", () => {
//       if (req.url === "/" && req.method === "GET") {
//         console.log("inside /GET");
//         res.end("inside /GET");
//       } else if (req.url === "/" && req.method === "POST") {
//         console.log("inside /POST");
//         fs.writeFile("data.json", postData, err => {
//           if (err) {
//             console.log("could not write");
//             return res.end(error);
//           }
//           res.write("inside /POST");
//           res.end(postData);
//         });
//       } else if (req.url === "/about" && req.method === "GET") {
//         console.log("inside /about GET");
//         res.write("inside /about GET");
//         res.end(postData);
//       } else if (req.url === "/about" && req.method === "POST") {
//         console.log("inside /about POST");
//         fs.writeFile("data.json", postData, err => {
//           if (err) {
//             console.log("could not write");
//             return res.end(error);
//           }
//           res.write("inside /about POST");
//           res.end(postData);
//         });
//       } else {
//         res.statusCode = 400;
//         console.log("page not found");
//         res.end("ERROR ! page not found");
//       }
//     });
// });

// server.listen(4000, "localhost", () => {
//   console.log("server started in http://4001");
// });

// day4

const http = require("http");
const url = require("url");
const fs = require("fs");
const port = process.env.PORT || 3000;
const UserPath = __dirname + "/users/";
var qs = require("querystring");

const server = http.createServer();
server.on("request", handleRequest);
function handleRequest(request, response) {
  const parsedUrl = url.parse(request.url, true);
  // console.log(parsedUrl);

  let capturedData = "";
  request.on("data", chunk => {
    capturedData += chunk;
  });
  request.on("end", () => {
    // console.log("you are done!");
    if (parsedUrl.pathname === "/" && request.method === "GET") {
      var files = fs.readdirSync(UserPath);
      files.forEach(file => {
        var content = fs.readFileSync(UserPath + file);
        var parsedUser = JSON.parse(content);
        var user = `Name: ${parsedUser.name}, email: ${parsedUser.email} \n`;
        response.write(user);
      });
      response.end();
    } else if (parsedUrl.pathname === "/users") {
      let userName = parsedUrl.query.name;

      if (request.method === "POST") {
        var name = JSON.parse(capturedData).name;
        fs.open(UserPath + name + ".json", "wx", (err, fd) => {
          if (err) return response.end("ERROR ! opening file");
          fs.writeFile(fd, capturedData, err => {
            if (err) return response.end("ERROR! cant write");
            fs.close(fd, err => {
              if (err)
                return response.end("ERR! something wrong with posting data");
              console.log("data stored in ", name);
              response.end(`data stored in  ${name + ".json"}`);
            });
          });
        });
      }
      if (request.method === "GET") {
        fs.readFile(UserPath + userName + ".json", (err, file) => {
          if (err) return response.end("something wrong with GET");
          response.end(`here is the file ${file}`);
        });
      }
      if (request.method === "PUT") {
        fs.open(UserPath + userName + ".json", "r+", (err, fd) => {
          if (err) return response.end("ERROR! can not PUT");
          fs.ftruncate(fd, err => {
            if (err) response.end("unable to update");
            fs.writeFile(fd, capturedData, err => {
              if (err) return response.end("ERROR! cant write");
              fs.close(fd, err => {
                if (err) return "ERR! cant close File";
                response.end(`page overWrite succesfully ${fd}`);
              });
            });
          });
        });
      }
      if (request.method === "DELETE") {
        fs.unlink(parsedUrl.query.name, err => {
          if (err) return response.end("ERR ! file not deleted");
          response.end(
            `!successfully deleted ${parsedUrl.query.name}`
          );
        });
      }
    } else if (parsedUrl.pathname === "/form" && request.method === "GET") {
      response.writeHead(200, { "context-Type": "text/html" });
      fs.createReadStream("./form.html").pipe(response);
    } else if (parsedUrl.pathname === "/form" && request.method === "POST") {
      var formData = qs.parse(capturedData);
      fs.open(UserPath + formData.name + ".json", "wx", (err, fd) => {
        if (err) return response.end("ERROR ! opening file");
        fs.writeFile(fd, JSON.stringify(formData), err => {
          if (err) return response.end("ERROR! can't write");
          fs.close(fd, err => {
            if (err)
              return response.end("ERR! something wrong with posting data");
            console.log("data stored in ", formData.name);
            fs.createReadStream("./form.html").pipe(response);
          });
        });
      });
    } else {
      response.end("ERR! Page not found");
    }
  });
}

server.listen(port, () => {
  console.log("you are in the port", port);
});
