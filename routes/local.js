const express = require('express');
const { getLocalDb } = require('../db');  // Подключаем функцию для работы с локальной базой данных
const router = express.Router();

// Маршрут для добавления новой записи в коллекцию 'test'
router.post('/add', async (req, res) => {
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

    // Выполняем вставку новой записи в коллекцию
    const result = await testCollection.insertOne(newItem);

    // Отправляем успешный ответ с ID вставленной записи
    res.status(201).json({ message: 'Запись успешно добавлена', insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/data', async (req, res) => {
    try {
        const localDb = getLocalDb();  // Получаем доступ к локальной базе данных
        if (!localDb) {
        throw new Error('Не удалось получить доступ к локальной базе данных');
        }

        const testCollection = localDb.collection('test');  // Обращаемся к коллекции 'test'
        const items = await testCollection.find().toArray();  // Получаем все данные из коллекции

        res.status(200).json(items);  // Отправляем данные в формате JSON
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/delete', async (req, res) => {
  const { email } = req.body;
  try {
    const db = getLocalDb();
    const userCollection = db.collection('users');

    // Проверяем, существует ли пользователь
    let user = await userCollection.findOne({ email });
    if (user) {
      await userCollection.deleteOne({email});
      return res.status(201).json({ msg: 'Пользователь удален' });
    } else {
      return res.status(400).json({ msg: 'Пользователь не найден' });
    }
} catch (err) {
    console.error('Ошибка сервера:', err.message);
    res.status(500).send('Ошибка сервера');
}
});
module.exports = router;
