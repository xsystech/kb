Инструкция по установке XRM Director v1.0 в CLI режиме (Командная строка) на Red OS 8.0

## 🚀 Быстрый старт

### Подготовка системы
Скачайте скрипт установки
```bash
wget -O xrmd_install.sh https://files.x-rm.ru/xrm_director/xrmd_install.sh
```
Сделайте скрипт исполняемым
```bash
chmod +x xrmd_install.sh
```

#### Автоматическая установка (требует sudo):
```bash
# Облегченная версия с CPU (рекомендуется для большинства случаев)
sudo ./xrmd_install.sh install slim cpu

# Полная версия с CPU (больше возможностей, больше ресурсов)
sudo ./xrmd_install.sh install full cpu

# Облегченная версия с GPU (требуется NVIDIA GPU)
sudo ./xrmd_install.sh install slim gpu

# Полная версия с GPU (максимальная производительность)
sudo ./xrmd_install.sh install full gpu
```
