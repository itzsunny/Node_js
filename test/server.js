let fs = require('fs');
fs.readFile('./sample.txt','utf-8',(error,context) => {
    console.log(error,context);
})
var content = fs.readFileSync('./sample.txt','utf-8');
console.log(content)

let url = require('url');
let parsed = url.parse("https://localhost:4000/editors/dashboard?uname=asdf&key=ah463hg");
console.log(parsed);

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
exports.pi = 3.14;
exports.sum = (a,b) => {
    return a+b;
}

exports.multiply = (a,b) => {
    return a*b;
}

