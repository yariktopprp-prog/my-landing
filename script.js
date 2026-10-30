/* =========================================================
   xsiset: логика страницы
   1) переключение RU / EN
   2) тема: тёмная по умолчанию, светлая по кнопке
   3) мобильное меню
   4) шапка при скролле
   5) появление блоков
   6) параллакс лога в герое
   ========================================================= */

(function () {
  'use strict';

  // отметка для страховки в <head>: если этот файл не загрузится,
  // через 2,5 с включится класс js-safe и блоки покажутся без анимации
  document.documentElement.classList.add('js-ready');

  /* ---------------------- СЛОВАРИ ---------------------- */

  const I18N = {
    ru: {
      'meta.title': 'xsiset · портфолио разработчика',
      'meta.desc': 'Проекты и навыки разработчика: VPN-сервис, Telegram-боты, парсеры, автоматизация и собственный язык программирования. Python, Go, Rust, C, C++, JavaScript, React.',

      'brand': 'xsiset',
      'nav.projects': 'Проекты',
      'nav.skills': 'Навыки',
      'nav.certs': 'Сертификаты',
      'nav.about': 'Обо мне',
      'nav.cta': 'Связаться',

      'hero.t1': 'Серверы, боты',
      'hero.t2': 'и компилятор.',
      'hero.text': 'VPN-сервис, Telegram-боты, парсеры и собственный язык программирования.',
      'hero.cta1': 'Смотреть проекты',
      'hero.cta2': 'Написать мне',

      'proj.title': 'Что уже работает',
      'proj.text': 'Не концепты в кейсах, а сервисы с серверами, оплатой и поддержкой.',
      'status.live': 'в проде',
      'status.dev': 'в разработке',

      'p1.name': 'VPN-сервис',
      'p1.desc': 'Собственная инфраструктура под ключ: серверы, выдача конфигов, подписки, продление и оплата. Без сторонних посредников, всё под контролем.',
      'p2.name': 'Telegram-бот с VPN',
      'p2.desc': 'Подписка оформляется прямо в чате: оплата, автовыдача ключей, продление и напоминания. Полный цикл без менеджера.',
      'p3.name': 'Бот с прокси',
      'p3.desc': 'Покупаю прокси и раздаю доступ: выдача по запросу, лимиты на пользователя и учёт остатка.',
      'p4.name': 'Парсер Яндекс.Карт',
      'p4.desc': 'Ищет бизнесы с определённой оценкой и собирает те, у которых есть Telegram для связи. Выгружает контакты в CSV/Excel.',
      'p5.name': 'Автоматизация процессов',
      'p5.desc': 'Связываю сервисы в цепочку: собрать данные, обработать, уведомить, записать. Убираю повторяющиеся действия из процессов.',
      'p6.name': 'Собственный язык программирования',
      'p6.desc': 'Компилятор и рантайм на чистом C: лексер, парсер, AST, семантика и генерация кода.',
      'proj.ctaTitle': 'Дальше будет больше',
      'proj.ctaText': 'Автоматизация и свой язык ещё в работе. Появятся здесь, как только дойдут до рабочего состояния.',
      'proj.ctaBtn': 'Обо мне',

      'sk.title': 'Чем это сделано',
      'sk.text': 'Тот же стек, что и в проектах выше.',
      'k1.t': 'Фронтенд и React',
      'k1.d': 'HTML, CSS, JavaScript и React: адаптив, анимации, доступность и аккуратная структура.',
      'k2.t': 'Бэкенд и API',
      'k2.d': 'Python, Go, Rust: HTTP-сервисы, базы данных, очереди, платежи и авторизация.',
      'k3.t': 'Telegram-боты',
      'k3.d': 'aiogram и Bot API: подписки, автовыдача доступа, оплата, уведомления и поддержка.',
      'k4.t': 'Парсинг данных',
      'k4.d': 'Playwright и requests: сбор по расписанию, обход лимитов, чистка дублей, выгрузка в CSV/Excel.',
      'k5.t': 'Системное программирование',
      'k5.d': 'C, C++, Rust: работа с памятью, сети, протоколы, компиляторы и рантаймы.',
      'k6.t': 'Инфраструктура',
      'k6.d': 'Linux, Docker, WireGuard, деплой и мониторинг.',

      'cert.title': '14 сертификатов',
      'cert.text': 'Python, Go, C, C++, Rust, SQL, JavaScript и веб. Имена и ссылки на сертификатах скрыты.',

      'about.title': 'От вёрстки до компиляторов',
      'about.text1': 'Начинал с сайтов, дальше ушёл в бэкенд, ботов и системное программирование. Поэтому в портфолио рядом живут VPN-сервис, парсер карт и собственный язык. Это не разные увлечения, а один навык: выбирать инструмент под задачу, а не под привычку.',
      'about.text2': 'Сайты собираю на HTML, CSS, JavaScript и React, вёрстка остаётся чистой и её легко поддерживать. Если проекту нужен бэкенд, пишу на Python, Go или Rust.',
      'about.f1': 'Полный цикл: от идеи и вёрстки до сервера и поддержки',
      'about.f2': 'От CSS до компилятора.',
      'about.f3': 'Читаю чужой код и англоязычную документацию без словаря',

      'cta.title': 'Напишите мне',
      'cta.text': 'Расскажу подробнее о любом проекте и отвечу на вопросы.',
      'cta.tg': 'Написать в Telegram',
      'cta.mail': 'xsiset@proton.me',
      'cta.copied': 'Скопировано',
      'cta.copyFail': 'Не удалось скопировать адрес, попробуйте ещё раз',

      'a11y.skip': 'К содержимому',
      'aria.lang': 'Язык',
      'aria.theme': 'Сменить тему',
      'aria.menu': 'Меню',
      'aria.up': 'Наверх',
      'aria.dialog': 'Просмотр сертификата',
      'aria.close': 'Закрыть',
      'aria.cert': 'Открыть сертификат: ',
      'aria.term': 'Терминал с логом деплоя',
      'aria.mail': 'Скопировать адрес почты xsiset@proton.me',

      'ftr.copy': '© 2026 xsiset'
    },

    en: {
      'meta.title': 'xsiset · developer portfolio',
      'meta.desc': 'Projects and skills: a VPN service, Telegram bots, scrapers, automation and a programming language of my own. Python, Go, Rust, C, C++, JavaScript, React.',
      'brand': 'xsiset',
      'nav.projects': 'Work',
      'nav.skills': 'Skills',
      'nav.certs': 'Certs',
      'nav.about': 'About',
      'nav.cta': 'Get in touch',

      'hero.t1': 'Servers, bots',
      'hero.t2': 'and a compiler.',
      'hero.text': 'A VPN service, Telegram bots, scrapers and a programming language of my own.',
      'hero.cta1': 'See the projects',
      'hero.cta2': 'Get in touch',

      'proj.title': 'What already runs',
      'proj.text': 'Not case-study mockups, but services with servers, payments and support.',
      'status.live': 'live',
      'status.dev': 'in progress',

      'p1.name': 'VPN service',
      'p1.desc': 'Full in-house infrastructure: servers, config delivery, subscriptions, renewals and payments. No middlemen, everything under control.',
      'p2.name': 'Telegram VPN bot',
      'p2.desc': 'Subscriptions are handled right in the chat: payment, instant key delivery, renewals and reminders. The whole cycle without a manager.',
      'p3.name': 'Proxy bot',
      'p3.desc': 'I buy proxies and hand out access: on-demand delivery, per-user limits and balance tracking.',
      'p4.name': 'Yandex Maps scraper',
      'p4.desc': 'Finds businesses with a given rating and collects those that have Telegram for contact. Exports contacts to CSV/Excel.',
      'p5.name': 'Process automation',
      'p5.desc': 'I chain services together: collect data, process it, notify, store. Removing repetitive steps from processes.',
      'p6.name': 'A programming language of my own',
      'p6.desc': 'Compiler and runtime in plain C: lexer, parser, AST, semantics and code generation.',
      'proj.ctaTitle': 'More to come',
      'proj.ctaText': 'Automation and my own language are still in progress. They will show up here once they work.',
      'proj.ctaBtn': 'About me',

      'sk.title': 'What it is built with',
      'sk.text': 'The same stack as the projects above.',
      'k1.t': 'Frontend & React',
      'k1.d': 'HTML, CSS, JavaScript and React: responsive layout, motion, accessibility and clean structure.',
      'k2.t': 'Backend & APIs',
      'k2.d': 'Python, Go, Rust: HTTP services, databases, queues, payments and auth.',
      'k3.t': 'Telegram bots',
      'k3.d': 'aiogram and Bot API: subscriptions, automatic access delivery, payments, notifications and support.',
      'k4.t': 'Data scraping',
      'k4.d': 'Playwright and requests: scheduled collection, rate-limit handling, deduplication, CSV/Excel export.',
      'k5.t': 'Systems programming',
      'k5.d': 'C, C++, Rust: memory, networking, protocols, compilers and runtimes.',
      'k6.t': 'Infrastructure',
      'k6.d': 'Linux, Docker, WireGuard, deployment and monitoring.',

      'cert.title': '14 certificates',
      'cert.text': 'Python, Go, C, C++, Rust, SQL, JavaScript and web. Names and links on the certificates are hidden.',

      'about.title': 'From markup to compilers',
      'about.text1': 'I started with websites, then moved into backend, bots and systems programming. That is why a VPN service, a maps scraper and my own language sit side by side in the portfolio. They are not separate hobbies but one skill: choosing the right tool for the job instead of the familiar one.',
      'about.text2': 'I build sites with HTML, CSS, JavaScript and React, keeping the markup clean and easy to maintain. When a project needs a backend, it is Python, Go or Rust.',
      'about.f1': 'Full cycle: from idea and markup to server and support',
      'about.f2': 'From CSS to a compiler.',
      'about.f3': 'I read other people’s code and English docs without a dictionary',

      'cta.title': 'Write to me',
      'cta.text': 'I will tell you more about any project and answer your questions.',
      'cta.tg': 'Message me on Telegram',
      'cta.mail': 'xsiset@proton.me',
      'cta.copied': 'Copied',
      'cta.copyFail': 'Could not copy the address, please try again',

      'a11y.skip': 'Skip to content',
      'aria.lang': 'Language',
      'aria.theme': 'Switch theme',
      'aria.menu': 'Menu',
      'aria.up': 'Back to top',
      'aria.dialog': 'Certificate preview',
      'aria.close': 'Close',
      'aria.cert': 'Open certificate: ',
      'aria.term': 'Terminal with the deployment log',
      'aria.mail': 'Copy email address xsiset@proton.me',

      'ftr.copy': '© 2026 xsiset'
    }
  };

  const STORAGE_KEY = 'dw-lang';
  const THEME_KEY = 'xsiset-theme';
  const root = document.documentElement;
  const nodes = document.querySelectorAll('[data-i18n]');

  /* ---------------------- ТЕМА ---------------------- */

  // тёмная включена по умолчанию, светлая — только по явному выбору.
  // data-theme ставится ещё в <head>, до первой отрисовки, чтобы не было вспышки.
  const themeBtn = document.getElementById('themeBtn');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function setTheme(theme, persist) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    if (themeMeta) themeMeta.setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');
    if (persist) {
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* не критично */ }
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true);
    });
  }

  /* ---------------------- ПЕРЕВОД ---------------------- */

  // localStorage может быть недоступен: приватный режим, запрет cookies,
  // открытие через file://. Тогда просто работаем без сохранения выбора.
  function savedLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function storeLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* не критично */ }
  }

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.ru;

    nodes.forEach(function (node) {
      const key = node.getAttribute('data-i18n');
      if (dict[key]) node.textContent = dict[key];
    });

    // подписи для скринридеров тоже переводятся
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key]) el.setAttribute('aria-label', dict[key]);
    });

    if (dict['aria.cert']) {
      document.querySelectorAll('.cert-card__img').forEach(function (box) {
        const card = box.closest('.cert-card');
        const name = card ? card.querySelector('.cert-card__name').textContent : '';
        box.setAttribute('aria-label', dict['aria.cert'] + name);
      });
    }

    if (dict['meta.title']) document.title = dict['meta.title'];

    const desc = document.querySelector('meta[name="description"]');
    if (desc && dict['meta.desc']) desc.setAttribute('content', dict['meta.desc']);

    // если на экране подсказка о копировании, переводим её по сохранённому типу
    const status = document.getElementById('mailStatus');
    const kind = status ? status.dataset.kind : '';
    if (status && status.classList.contains('is-shown') && kind && dict['cta.' + kind]) {
      status.textContent = dict['cta.' + kind];
    }

    root.setAttribute('lang', lang);
    storeLang(lang);

    document.querySelectorAll('.lang__btn').forEach(function (btn) {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  document.querySelectorAll('.lang__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.dataset.lang);
    });
  });

  /* ---------------------- МОБИЛЬНОЕ МЕНЮ ---------------------- */

  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  function closeMenu() {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();

        // после закрытия меню ссылка скрыта: переводим фокус на заголовок
        // раздела, иначе он остаётся на <body> и скринридер теряет контекст
        const hash = link.getAttribute('href') || '';
        const target = hash.length > 1 ? document.querySelector(hash) : null;
        const focusTo = target ? (target.querySelector('h1, h2') || target) : null;
        if (focusTo) {
          focusTo.setAttribute('tabindex', '-1');
          // фокус ставим после перехода по якорю: иначе браузер сбрасывает его на <body>
          setTimeout(function () {
            try { focusTo.focus({ preventScroll: true }); } catch (e) { focusTo.focus(); }
          }, 0);
        }
      });
    });

    // при выходе из мобильной ширины меню закрываем: иначе класс is-open
    // остаётся и меню само откроется при возврате к узкому экрану
    const wideMq = window.matchMedia('(min-width: 821px)');
    function closeOnWide(e) { if (e.matches) closeMenu(); }
    if (wideMq.addEventListener) wideMq.addEventListener('change', closeOnWide);
    else if (wideMq.addListener) wideMq.addListener(closeOnWide);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        burger.focus();
      }
    });
  }

  /* ---------------------- ШАПКА ПРИ СКРОЛЛЕ ---------------------- */

  const hdr = document.getElementById('hdr');

  function onScroll() {
    if (hdr) hdr.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------------- ПОЯВЛЕНИЕ БЛОКОВ ---------------------- */

  const reveals = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // фиксируем конечное состояние: если браузер не проиграл transition,
  // элемент всё равно станет видимым
  function showReveal(el) {
    el.classList.add('is-in');
    setTimeout(function () { el.classList.add('is-settled'); }, 900);
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(showReveal);
  } else {
    let ioStarted = false;

    const io = new IntersectionObserver(function (entries) {
      ioStarted = true;
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          showReveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { io.observe(el); });

    // страховка: в фоновой вкладке или при prerender первые события могут не прийти,
    // тогда показываем всё без анимации, чтобы страница не осталась пустой
    setTimeout(function () {
      if (ioStarted) return;
      io.disconnect();
      reveals.forEach(showReveal);
    }, 2000);
  }

  /* ---------------------- ПАРАЛЛАКС ГЕРОЯ ---------------------- */

  // непрерывное движение, привязанное к скроллу: лог уезжает медленнее страницы.
  // Значение догоняется через lerp в rAF, поэтому движение плавное и прерываемое.
  const heroVisual = document.querySelector('.hero__visual');

  if (heroVisual && !reduceMotion) {
    let target = 0;
    let current = 0;
    let frame = null;

    function followScroll() {
      target = Math.min(window.scrollY, 900);
      current += (target - current) * 0.09;
      heroVisual.style.transform = 'translate3d(0,' + (current * 0.055).toFixed(2) + 'px,0)';

      if (Math.abs(target - current) > 0.1) {
        frame = requestAnimationFrame(followScroll);
      } else {
        frame = null;
      }
    }

    function requestFrame() {
      if (!frame) frame = requestAnimationFrame(followScroll);
    }

    window.addEventListener('scroll', requestFrame, { passive: true });
    requestFrame();
  }

  /* ---------------------- СЕРТИФИКАТЫ И ЛАЙТБОКС ---------------------- */

  const certGrid = document.getElementById('certGrid');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');
  let lastFocused = null;

  // пока диалог открыт, остальная страница недоступна для фокуса и скринридера
  const pageParts = document.querySelectorAll('body > header, body > main, body > footer, body > .skip');

  function setPageInert(state) {
    pageParts.forEach(function (el) { el.inert = state; });
  }

  function openLightbox(card) {
    const img = card.querySelector('img');
    const title = card.querySelector('.cert-card__name');
    const meta = card.querySelector('.cert-card__meta');

    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = title.textContent + (meta ? ', ' + meta.textContent : '');

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    lastFocused = document.activeElement;
    setPageInert(true);
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setPageInert(false);
    if (lastFocused) lastFocused.focus();
  }

  if (certGrid && lightbox && lbImg && lbCap && lbClose) {

    certGrid.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    certGrid.addEventListener('dragstart', function (e) { e.preventDefault(); });
    certGrid.addEventListener('selectstart', function (e) { e.preventDefault(); });

    certGrid.querySelectorAll('.cert-card').forEach(function (card) {
      const box = card.querySelector('.cert-card__img');
      const title = card.querySelector('.cert-card__name').textContent;

      box.setAttribute('role', 'button');
      box.setAttribute('tabindex', '0');
      box.setAttribute('aria-label', 'Открыть сертификат: ' + title);

      box.addEventListener('click', function () { openLightbox(card); });
      box.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(card);
        }
      });
    });

    lbClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.closest('.lightbox__fig') || e.target.classList.contains('lightbox__backdrop')) {
        closeLightbox();
      }
    });

    lightbox.addEventListener('contextmenu', function (e) { e.preventDefault(); });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') { closeLightbox(); return; }
      if (e.key !== 'Tab') return;

      // держим фокус внутри диалога
      const items = lightbox.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ---------------------- КОПИРОВАНИЕ ПОЧТЫ ---------------------- */

  const mailBtn = document.getElementById('mailBtn');
  const mailStatus = document.getElementById('mailStatus');

  function dictValue(key) {
    const dict = I18N[document.documentElement.lang] || I18N.ru;
    return dict[key] || '';
  }

  // запасной путь для http:// и старых браузеров: navigator.clipboard
  // доступен только в защищённом контексте (https или localhost)
  function legacyCopy(text) {
    // запоминаем фокус: select() уводит его на временное поле
    const prev = document.activeElement;
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    // 16px: при меньшем размере iOS зумит страницу на фокусе
    ta.style.cssText = 'position:fixed;top:-1000px;left:-1000px;opacity:0;font-size:16px';
    document.body.appendChild(ta);
    ta.select();

    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }

    ta.remove();
    if (prev && typeof prev.focus === 'function') {
      try { prev.focus({ preventScroll: true }); } catch (e) { prev.focus(); }
    }
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return legacyCopy(text); }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  if (mailBtn && mailStatus) {
    const mailLabel = mailBtn.querySelector('[data-i18n="cta.mail"]');
    let mailTimer = null;

    // aria-live не озвучивает повторно тот же текст: сначала очищаем,
    // затем ставим сообщение в следующем кадре
    function announce(text, kind) {
      mailStatus.dataset.kind = kind;
      mailStatus.classList.remove('is-shown');
      mailStatus.textContent = '';
      setTimeout(function () {
        mailStatus.textContent = text;
        mailStatus.classList.add('is-shown');
      }, 30);
    }

    mailBtn.addEventListener('click', function (e) {
      // не даём браузеру открыть mailto: кнопка копирует адрес
      e.preventDefault();

      copyText(mailBtn.getAttribute('data-email')).then(function (ok) {
        if (!ok) {
          // копирование запрещено: показываем подсказку
          announce(dictValue('cta.copyFail'), 'copyFail');
          return;
        }

        mailLabel.textContent = dictValue('cta.copied');
        mailBtn.classList.add('is-copied');
        announce(dictValue('cta.copied'), 'copied');

        clearTimeout(mailTimer);
        mailTimer = setTimeout(function () {
          mailLabel.textContent = dictValue('cta.mail');
          mailBtn.classList.remove('is-copied');
        }, 1800);
      });
    });
  }

  /* ---------------------- СТАРТОВЫЙ ЯЗЫК ---------------------- */

  // применяем после инициализации галереи, чтобы подписи сертификатов
  // сразу получили правильный язык
  applyLang(savedLang() === 'en' ? 'en' : 'ru');

  // синхронизируем theme-color с тем, что уже выставил скрипт в <head>
  setTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark', false);

})();
