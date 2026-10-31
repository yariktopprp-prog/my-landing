# xsiset

Портфолио разработчика. Статика без сборки и зависимостей: `index.html` + `style.css` + `script.js`.

## Локальный просмотр

Папка `D:\course\web` общая для всех веб-проектов, лендинг лежит в `xsiset_landing`. Сервер запускается из корня `web`, адрес лендинга получается с подпапкой:

```powershell
cd D:\course\web
python -m http.server 8123
```

Адрес: http://localhost:8123/xsiset_landing/

`404.html` подключает стили и ссылки от корня домена (`/style.css`, `/`), поэтому при локальном просмотре из подпапки она откроется без оформления. Это ожидаемо: в проде сайт лежит в корне, а nginx при `error_page` сохраняет исходный адрес, из-за чего относительные пути на вложенных URL ломаются.

## Контакты на сайте

| Что | Где |
|---|---|
| Ник (`xsiset`) | `index.html`, `data-i18n="brand"` в шапке и футере, плюс оба словаря в `script.js` |
| Telegram (`t.me/xsiset`) | `index.html`, блок `#contact` |
| Почта (`xsiset@proton.me`) | `index.html`, блок `#contact` |
| GitHub (`github.com/yariktopprp-prog`) | `index.html`, блок `#contact` |
| LeetCode (`leetcode.com/u/Xsbnk/`) | `index.html`, блок `#contact` |

## Структура страницы

1. Шапка: меню, переключатель RU/EN, кнопка темы (солнце/луна), кнопка «Связаться»
2. Hero: оффер, кнопки, терминал с логом деплоя
3. Проекты: 6 карточек и блок «Дальше будет больше»
4. Навыки: 6 направлений
5. Сертификаты: 14 изображений (`certs/`), имя и ссылки вырезаны, текстового слоя нет
6. Обо мне
7. Контакты
8. Футер

## Сертификаты

- готовые обезличенные картинки лежат в `certs/`, их и заливать на хостинг
- исходные PDF лежат в корне `D:\` (маска `D:\*-certificate-*.pdf`), вне папки сайта
- пересобрать картинки из PDF: `python D:\course\certs-src\redact.py`
- на странице отключены правый клик, перетаскивание и выделение внутри галереи
- клик по картинке (или Enter/Space с клавиатуры) открывает её в лайтбоксе, закрытие: крестик, клик по фону, Esc

## Как менять дизайн

Оформление сделано в языке apple.com: тёмная страница по умолчанию, много воздуха, крупная
типографика и один синий акцент. Никаких градиентов на тексте, свечения и неона — иерархию
держат размер шрифта, отступы и слои фона (`#000` → `#2c2c2e` → `#333335`). Светлая тема —
переключатель в шапке (солнце/луна), выбор запоминается в `localStorage`.

Токены лежат в `:root` в начале `style.css`, светлая тема — в `html[data-theme="light"]`:

```css
--bg:      #000000;   /* фон страницы */
--surface: #2c2c2e;   /* чередующиеся секции: заметный серый */
--card:    #333335;   /* карточки проектов */
--chip:    #414144;   /* теги стека */
--ink:     #f5f5f7;   /* текст */
--muted:   #a1a1a6;   /* вторичный текст */
--rule:    #424245;   /* волосяные линейки */
--blue:         #0071e3; /* кнопки */
--blue-text:    #2997ff; /* ссылки на тёмном */
--blue-text-hover:#6bb6ff;
--green:   #30d158;   /* статусы «в проде» */
--radius:  20px;      /* скругление карточек и терминала */
--wrap:    1020px;    /* ширина контента */
```

Тёмная тема — базовые значения `:root`; светлая переопределяет те же переменные
(`--bg:#fff`, `--surface:#f5f5f7`, `--card:#fff`, `--ink:#1d1d1f`, `--blue-text:#0066cc`).
Блок контактов (`#contact`) остаётся тёмным в обеих темах: цвета зафиксированы в
`--contact-bg` и `--contact-ink`, чтобы белая кнопка и синяя ссылка всегда читались.

