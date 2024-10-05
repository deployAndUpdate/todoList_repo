document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    
    const name = document.getElementById('name').value;

    // Отправка запроса на сервер
    const response = await fetch('/local/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name }) // Передаем имя как JSON
    });

    const result = await response.json();
    const messageElement = document.getElementById('responseMessage');
    console.log(response)
    if (response.ok) {
        // Выводим сообщение об успешной отправке
        messageElement.textContent = 'Данные успешно добавлены: ' + result.insertedId;
    } else {
        // Выводим сообщение об ошибке
        messageElement.textContent = 'Ошибка: ' + result.message;
    }

    // Очищаем поле ввода после отправки
    document.getElementById('name').value = '';
});


document.getElementById('getDataButton').addEventListener('click', async function(event) {
event.preventDefault(); // Предотвращаем ненужное поведение

try {
    const response = await fetch('/local/data');  // Отправляем запрос на сервер для получения данных
    const data = await response.json();  // Получаем данные в формате JSON

    const dataList = document.getElementById('dataList');  // Элемент для вывода данных

    // Очищаем список перед вставкой данных
    dataList.innerHTML = '';

    // Проходим по полученным данным и выводим их на страницу
    data.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.textContent = `ID: ${item._id}, Имя: ${item.item.name}`;
        dataList.appendChild(itemElement);
    });
} catch (error) {
    console.error('Ошибка при получении данных:', error);
}
});
