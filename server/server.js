import express from 'express';

//const repository = require('./repositories/TodoRepository');

//const app = express.Router();

//import { TweenMax, TimelineLite, Power2, Elastic, CSSPlugin } from "gsap";
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
let cors = require('cors');
app.use(cors())
app.listen(3000)
console.log('app running on port ', 3000);
  

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.



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



app.get('/ret_func', function (req, res) {

    
    console.log("successful call on server side to return function");
    res.status(200);
    res.send(ret_func_show());
    //res.send(ret_func_show());
    //res.send("hello trying to return function");
  
})




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

function ret_func_show_test() {

    let o = Object.create(twn_parms);
    o.duration = 3;
    o.x = 100;
    o.scale = 0.8;
    o.ease = Elastic.easeOut;
    o.autoAlpha = 1;

    return o;
}


// get all todo items in the db

app.get('/', (req, res) => {
    repository.findAll().then((todos) => {
        res.json(todos);
    }).catch((error) => console.log(error));
});

// add a todo item
app.post('/', (req, res) => {
    const { name } = req.body;
    repository.create(name).then((todo) => {
        res.json(todo);
    }).catch((error) => console.log(error));
});

// delete a todo item
app.delete('/:id', (req, res) => {
    const { id } = req.params;
    repository.deleteById(id).then((ok) => {
        console.log(ok);
        console.log(`Deleted record with id: ${id}`);
        res.status(200).json([]);
    }).catch((error) => console.log(error));
});

// update a todo item
app.put('/:id', (req, res) => {
    const { id } = req.params;
    const todo = { name: req.body.name, done: req.body.done };
    repository.updateById(id, todo)
        .then(res.status(200).json([]))
        .catch((error) => console.log(error));
});
module.exports = app;