Шрифт — системный SF на Apple-устройствах, иначе Inter (подключён с Google Fonts).
Моноширинный используется только в терминале. Точки перестроения: 900 / 734 / 620 / 420 px.

Стыки фона и серых секций не режутся линией: у каждой серой секции сверху и снизу есть
растушёвка 140 px (`--band-fade`, псевдоэлементы `::before`/`::after` с градиентом в `--bg`).
Работает в обеих темах: в тёмной чёрный плавно переходит в `#2c2c2e`, в светлой белый — в
`#f5f5f7`. Исключение — блок контактов в светлой теме: он остаётся чётким тёмным
прямоугольником. Смена темы анимируется 0.4 s на `background-color`/`color` — это приём из
`apple-design-motion` («cross-section theme morph»), при `prefers-reduced-motion` переходы
отключаются. В светлой теме подвал белый, без серой полосы внизу страницы.

## Технические детали

- Переключение языка: `data-i18n="key"` в HTML и словарь `I18N` в `script.js`, выбор хранится в `localStorage` (`dw-lang`).
- Тема: тёмная по умолчанию (атрибута нет), светлая — `data-theme="light"` на `<html>`. Выбор хранится в `localStorage` (`xsiset-theme`), инлайновый скрипт в `<head>` применяет его до первой отрисовки, поэтому вспышки светлой темы нет. Кнопка `#themeBtn` меняет атрибут, `meta[name="theme-color"]` и иконку; подпись переводится как `aria.theme`.
- Появление блоков: `IntersectionObserver` и класс `.reveal`. Если события не пришли за 2 сек (фоновая вкладка, prerender), всё показывается принудительно; конечное состояние фиксирует `.is-settled`, поэтому страница не может остаться прозрачной.
- Если `script.js` не загрузился, инлайновый таймер в `<head>` через 2,5 с ставит на `<html>` класс `js-safe`, и блоки показываются без анимации. При обычной загрузке `script.js` сразу ставит `js-ready`, и страховка не срабатывает.
- Без JS страница видна полностью: скрытие `.reveal` включается только при наличии класса `js` на `<html>`.
- Заголовок героя выезжает построчно при загрузке, лог деплоя плавно «догоняет» скролл через `lerp` в `requestAnimationFrame` (сдвиг ограничен 900 px прокрутки и отключается при `prefers-reduced-motion`).
- Подписи для скринридеров (`aria-label` у меню, кнопки закрытия, лайтбокса, терминала и карточек сертификатов) переводятся вместе с остальным текстом.
- Если `localStorage` недоступен (приватный режим, запрет cookies, `file://`), страница работает целиком, просто не запоминает язык.
- Почта: клик по адресу копирует его в буфер (`navigator.clipboard`, при отказе работает скрытая `textarea` + `execCommand`), подпись на 1.8 сек меняется на «Скопировано», для скринридеров есть `role="status"`. Если скопировать не удалось, под кнопками появляется видимая подсказка. В `href` остаётся `mailto:`, поэтому без JS ссылка работает как обычная почтовая.
- Поддержан `prefers-reduced-motion`, есть стили для печати.
- Поддержаны `prefers-contrast: more` (усиливает вторичный текст и границы) и `prefers-reduced-transparency` (убирает блюр шапки и лайтбокса, оставляя плотный фон). Для браузеров без `backdrop-filter` шапка тоже плотная.
- Lighthouse (accessibility / best practices / SEO): 100 / 100 / 100 на текущей версии.
- Тема: по умолчанию тёмная; кнопка в шапке переключает на светлую, выбор переживает перезагрузку, `theme-color` и иконка меняются вместе с ней.
- Точки перестроения сеток: 900 / 734 / 620 / 420 px, мобильное меню до 734 px. Сертификаты: 3 в ряд → 2 → 1.
- Ссылки на `style.css` и `script.js` идут с `?v=...`: после правок меняй версию, иначе браузер может отдать старый файл из кэша.

