const express = require('express');
const router = express.Router();
const app = express();
const { 
  getAtlasDb,
  listAtlasDatabases,
} = require('../db');  

router.get('/atlasDbs', async (req, res) => {
  try {
    const databases = await listAtlasDatabases();  
    res.json(databases);  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const db = getAtlasDb();
    const usersCollection = db.collection('users');  // Обращаемся к коллекции 'users' в базе 'sample_mflix'
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/dbInfo', (req, res) => {
    res.json(dbInfo)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: `Task ${id} deleted successfully` });
});


module.exports = router;
