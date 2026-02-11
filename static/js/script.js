// Анимация конфетти для финального экрана
function createConfetti() {
    const colors = ['#ff66a3', '#ff8ab3', '#ffb6d9', '#ffd1e6', '#ffebf3'];
    const container = document.querySelector('.container');

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.width = Math.random() * 20 + 10 + 'px';
        confetti.style.height = confetti.style.width;
        container.appendChild(confetti);
    }
}

// Управление слайд-шоу
let currentSlide = 0;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;

    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(++currentSlide);
}

function prevSlide() {
    showSlide(--currentSlide);
}

// Обработчики для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    // Анимация для правильных ответов на уровне 1
    const level1Buttons = document.querySelectorAll('.option-btn');
    level1Buttons.forEach(button => {
        button.addEventListener('click', function() {
            const isCorrect = this.classList.contains('correct');
            const feedback = document.getElementById('feedback');
            const gallery = document.getElementById('photo-gallery');

            if (isCorrect) {
                feedback.innerHTML = '<div class="key-animation">🔑</div><p class="correct-feedback">Правильно! Люблю тебя! 💖</p>';

                // Анимация появления галереи
                setTimeout(() => {
                    gallery.style.display = 'block';
                    gallery.style.animation = 'fadeIn 1s ease';
                }, 1000);
            } else {
                feedback.innerHTML = '<p class="wrong-feedback">Ну ты чо, неправильно 😉</p>';
            }
        });
    });

    // Для финального экрана
    if (document.querySelector('.final-content')) {
        createConfetti();
        showSlide(0);

        // Автоматическое переключение слайдов
        setInterval(nextSlide, 3000);
    }

    // Обработка секретного сообщения
    const messageForm = document.getElementById('message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = document.getElementById('secret-message').value;

            fetch('/save_message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'message=' + encodeURIComponent(message)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Сообщение сохранено! 💌');
                    document.getElementById('secret-message').value = '';
                }
            });
        });
    }
    // Общие функции для всех страниц

// Создание конфетти
function createConfetti() {
    const colors = ['#ff66a3', '#ff8ab3', '#ffb6d9', '#ffd1e6', '#ffebf3'];
    const container = document.querySelector('.container') || document.getElementById('confetti-container');

    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.width = Math.random() * 20 + 10 + 'px';
        confetti.style.height = confetti.style.width;
        container.appendChild(confetti);
    }
}

// Анимация сердечек
function animateHearts() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        heart.style.animationDelay = (index * 0.5) + 's';
    });
}