## Что проверено

Автоматические прогоны в браузере (DOM, без скриншотов):

- 100% ссылок и кнопок: якоря, RU/EN, бургер, кнопки hero, карточка «Дальше будет больше», 14 сертификатов, крестик и фон лайтбокса, кнопка «наверх», Telegram / почта / GitHub / LeetCode.
- Якоря попадают в секцию с отступом 96px от верха (липкая шапка 73px не перекрывает заголовок).
- Язык переключается целиком (title, meta, меню, тексты, `aria-pressed`) и сохраняется после перезагрузки; в EN вне раздела сертификатов кириллицы нет.
- Мобильное меню: открытие, закрытие по ссылке и Esc, `aria-expanded`.
- Лайтбокс: все 14 картинок, подпись, блокировка прокрутки, Esc, клик по фону и по крестику, возврат фокуса, Enter/Space с клавиатуры, удержание фокуса внутри диалога.
- Защита галереи: правый клик, drag и выделение отменяются.
- Горизонтального скролла нет на 320 / 375 / 768 / 1024 / 1440 px.
- Консоль без ошибок, все запросы 200/304.
- Подписи для скринридеров меняются вместе с языком: RU «Меню», EN «Menu», так же у лайтбокса и сертификатов.
- Без сохранённого выбора открывается русская версия, после переключения выбор запоминается.
- Почта: клик копирует `xsiset@proton.me` (в буфере оказывается ровно адрес), подпись меняется на «Скопировано» / «Copied» и через 1.8 сек возвращается, `mailto` не открывается; при запрете копирования показывается подсказка, без JS ссылка остаётся `mailto:`.
- Статическая проверка разметки и словарей: `python D:\course\web-tools\check_landing.py` (баланс тегов, дубли `id`, ключи RU/EN, размеры картинок, битые ссылки).

## Осторожно при заливке на хостинг

`D:\course\web` общая папка, в ней кроме лендинга живут `first`, `курс степик`, `настройки  проекта`. В последней есть `.env`, `venv` и код (46 МБ), включая `DATABASE_URL` и `SECRET_KEY`. Заливать надо не `web`, а содержимое `D:\course\web\xsiset_landing`: `index.html`, `style.css`, `script.js`, `404.html`, `robots.txt`, `og-image.png` и `certs/`. README на сервер не обязателен.

## Прод: домен + сервер с двумя ботами

Сайт статический, поэтому ему не нужен Python, Node или база. nginx отдаёт файлы, боты живут рядом на loopback и наружу не смотрят.

### 1. Что залить

```
/var/www/xsiset_landing/
├── index.html
├── style.css
├── script.js
├── 404.html
├── robots.txt
├── og-image.png
└── certs/cert-01.webp … cert-14.webp
```

```bash
sudo mkdir -p /var/www/xsiset_landing
sudo rsync -av --delete ./ /var/www/xsiset_landing/     # из папки, где лежат только файлы сайта
sudo chown -R www-data:www-data /var/www/xsiset_landing
sudo find /var/www/xsiset_landing -type d -exec chmod 755 {} \;
sudo find /var/www/xsiset_landing -type f -exec chmod 644 {} \;
```

Владелец `www-data` и права 644 важны: иначе nginx отдаст 403, а `.env` из соседних папок вообще не должен попасть на сервер.

### 2. nginx

`/etc/nginx/sites-available/xsiset`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    root /var/www/xsiset_landing;
    index index.html;

    # безопасность
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Frame-Options "DENY" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'sha256-kDXSzQJfpIp4jZeJz+IVdHKnZGRIo7TbJ7+v+n04EYA='; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; object-src 'none'" always;

    # сжатие
    gzip on;
    gzip_min_length 1024;
    gzip_types text/css application/javascript image/svg+xml application/json;

    # кэш: html не кэшируем, статику можно
    location = /index.html { expires -1; }
    location ~* \.(css|js)$ { expires 7d; }
    location ^~ /certs/ { expires 30d; }

    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;
    location = /404.html { internal; }

    # не отдавать служебные файлы, если они случайно окажутся в папке
    location ~ /\. { deny all; }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/xsiset /etc/nginx/sites-enabled/xsiset
