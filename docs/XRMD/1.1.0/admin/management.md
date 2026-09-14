# Настройка отправки уведомлений через PowerShell Remoting

Инструкция по настройке рабочего места (получателя уведомлений) и узла XRM Director для корректной доставки уведомлений через WinRM/PowerShell Remoting.

## Шаг 1. Настройка рабочего места

Применяется на рабочем месте, куда необходимо присылать уведомления. Поддерживается любая версия Windows 10/11/Server с поддержкой PowerShell Remoting.

### 1.1 Настройка правил Windows Firewall

В оснастке Windows Firewall рабочего места необходимо настроить правило **Windows Remote Management (HTTP-In)**:

- Для сетевых профилей **Private**, **Public**, **Domain** параметр **Remote Address** должен быть выставлен в значение **Any**.

### 1.2 Настройка WinRM через PowerShell

Выполнить в консоли PowerShell с правами администратора рабочего места:

```powershell
Enable-PSRemoting -Force
winrm set winrm/config/service/Auth "@{Basic="true"}"
winrm set winrm/config/service "@{AllowUnencrypted="true"}"
```

### 1.3 Создание локального пользователя

В шаблоне рабочего места/терминала должен быть создан **локальный пользователь с правами администратора**. Этот пользователь будет использоваться для аутентификации при отправке уведомлений.

## Шаг 2. Настройка узла XRM Director

Добавить учётные данные локального пользователя рабочего места (с админинистративными полномочиями, созданного на шаге 1.3) в настройки контейнера **backend**, в файле `backend/settings.py`:

```python
NOTIFICATION_LOGIN: str = "user"
NOTIFICATION_PASS: str = "password"
```

> Значения `NOTIFICATION_LOGIN` и `NOTIFICATION_PASS` должны соответствовать логину и паролю локального администратора, созданного на рабочем месте.
