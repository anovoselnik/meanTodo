var TodoCtrl = require('./controllers/todosController');
var User = require('./models/user');

module.exports = function(app) {

	app.get('/api/todos', TodoCtrl.getTodos)

    app.post('/api/todos', TodoCtrl.createTodo);

    app.put('/api/todos/:todo_id', TodoCtrl.updateTodo);

	app.delete('/api/todos/:todo_id', TodoCtrl.deleteTodo);

	// User routes

	app.post('/api/users', function(req, res) {
	  var user = new User({
	    username: req.body.username,
	    password: req.body.password
	  });

	  user.save(function(err) {
	    if (err)
	      res.send(err);

	    res.json({ message: 'New beer drinker added to the locker room!' });
	  });
	});

	app.get('/api/users', function(req, res) {
	  User.find(function(err, users) {
	    if (err)
	      res.send(err);

	    res.json(users);
	  });
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};