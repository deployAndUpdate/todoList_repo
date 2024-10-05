const express = require('express');
const router = express.Router();
const app = express();
const { 
  getAtlasDb,
  getLocalDb,
  listAtlasDatabases,
  listLocalDatabases 
} = require('../db');  
// GET
router.get('/atlasDbs', async (req, res) => {
  try {
    const databases = await listAtlasDatabases();  
    res.json(databases);  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/localDbs', async (req, res) => {
  try {
    const databases = await listLocalDatabases();  
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

router.get('/local/list', async (req, res) => {
  try {
    const localDb = getLocalDb(); 
    const testCollection = localDb.collection('test');  // Обращаемся к коллекции 'test' в базе 'localDb'
    const test = await testCollection.find().toArray(); 
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})


router.get('/dbInfo', (req, res) => {
    res.json(dbInfo)
})

// POST
router.post('/local/add', async (req, res) => {
  try {
    const localDb = getLocalDb();  // Получаем доступ к локальной базе данных
    if (!localDb) {
      throw new Error('Не удалось получить доступ к локальной базе данных');
    }

    const testCollection = localDb.collection('test');  // Обращаемся к коллекции 'test'

    // Получаем данные из запроса
    const { name } = req.body;

    // Проверяем, что поле 'name' передано
    if (!name) {
      return res.status(400).json({ message: 'Поле "name" обязательно' });
    }

    // Создаем новый объект для вставки
    const newItem = {
      item: { name }
    };
    const result = await testCollection.insertOne(newItem);


    // Отправляем успешный ответ с ID вставленного документа
    res.status(201).json({ message: 'Данные успешно добавлены', insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE
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
