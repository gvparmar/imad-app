var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var pool = require('pg').Pool;
var bodyParser = require('body-parser');
var config ={
    user:'parmarsir71',
    database:'parmarsir71',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));

app.use(bodyParser.json());
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

function hash (input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2","10000", salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res){
    var hashedString =hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/creat-user', function(req,res){
    var username =req.body.username;
    var password = req.body.password;
    
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user"(username,password) VALUE ($1,$2)',[username, dbString],function(err, result){
    if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send('user sucessfully created:',+username);
        }    
    });
});


app.post('/login', function(req, res){
    var username =req.body.username;
    var password = req.body.password;
    
    var dbString = hash(password, salt);
    
    pool.query('SELECT "FROM "user" where username=$1',[USERNAME],function(err, result){
    if(err){
            res.status(500).send(err.toString());
           }else {
            if(result.row.length===0) {
            res.send(403).send('username/password is invalid');
                 } else {
            var dbString = result.row[0].password;
            var salt = dbString.spilt('$')[2];
            var hashedPassword = hash(password, salt);
            if(hashedPassword===dbString){
                res.send('credential correct!');
            }else {
               res.send(403).send('username/password is invalid');
            }
         } 
        }   
    });
}); 

var pool = new pool(config);


app.get('/test-db', function(req,res){
    
    pool.query('SELECT * FROM test', function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    
});
});


app.get('/articles/:articleName', function (req, res) {
 // res.sendFile(path.join(__dirname, 'ui', 'article1.html'));
 
 pool.query("SELECT * FROM article WHERE title =$1",[req.params.articleName],function(err,result){
     if (err)
     {
        res.status(500).send(err.toString());
    }
   else
   { if(result.rows.length===0) {
       res.status(404).send('Article not found');
   }
   else
   { var articleData=result.rows[0];
    res.send(createTemplate(articleData));
 
   }
   }
   });

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