const express = require('express');
const jwtmethods = require('./utility/jwtmethods');
const usermethods = require('./utility/usermethods');

var bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})



app.get('/api', (req, res) => {
    res.json({
      message: 'Welcome to the API'
    });
});

app.post('/api/login', (req, res) => {
    const user = { id: 5,  username: 'brad' };

    var username = req.body.username ;
    var password = req.body.password ;
    if(username==user.username && password =="Mass4Pass"){
      var jwtToken =  jwtmethods.createToken(user);
      res.status(200).send({ 
        message:"Successfully Logged In", 
        passkey: usermethods.createPassKey(user),
        token: jwtToken 
      });
    }else{
      res.status(400).send({ error: "Invalid Login" });
    }
});


app.post('/api/posts', checkToken,verifyToken,verifyUser, (req, res) => {  
  console.log("req.body.sampledata = "+req.body.sampledata)
  console.log(req.user)
  res.status(200).send({ dataset:"TestDatas" });
});



/**----------- Middleware------------------------ */
function checkToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    if(bearer.length!=2){
      res.status(403).send({ error: "Authorization Bearer Token is missing" }); // Forbidden
    }
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();// Next middleware
  } else {
    res.status(403).send({ error: "Authorization header is missing" }); // Forbidden
  }
}

function verifyToken(req, res, next) {
  const jwtToken = req.token;
  //console.log("jwtToken = "+jwtToken);
  jwtmethods.verifyToken(jwtToken).then((response) => {
    req.user = response;
    next();// Next middleware
  })
  .catch((err) => {
    res.status(403).send({ error: "Invalid Token" }); // Forbidden
  });
}


function verifyUser(req, res, next) {
  
  if(req.body.passkey==undefined || req.body.passkey=="") {  res.status(403).send({ error: "Passkey is missing" });  }
  else{
    if(req.user==undefined) {  res.status(403).send({ error: "Forbidden Error" });  }
    else{
      const IsUserVerified = usermethods.verifyPassKey(req.body.passkey,req.user);
      if(IsUserVerified){ next(); }
      else{
        res.status(403).send({ error: "Invalid PassKey" });
      }
    }
  }
}

/**----------- Middleware End------------------------ */





app.listen(3000, () => console.log('Server started on port 3000'));