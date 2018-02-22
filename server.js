var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    
    'articleone' : {
    title: 'Article || GVPARMAR',
    heading: 'Article-one',
    date :'Feb 23 2018',
    content:`
    hi welcome all hi welcome all hi welcome allhi welcome allhi welcome allhi welcome allhi welcome all
    hi welcome allhi welcome allhi welcome allhi welcome all hi welcome all hi welcome all.
    `
},
    'articletwo' : { title: 'Article || GVPARMAR',
    heading: 'Article-two',
    date :'Feb 24 2018',
    content:`
    hi welcome all hi welcome all hi welcome allhi welcome allhi welcome allhi welcome allhi welcome all
    hi welcome allhi welcome allhi welcome allhi welcome all hi welcome all hi welcome all.
    `},
    'articlethree' :{ title: 'Article || GVPARMAR',
    heading: 'Article-three',
    date :'Feb 25 2018',
    content:`
    hi welcome all hi welcome all hi welcome allhi welcome allhi welcome allhi welcome allhi welcome all
    hi welcome allhi welcome allhi welcome allhi welcome all hi welcome all hi welcome all.
    `}
};

function createTemplate (data){
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
       
    </head>
        <body>
                <a href="/">Home</a>
             <div>
             <hr/>
              <h3> ${heading}  </h3>    
             </div>
             <div>
             <h4> ${date}<h4>
             </div>
            <h3> This is First page made using html </h3>
            <div>
            <div class="container">
            ${content}
            </div>
        </body>
    
</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/test-db', function(req,res){
    
});

app.get('/:articleName',function (req,res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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