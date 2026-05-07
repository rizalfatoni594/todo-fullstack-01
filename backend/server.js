import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB, getDB } from './db.js';
import routeTodos from './routes/todosRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

async function startServer() {
  // CONNECT TO  DB
  await connectDB();
  const db = getDB();
  const todos = db.collection('todos');

  // HANDLE ROOT ENDPOINT
  app.get('/', (req, res) => {
    res.send('API is running');
  });

  // MOUNT ROUTES
  app.use('/todos', routeTodos(todos));

  // START SERVER
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
