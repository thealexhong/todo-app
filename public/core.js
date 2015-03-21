var todo = angular.module('TODO', []);

function mainController($scope, $http)
{
  $scope.formData = {};

  /**
   * GET all todos and show them
   */
  $http.get('/api/todos').success(function(data)
  {
    $scope.todos = data;
  })
  .error(function(data)
  {
    console.log('Error:' + data);
  });

  /**
   * POST todo; send text to node API
   */
  $scope.createTodo = function()
  {
    $http.post('/api/todos', $scope.formData).success(function(data)
    {
      $scope.formData = {};
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data)
    {
      console.log('Error: ' + data);
    });
  };

  /**
   * DELETE todo after checking it
   */
  $scope.deleteTodo = function(id)
  {
    $http.delete('/api/todos/' + id).success(function(data)
    {
      $scope.todos = data;
    })
    .error(function(data)
    {
      console.log('Error: ' + data);
    });
  };
}