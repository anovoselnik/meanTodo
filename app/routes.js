var Todo = require('./models/todo');
var User = require('./models/user');

module.exports = function(app) {

	app.get('/api/todos', function(req, res) {

		Todo.find(function(err, todos) {

			if (err)
				res.send(err);

			res.json(todos);

		});

	});

  app.post('/api/todos', function(req, res) {

    var todo = new Todo();
    todo.name = req.body.name;
    todo.created = Date.now();

    todo.save(function(err) {
      if (err)
        res.send(err);

      res.json(todo);
    });
      
  });

  app.put('/api/todos/:todo_id', function(req, res) {
		
		Todo.findById(req.params.todo_id, function(err, todo) {

      if (err)
          res.send(err);

      todo.name = req.body.name;
      todo.completed = req.body.completed;

      todo.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Todo updated!' });
      });

  	});

	});

	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id: req.params.todo_id
		}, 
		function(err, todo) {
			if (err)
			   res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


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