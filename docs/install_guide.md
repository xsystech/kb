## Инструкция по установке XRM Director v1.0 в CLI режиме (Командная строка) на Red OS 8.0

### 🚀 Быстрый старт

### Подготовка системы
Скачайте скрипт установки
```bash
wget -O xrmd_install.sh https://files.x-rm.ru/xrm_director/xrmd_install.sh
```
Сделайте скрипт исполняемым
```bash
chmod +x xrmd_install.sh
```

### Автоматическая установка (требует sudo):

Облегченная версия с CPU (рекомендуется для большинства случаев)
```bash
sudo ./xrmd_install.sh install slim cpu
```

Скрипт проверит Вашу систему на соответствие минимальным требованиям.
Если в вашей ОС установлен Docker, скрипт проинформирует об этом и продолжит установку, см. пример ниже
```
...
🐳 Проверка Docker...
✅ Docker установлен и запущен.
🎯 Установка XRM Director...
...
```

Если Docker не установлен, скрипт проинформирует об этом и предложит установить, см. пример ниже
```
sudo ./xrmd_install.sh install slim cpu
🚀 Автоматическая установка XRM Director
📦 Версия: slim
⚙️  Процессор: cpu

🔍 Проверка системных требований...
📋 Проверка системных требований:
✅ ОС: RED OS 8.0 - OK
✅ CPU: 6 ядер (требуется: 4)
✅ RAM: 16GB (требуется: 16GB)
✅ Диск: 56GB свободно (требуется: 50GB)
✅ Все системные требования выполнены
🐳 Проверка Docker...
❌ Docker не установлен. Установите Docker для продолжения.
Хотите установить Docker прямо сейчас? (д/y/да/yes - да, н/n/нет/no - нет): y
Установка Docker и Docker Compose на RedOS...
...
```

После установки Docker укажите имя пользователя, который будет работать с Docker, в примере ниже - "user".
Введите имя пользователя и нажмите Enter

```
...
Укажите имя пользователя, который будет работать с Docker:
user
Пользователь user успешно добавлен в группу docker
Docker и Docker Compose успешно установлены
====================================================

Нажмите Enter для продолжения...
✅ Docker успешно установлен. Продолжаем установку XRM Director.
🎯 Установка XRM Director...
Выбрана облегченная версия v0.19.1-slim
...
```

**Сообщение при успешном завершении установки:**
```
✅ XRM Director успешно установлен!
📁 Установочная директория: /opt/xrm-director/docker/
📋 Логи: /var/log/xrmd_install.log
```

Убедиться что все Docker контейнеры запущены Вы можете набрав команду

```bash
sudo docker ps -a --format "table {{.Names}}\t{{.CreatedAt}}\t{{.Status}}"
```

Контейнеры должны иметь статус "Up", колонка "STATUS", см. пример ниже

```
sudo docker ps -a --format "table {{.Names}}\t{{.CreatedAt}}\t{{.Status}}"
NAMES            CREATED AT                      STATUS
ragflow-server   2025-07-23 18:37:40 +0300 MSK   Up 10 minutes
ragflow-es-01    2025-07-23 18:37:39 +0300 MSK   Up 10 minutes (healthy)
ragflow-minio    2025-07-23 18:37:39 +0300 MSK   Up 10 minutes (healthy)
ragflow-mysql    2025-07-23 18:37:39 +0300 MSK   Up 10 minutes (healthy)
ragflow-redis    2025-07-23 18:37:39 +0300 MSK   Up 10 minutes (healthy)
ollama           2025-07-23 18:16:01 +0300 MSK   Up 32 minutes
```

Для дальнейшей работы с системой XRM Director смотрите раздел [Руководство Пользователя](https://kb.xsystech.ru/user_guide.html)

