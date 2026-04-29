# Установка XRM на РЕД ОС

***

Развертывание осуществляется через терминал. Откройте терминал (командную строку) на вашей системе. Для этого вы можете нажать сочетание клавиш `Ctrl + Alt + T` (для большинства дистрибутивов Linux) или просто найти и запустить приложение "Терминал" (Terminal).


⚠️Для успешной установки требуются права администратора. Для выполнения команд с такими правами, используйте команду **`sudo`**

⚠️ Если вы используете **`su`**, сначала войдите в режим суперпользователя с помощью команды **`su`**`,` а затем выполняйте необходимые команды


#### Установка Docker:

**1.** Установить средство контейнеризации **docker**.

```bash
sudo dnf install docker-ce docker-ce-cli
```

В процессе на вопрос "Продолжить? \[д/Н]:" ввести "д"

**2.** Запустить сервис контейнеризации **docker** и добавить его в автозагрузку.

```bash
sudo systemctl enable docker --now
```

**3.** Убедиться что сервис запущен, проверив статус запущенной службы.

```bash
systemctl status docker
```

Вывод:

```
● docker.service - Docker Application Container Engine
     Loaded: loaded (/usr/lib/systemd/system/docker.service; enabled; vendor preset: disabled)
     Active: active (running) since Tue 2023-08-22 20:21:41 MSK; 1min 48s ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 30877 (dockerd)
      Tasks: 10
     Memory: 21.6M
        CPU: 785ms
     CGroup: /system.slice/docker.service
             └─30877 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

В статусе должно быть отображено **active (running)**.

#### Установка Docker Compose:

**4.** Загрузить Docker Compose версии 2.20.3 из официального репозитория Github.

```
su -c "curl -SL https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose"
```

**5.** Установить разрешения.

```
sudo chmod +x /usr/local/bin/docker-compose
```

#### **Установка XRM:**

После того, как **Docker** и **Docker Compose** установлены, приступаем к развертыванию **X Recovery Manager** **версии 1.2.1** с помощью скрипта установки.

Пожалуйста, перейдите в раздел **Инструкция по установке** чтобы продолжить процесс.