// Проверка уровня доступа
function checkLevelAccess() {
    // Можно добавить логику проверки прогресса
    return true;
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Анимация сердечек на главной
    animateHearts();

    // Конфетти на финальной странице
    if (document.querySelector('.final-screen')) {
        createConfetti();
    }

    // Анимация для конверта на странице сообщений
    const envelope = document.querySelector('.envelope-animation');
    if (envelope) {
        setInterval(() => {
            envelope.style.transform = 'scale(1.1)';
            setTimeout(() => {
                envelope.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    }

    // Проверка формы сообщения
    const messageForm = document.getElementById('message-form');
    if (messageForm) {
        const textarea = messageForm.querySelector('textarea');
        const charCounter = document.getElementById('char-counter');

        if (textarea && charCounter) {
            textarea.addEventListener('input', function() {
                charCounter.textContent = this.value.length;

                // Меняем цвет счетчика
                if (this.value.length < 10) {
                    charCounter.style.color = '#ff6666';
                } else if (this.value.length < 30) {
                    charCounter.style.color = '#ff9966';
                } else {
                    charCounter.style.color = '#66cc66';
                }
            });
        }
    }

    // Добавляем эффект при наведении на кнопки
    const buttons = document.querySelectorAll('.btn, .option-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Плавная прокрутка для всех ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Глобальные функции для слайд-шоу
if (typeof window !== 'undefined') {
    window.nextSlide = function() {
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        slides.forEach((slide, index) => {
            if (slide.classList.contains('active')) {
                currentSlide = index;
            }
        });

        slides.forEach(slide => slide.classList.remove('active'));

        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;

        slides[currentSlide].classList.add('active');
    };

    window.prevSlide = function() {
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        slides.forEach((slide, index) => {
            if (slide.classList.contains('active')) {
                currentSlide = index;
            }
        });

        slides.forEach(slide => slide.classList.remove('active'));

        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
    };
}
// Дополнительные функции для новых анимаций

// Создание плавающих сердечек для уровня 2
function createFloatingHeartsForLevel2() {
    const container = document.getElementById('floating-hearts');
    if (!container) return;

    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💞', '💝'];

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(heart);
    }
}

// Создание фейерверков для финальной страницы
function createFireworks() {
    const container = document.getElementById('fireworks-container');
    if (!container) return;

    const types = ['firework', 'star', 'sparkle'];
    const colors = ['#ff66a3', '#ff3385', '#ff8ab3', '#ffb6d9', '#ffffff', '#fff8dc'];

    for (let i = 0; i < 40; i++) {
        const element = document.createElement('div');
        const type = types[Math.floor(Math.random() * types.length)];
        element.className = type;

        if (type === 'firework') {
            element.style.left = Math.random() * 100 + 'vw';
            element.style.top = Math.random() * 100 + 'vh';
            element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            element.style.width = element.style.height = (Math.random() * 10 + 5) + 'px';
        } else if (type === 'star') {
            element.innerHTML = '★';
            element.style.left = Math.random() * 100 + 'vw';
            element.style.top = Math.random() * 100 + 'vh';
            element.style.color = colors[Math.floor(Math.random() * colors.length)];
            element.style.fontSize = (Math.random() * 20 + 10) + 'px';
            element.style.opacity = Math.random() * 0.8 + 0.2;
        } else if (type === 'sparkle') {
            element.innerHTML = '✦';
            element.style.left = Math.random() * 100 + 'vw';
            element.style.top = Math.random() * 100 + 'vh';
            element.style.color = colors[Math.floor(Math.random() * colors.length)];
            element.style.fontSize = (Math.random() * 15 + 8) + 'px';
        }

        element.style.animationDelay = Math.random() * 2 + 's';
        element.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(element);
    }
}

// Остановка анимаций через 5 секунд
function stopAnimationsAfterDelay(delay = 5000) {
    setTimeout(() => {
        const animations = document.querySelectorAll('#fireworks-container > div');
        animations.forEach(el => {
            el.style.animationPlayState = 'paused';
            el.style.opacity = '0.2';
            el.style.transition = 'opacity 2s ease';
        });
    }, delay);
}

// Обновленная инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Анимация сердечек на главной
    animateHearts();

    // Конфетти на финальной странице
    if (document.querySelector('.final-screen')) {
        createFireworks();
        stopAnimationsAfterDelay(5000);
    }

    // Плавающие сердечки на уровне 2
    if (document.querySelector('#floating-hearts')) {
        createFloatingHeartsForLevel2();
    }

    // Анимация для конверта на странице сообщений
    const envelope = document.querySelector('.envelope-animation');
    if (envelope) {
        setInterval(() => {
            envelope.style.transform = 'scale(1.1)';
            setTimeout(() => {
                envelope.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    }

    // Проверка формы сообщения
    const messageForm = document.getElementById('message-form');
    if (messageForm) {
        const textarea = messageForm.querySelector('textarea');
        const charCounter = document.getElementById('char-counter');

        if (textarea && charCounter) {
            textarea.addEventListener('input', function() {
                charCounter.textContent = this.value.length;

                // Меняем цвет счетчика
                if (this.value.length < 10) {
                    charCounter.style.color = '#ff6666';
                } else if (this.value.length < 30) {
                    charCounter.style.color = '#ff9966';
                } else {
                    charCounter.style.color = '#66cc66';
                }
            });
        }
    }

    // Добавляем эффект при наведении на кнопки
    const buttons = document.querySelectorAll('.btn, .option-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Для уровня 1: анимация при наведении на фото
    document.querySelectorAll('.option-with-photo').forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
});