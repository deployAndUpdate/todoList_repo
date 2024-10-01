const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обработки данных форм и JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Импорт маршрутов задач
const taskRoutes = require('./routes/tasks');

// Использование маршрутов
app.use('/tasks', taskRoutes);

// Главная страница
app.get('/', (req, res) => {
  res.send('Hello, World! This is your Task Manager!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
