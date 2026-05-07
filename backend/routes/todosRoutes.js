import express from 'express';
import controlTodos from '../controllers/todosControllers.js';

const router = express.Router();

function routeTodos(todosCollection) {
  const { getAllTodos, addTodo, updateTodo, deleteTodo } =
    controlTodos(todosCollection);

  router.get('/', getAllTodos);
  router.post('/', addTodo);
  router.put('/:id', updateTodo);
  router.delete('/:id', deleteTodo);

  return router;
}

export default routeTodos;