sudo nginx -t && sudo systemctl reload nginx
```

Про CSP: хеш `sha256-kDXSzQ…` считается от инлайнового скрипта, который восстанавливает тему из `localStorage`, ставит класс `js` на `<html>` и включает страховку `js-safe` через 2,5 с. Если этот скрипт в `index.html` поменяется хоть на символ, хеш надо пересчитать: `python D:\course\web-tools\csp.py`. `style-src` разрешает `unsafe-inline`, потому что в разметке есть инлайновые `style="--d:60ms"`.

Важно: `add_header` внутри `location` отменяет наследование заголовков с уровня `server`. Поэтому кэш задаётся директивой `expires`, а не `add_header Cache-Control`, иначе security-заголовки на этих путях пропадут.

### 3. HTTPS

DNS: A-запись на IP сервера, при желании AAAA на IPv6. После того как домен начнёт резолвиться:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
sudo systemctl status certbot.timer   # продление
```

Certbot сам добавит `listen 443 ssl`, сертификаты и редирект с 80 на 443.

### 4. Боты рядом

Сайт и боты не конфликтуют: nginx слушает 80/443, боты занимают свои порты на `127.0.0.1`. Никакого `0.0.0.0` для ботов, иначе они окажутся в интернете.

`/etc/systemd/system/vpn-bot.service`:

```ini
[Unit]
Description=xsiset vpn bot
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=xsiset
WorkingDirectory=/opt/bots/vpn-bot
EnvironmentFile=/opt/bots/vpn-bot/.env
ExecStart=/opt/bots/vpn-bot/.venv/bin/python -m app.main
Restart=on-failure
RestartSec=5
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/bots/vpn-bot

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now vpn-bot proxy-bot
```

Если боту нужен вебхук, его принимает nginx и проксирует на loopback:

```nginx
location /bot/vpn/ {
    proxy_pass http://127.0.0.1:8081/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

PostgreSQL и Redis тоже должны слушать только `127.0.0.1` (`listen_addresses = 'localhost'`, `bind 127.0.0.1`).

### 5. Файрвол

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80,443/tcp
sudo ufw enable
```

Порты ботов, PostgreSQL (5432) и Redis (6379) наружу не открываются.

### 6. После покупки домена

Без этого сайт работает, но превью в Telegram и поисковиках будет неполным:

1. В `index.html` раскомментировать блок после `og:locale` и заменить `example.com` на домен: `canonical`, `og:url`, `og:image`, `og:image:width/height/alt`, `twitter:image`.
2. Проверить, что `https://домен/og-image.png` открывается по HTTPS и отдаёт PNG 1200×630.
3. Создать `sitemap.xml` с одним URL главной и добавить в `robots.txt` строку `Sitemap: https://домен/sitemap.xml`.
4. Проверить превью: отправить ссылку в «Избранное» Telegram (там кэш обновляется по кнопке) и прогнать через валидатор Open Graph.
5. Добавить сайт в Google Search Console / Яндекс.Вебмастер, чтобы он попал в индекс.

### 7. Проверка после деплоя

```bash
curl -I https://example.com/                 # 200, text/html
curl -I https://example.com/style.css        # 200, max-age
curl -I https://example.com/certs/cert-01.webp
curl -I https://example.com/404.html         # 404 (страница отдаётся как ошибка)
curl -s  https://example.com/robots.txt
```

Плюс в браузере: переключить RU/EN, открыть пару сертификатов, проверить консоль на ошибки CSP. Если CSP ругается на инлайновый стиль или скрипт, значит хеш устарел или появился новый инлайн-код.

