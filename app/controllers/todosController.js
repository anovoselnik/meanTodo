var Todo = require('../models/todo');

exports.getTodos = function(req, res) {

  Todo.find(function(err, todos) {

    if (err)
      res.send(err);

    res.json(todos);

  });

};

exports.createTodo = function(req, res) {

  var todo = new Todo();
  todo.name = req.body.name;
  todo.created = Date.now();
  console.log(todo);
  todo.save(function(err) {
    if (err)
      res.send(err);

    console.log(todo);

    res.json(todo);
  });
    
};

exports.updateTodo = function(req, res) {
  
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

};

exports.deleteTodo = function(req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, 
  function(err, todo) {
    if (err)
       res.send(err);

    res.json({ message: 'Successfully deleted' });
  });
};