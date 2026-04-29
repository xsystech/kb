# Инструкция по установке

***

В XRM версии 1.2.1, развертывание осуществляется автоматически, через интерактивный мастер установки, с использованием bash-скрипта. Который необходимо загрузить и запустить.

**Шаги для загрузки и запуска скрипта установки:**

**Шаг 1. Загрузка установочного скрипта**

Откройте терминал на вашем компьютере.

Скопируйте и вставьте следующую команду в терминал и нажмите Enter:

```bash
curl -sSf https://files.x-rm.ru/releases/v1.2.1/xrm_install.sh -o xrm_install.sh
```

Эта команда загрузит установочный скрипт xrm\_install.sh с удаленного сервера и сохранит его в текущем рабочем каталоге.

**Шаг 2. Установка прав на выполнение скрипта**

После завершения загрузки установочного скрипта, выполните следующую команду:

```bash
chmod +x xrm_install.sh
```

Эта команда установит право на выполнение для скачанного скрипта, что позволит вам запустить его как исполняемый файл.

**Шаг 3. Запуск установочного скрипта**

Чтобы запустить скрипт, открыть меню установки, выполните следующую команду:

```bash
sudo ./xrm_install.sh
```

Или вы можете выполнить все предыдущие шаги одной командой:

```bash
curl -sSf https://files.x-rm.ru/releases/v1.2.1/xrm_install.sh -o xrm_install.sh && chmod +x xrm_install.sh && sudo ./xrm_install.sh
```

Эта команда загрузит установочный скрипт, установит права на выполнение для него и непосредственно запустит скрипт.



**Установка XRM ver. 1.2.1**


⚠️ Для выполнения возможно потребуются права администратора. Если система запросит пароль администратора, введите его.

После запуска скрипта Вы увидите меню интерактивного мастера установки X Recovery Manager (XRM) версии 1.2.1

```
X Recovery Manager (XRM) ver. 1.2.1

Меню:

1. Системные требования
2. Информация об установленных Docker / Docker Compose
3. Установить Docker / Docker Compose (Ubuntu)
4. Установить XRM ver. 1.2.1
5. Перезапустить XRM ver. 1.2.1
6. Удалить XRM ver. 1.2.1
7. Установить пароль администратора XRM
8. Выйти
Выберите пункт меню:
```

В котором доступны следующие пункты:

