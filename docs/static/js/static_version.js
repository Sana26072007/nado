// Функции для статической версии (без Flask)

// Проверка ответов для level1
function checkLevel1Answer(button) {
    const isCorrect = button.closest('.correct-option') !== null;
    const feedback = document.getElementById('feedback');

    if (isCorrect) {
        button.classList.add('selected-correct');
        feedback.innerHTML = '<p class="correct-feedback">Правильно! Это было так весело!</p>';

        // Показываем галерею
        setTimeout(() => {
            const gallery = document.getElementById('photo-gallery');
            gallery.style.display = 'block';
            gallery.style.animation = 'fadeIn 1s ease';

            // Сохраняем прогресс
            localStorage.setItem('level1_completed', 'true');
        }, 800);
    } else {
        feedback.innerHTML = '<p class="wrong-feedback">Ну ты чо, неправильно... Попробуй еще раз!</p>';
    }
}

// Проверка ответов для level2
function checkLevel2Answer() {
    const answer = document.getElementById('answer-input').value.trim().toLowerCase();
    const feedback = document.getElementById('feedback');

    // Правильный ответ (замените на свой)
    const correctAnswers = ['колесо обозрения', 'обозрени', 'колесо'];
    const isCorrect = correctAnswers.some(correct => answer.includes(correct));

    if (isCorrect) {
        feedback.innerHTML = '<p class="correct-feedback">Правильно! Помню этот день!</p>';
        setTimeout(() => {
            const success = document.getElementById('success-content');
            success.style.display = 'block';
            success.style.animation = 'fadeIn 1s ease';
            localStorage.setItem('level2_completed', 'true');
        }, 800);
    } else {
        feedback.innerHTML = '<p class="wrong-feedback">Подсказка: высоко и вид на воду</p>';
    }
}

// Проверка ответов для level3
function checkLevel3Answer(button) {
    const answer = button.getAttribute('data-answer');
    const isCorrect = answer === 'улыбашка';
    const feedback = document.getElementById('feedback');

    if (isCorrect) {
        button.classList.add('selected-correct');
        feedback.innerHTML = '<p class="correct-feedback">Точно! Ты помнишь!</p>';
        setTimeout(() => {
            const success = document.getElementById('success-content');
            success.style.display = 'block';
            success.style.animation = 'fadeIn 1s ease';
            localStorage.setItem('level3_completed', 'true');
        }, 800);
    } else {
        feedback.innerHTML = '<p class="wrong-feedback">Ты же знаешь правильный ответ... Вспомни!</p>';
    }
}

// Сохранение сообщений в localStorage
function saveMessageToLocalStorage(message) {
    try {
        const messages = JSON.parse(localStorage.getItem('love_messages') || '[]');
        messages.unshift({
            text: message,
            timestamp: new Date().toISOString(),
            read: false
        });

        // Сохраняем максимум 50 сообщений
        if (messages.length > 50) {
            messages.length = 50;
        }

        localStorage.setItem('love_messages', JSON.stringify(messages));
        return true;
    } catch (e) {
        console.error('Ошибка сохранения:', e);
        return false;
    }
}

// Загрузка прогресса
function loadProgress() {
    const levels = ['level1_completed', 'level2_completed', 'level3_completed'];
    levels.forEach(level => {
        if (localStorage.getItem(level) === 'true') {
            console.log(`${level}: пройден`);
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();

    // Автоматическая проверка для level1
    document.querySelectorAll('.option-with-photo .option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            checkLevel1Answer(this);
        });
    });

    // Автоматическая проверка для level2
    const level2Btn = document.getElementById('submit-btn');
    if (level2Btn) {
        level2Btn.addEventListener('click', checkLevel2Answer);
    }

    // Автоматическая проверка для level3
    document.querySelectorAll('.options-same-color .option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            checkLevel3Answer(this);
        });
    });

    // Обработка формы сообщений
    const messageForm = document.getElementById('message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const textarea = this.querySelector('textarea');
            const message = textarea.value.trim();

            if (message.length < 5) {
                alert('Сообщение должно содержать хотя бы 5 символов');
                return;
            }

            if (saveMessageToLocalStorage(message)) {
                alert('Сообщение сохранено! 💌');
                textarea.value = '';
            } else {
                alert('Ошибка сохранения 😔');
            }
        });
    }
});