const express = require('express');
const auth = require('../middleware/auth');
const { getDb } = require('../db');
const router = express.Router();

// Защищенный маршрут
router.get('/profile', auth, async (req, res) => {
    try {
        const db = getDb();
        const user = await db.collection('users').findOne({ _id: req.user.id });

        // Возвращаем информацию о пользователе
        res.json(user);
    } catch (err) {
        console.error('Ошибка сервера:', err.message);
        res.status(500).send('Ошибка сервера');
    }
});

module.exports = router;
