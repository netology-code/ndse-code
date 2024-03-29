# Клиент для проверки домашних заданий

## Установка

В консоли запустить

```shell
npm install
```

В файле `.env` заменить значение `REACT_APP_URL` на адрес своего приложения

## Запуск

Для запуска в консоли выполнить

```shell
 npm start
```

## Проверка

Для того, чтобы проверить, что клиент запущен правильно можно использовать готовое тестовое приложение

Для его запуска нужно в консоли выполнить
```shell
npm run server
```

### Тестовые аккаунты:
* mail: 'bropet@mail.ru', pass: '123'
* mail: 'test@test.com', pass: 'test'

## Аннотация:
Приложение создано для хранения и скачивания книг. Часть функционала доступно только авторизованным.

Для начала работы, авторизуйтесь с одним из предложенных аккаунтов. Затем добавьте книгу (заполните поля). Далее ваша
книга отобразится на основном поле. Затем вы можете щёлкнуть по кнопке добавить или удалить из избранного, или нажать на
саму книгу и перейдёте на страницу книги с более подробной информацией и возможностью её скачать.
