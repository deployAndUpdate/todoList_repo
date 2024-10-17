const formTitle = document.getElementById('form-title');
const confirmPasswordGroup = document.getElementById('confirm-password-group');
const switchLink = document.getElementById('switch-link');
const submitBtn = document.getElementById('submit-btn');
let isLogin = true;  // Состояние: вход или регистрация

switchLink.addEventListener('click', () => {
    debugger
    if (isLogin) {
        formTitle.textContent = 'Регистрация';
        confirmPasswordGroup.classList.remove('hidden');
        submitBtn.textContent = 'Зарегистрироваться';
        switchLink.textContent = 'Уже есть аккаунт? Войти';
        isLogin = false;
    } else {
        formTitle.textContent = 'Вход';
        confirmPasswordGroup.classList.add('hidden');
        submitBtn.textContent = 'Войти';
        switchLink.textContent = 'Нет аккаунта? Зарегистрироваться';
        isLogin = true;
    }
});

submitBtn.addEventListener('click', async function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    debugger
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let response = {};
    if(isLogin){
        // Отправка запроса на сервер
        response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) // Передаем имя как JSON
        });
    } else {
        response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) // Передаем имя как JSON
        });
    }
    debugger
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


})