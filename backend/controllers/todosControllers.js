import { ObjectId } from 'mongodb';

function controlTodos(todosCollection) {
  // GET ALL TODOS
  async function getAllTodos(req, res) {
    try {
      const allTodos = await todosCollection.find().toArray();
      res.status(200).json(allTodos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get todos' });
    }
  }

  // ADD TODO
  async function addTodo(req, res) {
    try {
      const newTodo = { text: req.body.text };
      const result = await todosCollection.insertOne(newTodo);
      res.status(201).json({ id: result.insertedId });
    } catch (error) {
      res.status(500).json({});
    }
  }

  // UPDATE TODO
  async function updateTodo(req, res) {
    try {
      const id = req.params.id;
      const result = await todosCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { text: req.body.text } },
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.status(200).json({ message: 'Todo updated' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  }

  // DELETE TODO
  async function deleteTodo(req, res) {
    try {
      const id = req.params.id;
      const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.status(200).json({ message: 'Todo deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  }

  return { getAllTodos, addTodo, updateTodo, deleteTodo };
}

export default controlTodos;
