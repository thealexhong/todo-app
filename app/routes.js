var Todo = require('./models/todo');

module.exports = function(app)
{
  /**
   * GET all todos
   */
  app.get('/api/todos', function(req, res)
  {
    // use mongoose to get all todos in the database
    Todo.find(function(err, todos)
    {
      // Check information retrieval
      if(err)
        res.send(err)

      res.json(todos); // returns all todos in JSON format
    });
  });

  /**
   * POST todo and send back all todos after creation
   */
  app.post('/api/todos', function(req, res)
  {
    // create a todo, infromation comes from AJAX request from angular
    Todo.create(
    {
      text : req.body.text,
      done : false
    },
    function(err, todo)
    {
      if(err)
        res.send(err);

      // get and return all todos after creation
      Todo.find(function(err, todos)
      {
        if(err)
          res.send(err);
        res.json(todos);
      });
    });
  });

  /**
   * DELETE a todo
   */
  app.delete('/api/todos/:todo_id', function(req, res)
  {
    Todo.remove(
    {
      _id : req.params.todo_id
    },
    function(err, todo)
    {
      if(err)
        res.send(err);
      
      // get and return all todos after deletion
      Todo.find(function(err, todos)
      {
        if(err)
          res.send(err);

        res.json(todos);
      });
    });
  });

  app.get('*', function(req, res)
  {
    res.sendfile('./public/index.html'); // load the single view file
  });
}