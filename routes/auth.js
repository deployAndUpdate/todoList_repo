const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { getLocalDb } = require('../db');  // Функция для получения подключения к базе данных

const router = express.Router();
const secretKey = '1234JDKJDSFKJsd';
// Регистрация пользователя
router.post('/register', [
    check('email', 'Введите корректный email').isEmail(),
    check('password', 'Пароль должен содержать минимум 6 символов').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const db = getLocalDb();
        const userCollection = db.collection('users');

        // Проверяем, существует ли пользователь
        let user = await userCollection.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Пользователь уже существует' });
        }

        // Хешируем пароль
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Сохраняем нового пользователя в базу данных
        await userCollection.insertOne({
            email,
            password: hashedPassword
        });

        res.status(201).json({ msg: 'Пользователь зарегистрирован' });
    } catch (err) {
        console.error('Ошибка сервера:', err.message);
        res.status(500).send('Ошибка сервера');
    }
});

router.post('/login', [
    check('email', 'Введите корректный email').isEmail(),
    check('password', 'Введите пароль').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const db = getLocalDb();
        const userCollection = db.collection('users');

        // Проверяем, существует ли пользователь
        let user = await userCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Неверные учетные данные' });
        }

        // Сравниваем пароли
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Неверные учетные данные' });
        }

        // Генерируем JWT
        const payload = {
            user: {
                id: user._id
            }
        };
    
        jwt.sign(
            payload,
            secretKey,  // Секретный ключ для JWT
            { expiresIn: 3600 },  // Токен действителен 1 час
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error('Ошибка сервера:', err.message);
        res.status(500).send('Ошибка сервера');
    }
});


module.exports = router;
