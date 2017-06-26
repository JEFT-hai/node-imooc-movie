var _ = require('underscore')
var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')
var Comment = require('../app/controllers/comment')
var Category = require('../app/controllers/category')

module.exports = function(app){

	app.use(function(req,res,next){
		var _user = req.session.user

		app.locals.user = _user

		next()

	})

	//index 
	app.get('/', Index.index)

	//user
	app.post('/user/signup',User.signup)
	app.post('/user/signin',User.signin)
	app.get('/signin',User.showsignin)
	app.get('/signup',User.showsignup)
	app.get('/user/logout',User.logout)
	app.get('/admin/userlist',User.signinRequired, User.userlist)

	//movie
	app.get('/movie/:id', Movie.detail)
	app.get('/admin/movie/new',User.signinRequired,Movie.new)
	app.get('/admin/movie/update/:id',User.signinRequired, Movie.update)
	app.post('/admin/movie/new',User.signinRequired, Movie.savePoster,Movie.save)
	app.get('/admin/movie/list',User.signinRequired,Movie.movielist)
	app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)

	//comment
	app.post('/user/comment',User.signinRequired,Comment.save)

	//category
	app.get('/admin/category/new',User.signinRequired,Category.new)
	app.post('/admin/category',User.signinRequired,Category.save)
	app.get('/admin/category/update/:id',User.signinRequired,Category.update)
	app.get('/admin/category/list',User.signinRequired,Category.list)

	//results
	app.get('/results',Index.search)

}
