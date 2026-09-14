# Инструкция по установке


⚠️ Данная инструкция описывает только развертывание XRM Director на сервере, где \`Docker\` и \`Docker Compose\` уже установлены и готовы к работе.

⚠️ Установка Docker на российские ОС описана отдельной инструкцией и в данный документ не входит.


**Что будет развернуто**

В составе поставки используются два контейнера:

* `backend` — серверная часть XRM Director;
* `frontend` — веб-интерфейс XRM Director.

Используемые образы:

* `xrmtech/xrm-director-backend:1.2.1`
*   `xrmtech/xrm-director-frontend:1.2.1`

    <div data-gb-custom-block data-tag="hint" data-style="warning" class="hint hint-warning"><p>Если для версии XRM Director 1.2.1 должны использоваться другие теги контейнерных образов, замените их в файле <code>docker-compose.yml</code> до запуска.</p></div>

### Предварительные условия

Перед началом убедитесь, что:

* установлена РЕД ОС 8;
* пользователь имеет права `root` или может выполнять команды через `sudo`;
* `Docker` установлен;
* `Docker Compose` установлен;
* сервер имеет доступ к реестру контейнерных образов;
* свободны порты `80/tcp` и `8001/tcp`;
* настроена сетевая связность с брокерами OpenUDS;
* подготовлены учетные данные администратора для подключения к брокерам OpenUDS.
* рекомендуется заранее проверить DNS, синхронизацию времени и доступность целевых брокеров OpenUDS.

### Структура каталогов

Развертывание выполняется, например, в каталоге `/opt/xrmd`.

Итоговая структура:

```
/opt/xrmd/
├── docker-compose.yml
└── backend/
    ├── settings.py
    ├── logs/
    ├── plandata/
    └── db/
```

***

### Шаг 1. Подготовка каталогов

Создайте рабочие каталоги и перейдите в директорию развертывания:

```bash
sudo mkdir -p /opt/xrmd/backend/{logs,plandata,db}
sudo chown -R $USER:$USER /opt/xrmd
cd /opt/xrmd
```

### Шаг 2. Подготовка файла `settings.py`

Создайте файл `/opt/xrmd/backend/settings.py` со следующим содержимым:

```bash
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ADMIN_USER: str = "admin"
    ADMIN_PASSWORD: str = "admin"
    BROKER_CONN_TIMEOUT: int = 20  # Default timeout for broker connections
    
    class Config:
        env_file = ".env"

settings = Settings()
```

или скопируйте и выполните команду — файл будет создан автоматически:

```bash
cat > /opt/xrmd/backend/settings.py << 'EOF'
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ADMIN_USER: str = "admin"
    ADMIN_PASSWORD: str = "admin"
    BROKER_CONN_TIMEOUT: int = 20  # Default timeout for broker connections
    
    class Config:
        env_file = ".env"

settings = Settings()
EOF
```

#### Назначение параметров

* `ADMIN_USER` — логин администратора XRM Director;
* `ADMIN_PASSWORD` — пароль администратора XRM Director;

### Шаг 3. Подготовка файла `docker-compose.yml`

Создайте файл `/opt/xrmd/docker-compose.yml` со следующим содержимым:

```bash
services:
  backend:
    image: xrmtech/xrm-director-backend:1.2.1
    ports:
      - "8001:8001"
    volumes:
      - ./backend/settings.py:/app/settings.py
      - ./backend/logs:/app/logs
      - ./backend/plandata:/app/plandata
      - ./backend/db:/app/db

  frontend:
    image: xrmtech/xrm-director-frontend:1.2.1
    ports:
      - "80:80"

networks:
  default:
    name: xrm-network
```

или скопируйте и выполните команду — файл будет создан автоматически:

```bash
cat > /opt/xrmd/docker-compose.yml << 'EOF'
services:
  backend:
    image: xrmtech/xrm-director-backend:1.2.1
    ports:
      - "8001:8001"
    volumes:
      - ./backend/settings.py:/app/settings.py
      - ./backend/logs:/app/logs
      - ./backend/plandata:/app/plandata
      - ./backend/db:/app/db

  frontend:
    image: xrmtech/xrm-director-frontend:1.2.1
    ports:
      - "80:80"

networks:
  default:
    name: xrm-network
EOF
```

#### Что делает данный файл

* публикует веб-интерфейс на порту `80`;
* публикует backend API на порту `8001`;
* подключает постоянные каталоги с конфигурацией, журналами и данными;
*   создает сеть Docker `xrm-network`.

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>Если порт <code>8001</code> не должен быть доступен извне, после уточнения схемы эксплуатации его можно ограничить правилами межсетевого экрана или убрать из публикации.</p></div>

### Шаг 4. Запуск XRM Director

Из каталога `/opt/xrmd` выполните команду:

```bash
docker compose up -d
```

После запуска будут выполнены:

* создание сети `xrm-network`;
* загрузка контейнерных образов;
* создание контейнеров `backend` и `frontend`;
* запуск сервисов в фоновом режиме.

Проверьте состояние контейнеров:

```bash
docker compose ps -a
```

```
CONTAINER ID   IMAGE                                      COMMAND                  CREATED      STATUS                    PORTS                                         NAMES
d2735dcd514a   xrmtech/xrm-director-frontend:1.2.1   "/docker-entrypoint.…"   6 days ago   Up 24 seconds             0.0.0.0:80->80/tcp, [::]:80->80/tcp           xrmd_install-frontend-1
d5add673f488   xrmtech/xrm-director-backend:1.2.1    "uvicorn main:app --…"   6 days ago   Up 24 seconds             0.0.0.0:8001->8001/tcp, [::]:8001->8001/tcp   xrmd_install-backend-1
```


Если контейнеры \`frontend\` и \`backend\` находятся в состоянии \`Up\`, это означает, что сервисы успешно запущены и доступны для дальнейшей настройки.


#### Проверка веб-интерфейса

Откройте в браузере:

```
http://<IP-адрес_или_FQDN_сервера>/
```

Если в `settings.py` оставлены значения по умолчанию, используйте:

* логин: `admin`
* пароль: `admin`

***

### Управление сервисом

#### Остановка

```bash
cd /opt/xrmd
docker compose down
```

#### Остановка без удаления контейнеров

```bash
docker compose stop
```

#### Повторный запуск

```bash
docker compose start
```

#### Перезапуск

```bash
docker compose restart
```

***

### Обновление

Перед обновлением рекомендуется сохранить резервную копию каталога `/opt/xrmd/backend`.

Типовой порядок обновления:

```bash
cd /opt/xrmd
docker compose down
docker compose pull
docker compose up -d
```

Если обновление требует смены тегов образов, сначала внесите изменения в `docker-compose.yml`.

После обновления проверьте:

* состояние контейнеров;
* журналы `backend` и `frontend`;
* доступность веб-интерфейса;
* сохранность данных в каталогах `db`, `plandata`, `logs`.

***

### Резервное копирование

Для резервного копирования рекомендуется сохранять:

* `/opt/xrmd/docker-compose.yml`;
* `/opt/xrmd/backend/settings.py`;
* `/opt/xrmd/backend/db/`;
* `/opt/xrmd/backend/plandata/`;
* при необходимости `/opt/xrmd/backend/logs/`.

Пример архивирования:

```bash
sudo tar -czf /opt/xrmd-backup-$(date +%F).tar.gz /opt/xrmd
```
