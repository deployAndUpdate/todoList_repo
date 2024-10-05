const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Извлекаем токен из заголовка Authorization
    const token = req.header('Authorization');
    
    // Проверяем, передан ли токен
    if (!token) {
        return res.status(401).json({ msg: 'Нет токена, авторизация отклонена' });
    }

    try {
        // Проверяем, начинается ли токен с 'Bearer '
        const bearerToken = token.split(' ')[1];  // Извлекаем сам токен, убирая 'Bearer '
        // Проверяем токен
        const decoded = jwt.verify(bearerToken, '1234JDKJDSFKJsd');  // Ваш секретный ключ

        // Добавляем информацию о пользователе в объект запроса
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Токен недействителен' });
    }
};
