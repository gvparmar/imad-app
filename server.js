var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var Articleone ={
    title: 'Article || GVPARMAR',
    heading: 'Article-one',
    date :'feb 23 2018',
    content:`
    hi welcome all hi welcome all hi welcome allhi welcome allhi welcome allhi welcome allhi welcome all
    hi welcome allhi welcome allhi welcome allhi welcome all hi welcome all hi welcome all.
    `
};

function creatTemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    
var htmlTemplate = `
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
</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/page-one',function (req,res){
    res.send('Article one requested and will be served here');
});

app.get('/Articleone',function (req,res){
    res.send(creaTemplate(Articleone));
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