* **Системные требования**: Показывает информацию о системных требованиях. Убедитесь, что ваша система соответствует минимальным техническим требованиям.
* **Информация об установленных Docker / Docker Compose**: Показывает информацию об установленных версиях Docker и Docker Compose, если они уже установлены.
* **Установить Docker / Docker Compose (Ubuntu)**: Запускает процесс установки Docker и Docker Compose на Ubuntu 22.04. (Для других ОС следуйте инструкциям по установке на [официальном сайте Docker](https://docs.docker.com/engine/install/))
* **Установить XRM ver. 1.2.1**: Начинает процесс установки XRM версии 1.2.1, если он не установлен.
* **Перезапустить XRM ver. 1.2.1**: Перезапускает XRM версии 1.2.1, если он уже установлен.
* **Удалить XRM ver. 1.2.1**: Удаляет XRM версии 1.2.1 с вашей системы.
* **Установить пароль администратора XRM** Позволяет установить/изменить текущий пароль администратора.
* **Выйти**: Завершает выполнение скрипта и выходит из меню.

Вы можете передавать аргумент который соответствует выбранному пункту меню при запуске скрипта из командной строки. Например, для установки XRM,  Вы можете использовать команду:

```bash
./xrm_install.sh 4
```

где `4` - это номер пункта меню "Установить XRM версии 1.2.1". Этот способ также работает для других пунктов меню: замените `4` на соответствующий номер для выбора нужной опции из меню.

Предварительно убедившись, что система соответствует требованиям и Docker / Docker Compose соответствующих версий установлены, выберите предпочтительный для вас способ установки: через интерактивное меню пункт 4, или путем ввода аргумента "4" из командной строки, при запуске скрипта.

#### Установка завершена.

После развертывания XRM в системе, вы можете проверить состояния контейнеров. Убедиться, что сервисы успешно запущены и работают.

```bash
sudo docker ps -a
```

Вывод:

```
CONTAINER ID   IMAGE                                   COMMAND                  CREATED       STATUS                   PORTS                                                 NAMES
c629dcf95b3a   stackstorm/st2actionrunner:latest       "/st2client-startup.…"   2 hours ago   Up 2 hours                                                                     xrm-client
df0c079715e3   stackstorm/st2chatops:latest            "/st2chatops-startup…"   2 hours ago   Exited (0) 2 hours ago                                                         xrm-chatops
bce99712cf08   xrmtech/st2web_xrm:v1.2.1               "/bin/bash -c 'if [ …"   2 hours ago   Up 2 hours (healthy)     0.0.0.0:80->80/tcp, 443/tcp                           xrm-web
a24e7b56977e   stackstorm/st2notifier:latest           "/opt/stackstorm/st2…"   2 hours ago   Up 2 hours                                                                     xrm-notifier
f52646071e8e   stackstorm/st2workflowengine:latest     "/opt/stackstorm/st2…"   2 hours ago   Up 2 hours                                                                     xrm-workflowengine
7771c868e1c2   stackstorm/st2actionrunner:latest       "/opt/stackstorm/st2…"   2 hours ago   Up 2 hours                                                                     xrm-actionrunner
0259baba59da   stackstorm/st2sensorcontainer:latest    "/opt/stackstorm/st2…"   2 hours ago   Up 2 hours                                                                     xrm-sensorcontainer
7c363285e0cf   stackstorm/st2auth:latest               "/opt/stackstorm/st2…"   2 hours ago   Up 2 hours               9100/tcp                                              xrm-auth
04cac422f879   stackstorm/st2timersengine:latest       "/opt/stackstorm/st2…"   2 hours ago   Up 2 hours                                                                     xrm-timersengine
5bea8a10f895   stackstorm/st2scheduler:latest          "/opt/stackstorm/st2…"   2 hours ago   Up 2 hours                                                                     xrm-scheduler
3fb5e5f0de93   stackstorm/st2garbagecollector:latest   "/opt/stackstorm/st2…"   2 hours ago   Up 2 hours                                                                     xrm-garbagecollector
a7358e2a3de9   stackstorm/st2stream:latest             "/opt/stackstorm/st2…"   2 hours ago   Up 2 hours               9102/tcp                                              xrm-stream
ac1eb4fdf658   stackstorm/st2rulesengine:latest        "/opt/stackstorm/st2…"   2 hours ago   Up 2 hours                                                                     xrm-rulesengine
99042986994b   stackstorm/st2api:latest                "/opt/stackstorm/st2…"   2 hours ago   Up 2 hours               9101/tcp                                              xrm-api
54004d678287   mongo:4.4                               "docker-entrypoint.s…"   2 hours ago   Up 2 hours               27017/tcp                                             xrm-mongo
4edf83a39fe6   redis:6.2                               "docker-entrypoint.s…"   2 hours ago   Up 2 hours               6379/tcp                                              xrm-redis
7011df05907c   rabbitmq:3.8                            "docker-entrypoint.s…"   2 hours ago   Up 2 hours               4369/tcp, 5671-5672/tcp, 15691-15692/tcp, 25672/tcp   xrm-rabbitmq
1d59d8895fe8   xrmtech/xrm-controller:v1.2.1           "./xrm-controller"       2 hours ago   Up 2 hours               0.0.0.0:8080->8080/tcp, :::8080->8080/tcp             xrm-controller
99dc07c28ea8   stackstorm/st2actionrunner:latest       "/makesecrets.sh"        2 hours ago   Exited (0) 2 hours ago                                                         xrm-makesecrets
```

В результате вы увидите список контейнеров в формате таблицы, который будет содержать информацию о каждом контейнере, включая его имя, ID, статус, порты, используемые ресурсы и другие сведения.

Чтобы повторно запустить интерактивный мастер установки, выполните **Шаг 3.** данной инструкции.
