document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    debugger
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Отправка запроса на сервер
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // Передаем имя как JSON
    });

    const result = await response.json();
    const messageElement = document.getElementById('responseMessage');
    console.log(result)
    if (response.ok) {
        // Выводим сообщение об успешной отправке
        messageElement.textContent = result ? result.msg : "Данные успешно обновлены";
    } else {
        // Выводим сообщение об ошибке
        messageElement.textContent = 'Ошибка: ' + result.message;
    }

    // Очищаем поле ввода после отправки
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    debugger
    getUsers();
});

document.getElementById('deleteUserButton').addEventListener('click', async function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    debugger
    const email = document.getElementById('email').value;

    // Отправка запроса на сервер
    const response = await fetch('/local/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }) // Передаем имя как JSON
    });

    const result = await response.json();
    console.log(result);
    const messageElement = document.getElementById('responseMessage');
    if (response.ok) {
        // Выводим сообщение об успешной отправке
        messageElement.textContent = 'Пользователь удален: ' + result;
    } else {
        // Выводим сообщение об ошибке
        messageElement.textContent = 'Ошибка: ' + result.message;
    }

    // Очищаем поле ввода после отправки
    document.getElementById('email').value = '';
    debugger
    getUsers();
});


document.getElementById('getDataButton').addEventListener('click', function(event) {
    event.preventDefault // Предотвращаем ненужное поведение
    getUsers();
});


async function getUsers (){
    try {
        const response = await fetch('/local/data');  // Отправляем запрос на сервер для получения данных
        const data = await response.json();  // Получаем данные в формате JSON
        const dataList = document.getElementById('dataList');  // Элемент для вывода данных

        // Очищаем список перед вставкой данных
        dataList.innerHTML = '';

        // Проходим по полученным данным и выводим их на страницу
        data.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `ID: ${item._id}, Email: ${item.email}`;
            dataList.appendChild(itemElement);
        });
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}


