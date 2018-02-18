var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var Articleone ={
    title: 'Article || GVPARMAR',
    heading: 'Article-one',
    date :'feb 23 2018',
    content:,
    <p>
     Q-1   what is microprocessor?
           Ans:It is a program controlled semi conductor device (IC), which fetches, Decodes and execute instructions.
    </p>
    <p>
     Q-2 what is the function of program counter? A1: - program counter is the 16 bit counter.

            1.   Sequncelly program run.
            2.   If contain the memory address of the instruction which is next fetched.
    </p>
    ,
};

function creattemplate (date){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    
ver htmltemplate = '
<html>
    <head>
       
        <title>
            ${title}
        </title>
        <body>
            
                <a href="/">Home</a>
             <div>
              <h3> ${heading}  </h3>    
             </div>
             <div>
             <h2> ${date}<h2>
             </div>
            <h3> This is First page made using html </h3>
            <div>
            ${content}
            </div>
               
            
        
        </body>
    </head>
<html>';
return htmltemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/page-one',function (req,res){
    res.send('Article one requested and will be served here');
});

app.get('/Articleone',function (req,res){
    res.send(createmplate(Articleone));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
