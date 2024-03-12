# Messenger MyMsg

Учебный проект по модулю 1 курса "Фронтенд-разработчик Middle" от Yandex.Practicum


## 🔗 Внешние ссылки

- [Макет в Figma](https://www.figma.com/file/5RQeQrWhcDpCLSi6DSpQ9J/Chat_external_link-(Copy)?type=design&node-id=0%3A1&mode=design&t=ems4D8hs1Qu8YyJR-1)

- [Домен на Netlify](https://inspiring-rugelach-c77c8d.netlify.app)

## Экраны приложения

- Страница авторизации - главная
- Страница регистрации - открывается по клику на "Create profile"
- Страница чатов - открывается по клику на "Sign in/up"
- Профиль пользователя - открывается со страницы чатов по клику на иконку пользователя. Представленные инпуты находятся в состоянии disabled 
- Редактирование профиля - кнопка "Edit profile" позволяет получить доступ к полям ввода. Кнопки "Cancel" и  "Save changes" ведут блокируют инпуты и возвращают к состоянию просмотра профиля
- Страницы 404 и 500 - на главной странице (авторизации) в верхнем правом углу временно добавлены кнопки, ведущие к страницам соответствующих ошибок


## Для запуска проекта необходимо

Склонировать проект

```bash
  git clone https://github.com/DariaPleshkunova/middle.messenger.praktikum.yandex.git
```

Установить зависимости

```bash
  npm install
```

Запустить сервер

```bash
  npm run start
```


## Стэк

**Client:** Handlebars, SCSS, Vite

**Server:** Node v18.16.0, Express
