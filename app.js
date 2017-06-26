var express = require('express')
var path = require('path')
var mongoose = require('mongoose')


var cookieParser = require('cookie-parser')
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var port = process.env.PORT || 3000
var app = express()
var bodyParser = require('body-parser')

var logger = require('morgan')

var dbUrl = 'mongodb://localhost/imooc'

mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({extended:true}))

app.use(require('connect-multiparty')())

app.use(cookieParser())
app.use(session({
	secret:'imooc',
	store:new MongoStore({
		url:dbUrl,
		collection:'sessions'
	}),
	resave:false,
    saveUninitialized:true
}))
app.use(express.static(path.join(__dirname, 'public'))) //静态文件配置的目录
// app.use(express.static('bower_components'))
app.locals.moment = require('moment')
app.listen(port)

require('./config/routes')(app)

console.log('imooc started on port ' + port)

if('development' === app.get('env')){
	app.set('showStackError',true)
	app.use(logger(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug',true)
}