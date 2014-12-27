var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var config = {
  'clientId': '8525ac7a0c9fe5d45644',
  'clientSecret': 'e48378ecd961810a35a1e04efb65235679e813ea',
  'url': 'https://api.github.com/repos/Planedia/planedia-site/',
  'members': 'https://api.github.com/orgs/planedia/members'
};
var access_token;

var url     = require('url');
var app     = express();
var router  = express.Router();

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9999');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.route('/login')
  .get(function (req, res, next) {
    res.redirect('https://github.com/login/oauth/authorize?client_id=' + config.clientId + '&scope=repo');
  });

app.get('/request_auth_token', function (req, res, next) {
    var getAuthTokenUrl = 'https://github.com/login/oauth/access_token?' +
    'client_id=' + config.clientId +
    '&client_secret=' + config.clientSecret +
    '&code=' + req.query.code;

    xhr = new XMLHttpRequest();
    xhr.open('POST', getAuthTokenUrl, false);
    xhr.send();

    var fakeUrl = 'http://fake.uri/?' + xhr.responseText;
    access_token = url.parse(fakeUrl, true).query['access_token'];

    if ( access_token ) {
      config.token = access_token;
    }
    else {
      config.token = null;
    }

    res.status(200).json(config)
});

app.get('/token', function (req, res, next) {
  res.status(200).json(config)
});

port = process.env.PORT || 9989;
app.listen(port);
console.log('Server started. Running on port', port);
