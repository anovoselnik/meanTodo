angular.module('MainCtrl', ['TodoService'])
.controller('MainController', function( $scope, Todo ) {

	$scope.todos = [];

	Todo.get().success(function(todos){
		$scope.todos = todos;
	});

	$scope.toggleCompleted = function(todo){

		todo.completed = !todo.completed;

		Todo.update(todo).success(function(todo){
  		angular.forEach($scope.todos, function(obj, index){
  		    
		    if (obj.$$hashKey === todo.$$hashKey) {
		      $scope.todos[index] = todo;
		      return;
		    };

		  });
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

  		angular.forEach($scope.todos, function(obj, index){
  		    
		    if (obj.$$hashKey === todo.$$hashKey) {
		      $scope.todos.splice(index, 1);
		      return;
		    };

		  });

  	});

  };

});