const express = require('express');
const router = express.Router();

// Временная "база данных" (список задач)
let tasks = [
  { id: 1, name: "Learn Node.js", completed: false },
  { id: 2, name: "Build a Task Manager", completed: false }
];

let dbInfo = [
    {
        id : "testBase", 
        user : "development-user"
    }
];

// Получить все задачи
router.get('/', (req, res) => {
  res.json(tasks);
});

router.get('/dbInfo', (req, res) => {
    res.json(dbInfo)
})

// Добавить новую задачу
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Task name is required" });
  }

  const newTask = {
    id: tasks.length + 1,
    name,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Удалить задачу по ID
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
