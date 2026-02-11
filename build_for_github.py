import os
import shutil
import re


def build_static_site():
    """Создает статическую версию сайта в папке docs/"""

    # Создаем папку docs
    if os.path.exists('docs'):
        shutil.rmtree('docs')
    os.makedirs('docs')

    # Копируем статические файлы
    if os.path.exists('static'):
        shutil.copytree('static', 'docs/static')

    # Копируем и конвертируем HTML файлы
    if os.path.exists('templates'):
        for filename in os.listdir('templates'):
            if filename.endswith('.html'):
                convert_html_file(filename)

    # Копируем дополнительные файлы
    for file in ['love_messages.txt', 'README.md']:
        if os.path.exists(file):
            shutil.copy(file, f'docs/{file}')

    print("✅ Статическая версия создана в папке docs/")
    print("📁 Структура docs/:")
    for root, dirs, files in os.walk('docs'):
        level = root.replace('docs', '').count(os.sep)
        indent = ' ' * 2 * level
        print(f'{indent}{os.path.basename(root)}/')
        subindent = ' ' * 2 * (level + 1)
        for file in files[:10]:  # показываем первые 10 файлов
            print(f'{subindent}{file}')
        if len(files) > 10:
            print(f'{subindent}... и еще {len(files) - 10} файлов')


def convert_html_file(filename):
    """Конвертирует HTML файл из Flask-шаблона в статический"""

    with open(f'templates/{filename}', 'r', encoding='utf-8') as f:
        content = f.read()

    # Заменяем Flask-шаблоны
    replacements = [
        (r'\{\{\s*url_for\(\'static\',\s*filename=\'([^\']+)\'\)\s*\}\}', r'static/\1'),
        (r'\{\{\s*url_for\(\'index\'\)\s*\}\}', 'index.html'),
        (r'\{\{\s*url_for\(\'level\',\s*level=1\)\s*\}\}', 'level1.html'),
        (r'\{\{\s*url_for\(\'level\',\s*level=2\)\s*\}\}', 'level2.html'),
        (r'\{\{\s*url_for\(\'level\',\s*level=3\)\s*\}\}', 'level3.html'),
        (r'\{\{\s*url_for\(\'final\'\)\s*\}\}', 'final.html'),
        (r'\{\{\s*url_for\(\'message\'\)\s*\}\}', 'message.html'),
    ]

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    # Удаляем вызовы к Flask серверу
    content = re.sub(r'fetch\([\'"]/level/\d+[\'"].*?\)',
                     '// Проверка ответа (удален серверный вызов)',
                     content, flags=re.DOTALL)

    content = re.sub(r'fetch\([\'"]/save_message[\'"].*?\)',
                     '// Сохранение в localStorage (удален серверный вызов)',
                     content, flags=re.DOTALL)

    # Сохраняем в docs
    with open(f'docs/{filename}', 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"📄 Конвертирован: {filename}")


if __name__ == '__main__':
    build_static_site()