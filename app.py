from flask import Flask, render_template, request, jsonify, redirect, url_for, session
import os
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here_14_february_love'

# Правильные ответы
CORRECT_ANSWERS = {
    'level1': 'новогодний квн',
    'level2': 'колесо обозрения',  # ИЗМЕНИТЕ НА ПРАВИЛЬНОЕ МЕСТО!
    'level3': 'улыбашка'
}


# Инициализация сессии
@app.before_request
def init_session():
    if 'progress' not in session:
        session['progress'] = {
            'level1_completed': False,
            'level2_completed': False,
            'level3_completed': False,
            'started': False
        }


# Главная страница
@app.route('/')
def index():
    session['progress']['started'] = True
    return render_template('index.html')


# Страницы уровней
@app.route('/level/<int:level>', methods=['GET', 'POST'])
def level(level):
    if request.method == 'POST':
        user_answer = request.form.get('answer', '').strip().lower()
        correct_answer = CORRECT_ANSWERS.get(f'level{level}', '')

        if user_answer == correct_answer:
            session['progress'][f'level{level}_completed'] = True
            session.modified = True
            return jsonify({'correct': True})
        else:
            return jsonify({'correct': False})

    # Проверка доступа к уровню
    if level > 1 and not session['progress'].get(f'level{level - 1}_completed'):
        return redirect(url_for('index'))

    return render_template(f'level{level}.html')


# Финальная страница
@app.route('/final')
def final():
    # Проверяем, что все уровни пройдены
    if all([session['progress'].get('level1_completed'),
            session['progress'].get('level2_completed'),
            session['progress'].get('level3_completed')]):
        return render_template('final.html')
    return redirect(url_for('index'))


# Страница для сообщения
@app.route('/message')
def message():
    return render_template('message.html')


# Сохранение сообщения
@app.route('/save_message', methods=['POST'])
def save_message():
    message_text = request.form.get('message', '').strip()
    if message_text:
        try:
            # Сохраняем в файл
            with open('love_messages.txt', 'a', encoding='utf-8') as f:
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                f.write(f"\n=== Сообщение от {timestamp} ===\n")
                f.write(f"{message_text}\n")
                f.write("=" * 50 + "\n")
            return jsonify({'success': True})
        except:
            return jsonify({'success': False})
    return jsonify({'success': False})


# Сброс прогресса (для тестирования)
@app.route('/reset')
def reset():
    session.clear()
    return redirect(url_for('index'))


# Информация о прогрессе (API)
@app.route('/progress')
def get_progress():
    return jsonify(session.get('progress', {}))


# Обработка ошибок
@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html'), 404


if __name__ == '__main__':
    # Создаем папку для сообщений если её нет
    if not os.path.exists('static/images'):
        os.makedirs('static/images')

    # Запускаем сервер
    app.run(
        debug=True,
        host='0.0.0.0',  # Доступ с других устройств в сети
        port=5000
    )