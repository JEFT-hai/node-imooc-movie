var _ = require('underscore')
var Category = require('../models/category')

	//admin page
exports.new = function(req, res) {
		res.render('category_admin', {
			title: 'imooc 后台分类录入页',
			category:{}
		})
	}

	// admin post movie
exports.save = function(req, res) {
		var _category = req.body.category
		var id = req.body.category._id 

		console.log(id)

		if(id){
			Category.findById(id, function(err,category){
				if(err){console.log(err)}

				_category = _.extend(category, _category)	
				_category.save(function(err, category) {
					if (err) {
						console.log(err)
					}

					res.redirect('/admin/category/list')
				})
			})	
		}
		else
		{
			var category = new Category(_category)

			category.save(function(err, category) {
				if (err) {
					console.log(err)
				}

				res.redirect('/admin/category/list')
			})
		}

		
		
	}

exports.update = function(req, res) {
		var id = req.params.id
		console.log('id',id)

		if (id) {

			Category.findById(id, function(err, category){					
					res.render('category_admin', {
						title: 'imooc 后台分类更新页',
						category:category
					})
			})
				
		}
		
	}	


	//list page
exports.list = function(req, res) {
		Category.fetch(function(err, categories) {
			if (err) {
				console.log(err)
			}

		  res.render('categorylist', {
		  	title: 'imooc 分类列表页',
		  	categories: categories
		  })
		})
	}
