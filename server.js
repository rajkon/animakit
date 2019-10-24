import express from 'express';
let TweenMax = require("gasp");
const bodyParser = require('body-parser');
const app = express()
const path = require('path');
var shelljs = require('shelljs');


var msg = 'Hello World';
console.log(msg);

var fs = require('fs');

var imgDir = require('path').join(__dirname, '/images');
var cssDir = require('path').join(__dirname, '/css');
var baseDir = require('path').join(__dirname, '/');
let cssFile = cssDir+'/CSSFile.css';
app.use(express.static(imgDir));
app.use(express.static(cssDir));
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    //res.writeHead(200, { 'Content-type': 'text/css' });
    //var cssfileContents = fs.readFileSync(cssFile, { encoding: 'utf8' });

    

    console.log('ejs file called');
    //res.render('index');

    res.render('index_for_backend');

  //  return res.sendFile(path.join(__dirname + '/index.html'));
  //return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})


app.get('/myapi', function (req, res) {

    let shellStr = shelljs.exec('ls');
    if (shellStr) {
        console.log("successful call on server side as we executed ls command");
        res.status(200);
        res.json({ ls: shellStr });
    }
    else {
        console.log("failure status on server side");
        res.status(500).json({ error: "Could not do ls" });
    }
})


app.get('/ret_func', function (req, res) {

    
    console.log("successful call on server side to return function");
    res.status(200);
    res.send(ret_func_show());

        //res.send("hello trying to return function");
  
})



app.listen(3000)
console.log('app running on port ', 3000);

const twn_parms = {
    duration: 3,
    x: "",
    scale: 1,
    ease: "",
    autoAlpha: 1

};
/*
let ret_func_show = new Function('svg_file_name','TweenMax.to(svg_file_name, 3, {'
      + 'x: 100,'
      +  'scale: .8,'
       + 'ease: Elastic.easeOut,'
        + 'autoAlpha: 1,'
      +'}); console.log("srvr_func");'
);
*/
function ret_func_show() {

    let o = Object.create(twn_parms);
    o.duration = 3;
    o.x = 100;
    o.scale =  0.8;
    o.ease = 'Elastic.easeOut';
    o.autoAlpha = 1;

    return o;
}