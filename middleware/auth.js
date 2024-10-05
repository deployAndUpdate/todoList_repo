const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Получаем токен из заголовков
    const token = req.header('x-auth-token');

    // Проверяем наличие токена
    if (!token) {
        return res.status(401).json({ msg: 'Нет токена, авторизация отклонена' });
    }

    // Проверяем токен
    try {
        const decoded = jwt.verify(token, 'секретный_ключ');  // Верификация токена
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Токен недействителен' });
    }
};
