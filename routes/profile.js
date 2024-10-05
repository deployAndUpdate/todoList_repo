const express = require('express');
const auth = require('../middleware/authToken');  // Импортируем middleware для проверки токена
const { getLocalDb } = require('../db');  // Получаем доступ к базе данных
const { ObjectId } = require('mongodb');
const router = express.Router();

// Защищенный маршрут
router.get('/', auth, async (req, res) => {
    try {
        const db = getLocalDb();
        const user = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });  // Используем req.user.id из токена
        // Возвращаем информацию о пользователе без пароля
        res.json({
            email: user.email,
            id: user._id
        });
    } catch (err) {
        console.error('Ошибка сервера:', err.message);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;
