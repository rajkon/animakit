import express from 'express';

const app = express()
const path = require('path');

var msg = 'Hello World';
console.log(msg);

var imgDir = require('path').join(__dirname, '/images');
app.use(express.static(imgDir));


app.use(express.json())

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname + '/index.html'));
  //return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})

app.listen(3000)
console.log('app running on port ', 3000);
