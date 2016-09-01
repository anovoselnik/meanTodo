var TodoCtrl = require('./controllers/todosController');

module.exports = function(app) {

	app.get('/api/todos', TodoCtrl.getTodos)

    app.post('/api/todos', TodoCtrl.createTodo);

    app.put('/api/todos/:todo_id', TodoCtrl.updateTodo);

	app.delete('/api/todos/:todo_id', TodoCtrl.deleteTodo);

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};