const express = require('express');
const { 
  connectToAtlasDb, 
  connectToLocalDb,
  getAtlasDb,
  getLocalDb 
} = require('./db');
const path = require('path');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;
// Middleware для обработки данных форм и JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Импорт маршрутов задач
const taskRoutes = require('./routes/tasks');
const localRoutes = require('./routes/local');  

app.use('/api/auth', require('./routes/auth'));  // Регистрация и авторизация
app.use('/api/profile', require('./routes/profile'));  // Защищенные маршруты

// Использование маршрутов
app.use('/tasks', taskRoutes);
app.use('/local', localRoutes);
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'main.html'));
  // res.send('Hello, World! This is your Task Manager!');
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));  // Обслуживание HTML-файла
});

// Middleware для обработки данных формы и JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Подключаемся к MongoDB перед запуском сервера
const startServer = async () => {
  try {
    // Подключаемся к Atlas и локальной MongoDB
    await connectToAtlasDb();
    await connectToLocalDb();
    
    // После успешного подключения запускаем сервер
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to the databases', err);
    process.exit(1);  // Выходим из приложения в случае ошибки подключения
  }
};


startServer();



  