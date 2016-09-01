angular.module('MainCtrl', ['TodoService'])
.controller('MainController', function( $scope, Todo ) {

	$scope.todos = [];

    getTodos();

	$scope.toggleCompleted = function(todo){
		todo.completed = !todo.completed;

		Todo.update(todo).success(function(t) {
            todo = t;
        });
	};

    $scope.createTodo = function(newTodo){
    	Todo.create(newTodo).success(function(todo){
    		$scope.todos.push(todo);
    		$scope.newTodo = {};
    	});
    };

    $scope.deleteTodo = function(todo){
    	Todo.delete(todo._id).success(function(reponse){
            getTodos();
    	});
    };

    function getTodos() {
        Todo.get().success(function(todos){
            $scope.todos = todos;
        });
    };

});