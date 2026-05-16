---
title: Проектирование асинхронного взаимодействия
sidebar_position: 10
description: Раздел с описанием асинхронного взаимодействия проекта.
---
Асинхронное взаимодействие - обмен между backend и сервисом push-уведомлений. 
Например, после создания задачи по дому backend должен инициировать отправку push-уведомления исполнителю при назначении задачи и/или наличии дедлайна.

Отправка push-уведомления не является частью критического пользовательского ответа. Для пользователя важно, чтобы задача или событие были быстро созданы и сохранены, а уведомление может быть доставлено отдельно, без удержания клиентского запроса открытым. Асинхронный подход позволяет не связывать время ответа backend с временем работы сервиса push-уведомлений.

Для этого взаимодействия целесообразно выбрать RabbitMQ: это решение подходит для сценариев, где обрабатывается относительно немного сообщений, сами сообщения небольшие и порядок их доставки не является критичным.

<details>
  <summary>Показать код</summary>

```YAML
asyncapi: "2.6.0"
id: "urn:household:backend-notification-events:1.0.0"

tags:
  - name: notifications
  - name: rabbitmq

info:
  title: Household Backend Notification Events API
  version: "1.0.0"
  description: >
    Асинхронный контракт обмена сообщениями между backend API приложения
    совместного ведения быта и сервисом push-уведомлений.

    Backend API публикует события в RabbitMQ после создания задач, назначения
    исполнителей, указания дедлайнов, создания событий календаря и наступления
    времени напоминаний. Сервис push-уведомлений получает эти сообщения и
    отправляет push-уведомления пользователям.

    Одно сообщение описывает одно push-уведомление для одного получателя.
    Если событие должно быть отправлено нескольким участникам, backend API
    публикует отдельное сообщение для каждого получателя.

defaultContentType: application/json

servers:
  rabbitmq:
    url: amqp://broker.household.local
    protocol: amqp
    protocolVersion: "0-9-1"
    description: RabbitMQ broker

channels:
  notifications.task.assigned:
    description: Уведомление о назначении задачи исполнителю
    bindings:
      amqp:
        is: routingKey
        exchange:
          name: notifications.exchange
          type: topic
          durable: true
          autoDelete: false
        queue:
          name: push.notifications.queue
          durable: true
          exclusive: false
          autoDelete: false
        bindingVersion: "0.3.0"
    publish:
      operationId: publishTaskAssignedNotification
      summary: Backend API публикует сообщение для отправки push-уведомления о назначении задачи
      message:
        $ref: "#/components/messages/TaskAssignedNotification"

  notifications.task.deadline:
    description: Уведомление о дедлайне задачи
    bindings:
      amqp:
        is: routingKey
        exchange:
          name: notifications.exchange
          type: topic
          durable: true
          autoDelete: false
        queue:
          name: push.notifications.queue
          durable: true
          exclusive: false
          autoDelete: false
        bindingVersion: "0.3.0"
    publish:
      operationId: publishTaskDeadlineNotification
      summary: Backend API публикует сообщение для отправки push-уведомления о дедлайне задачи
      message:
        $ref: "#/components/messages/TaskDeadlineNotification"

  notifications.event.created:
    description: Уведомление о создании события календаря
    bindings:
      amqp:
        is: routingKey
        exchange:
          name: notifications.exchange
          type: topic
          durable: true
          autoDelete: false
        queue:
          name: push.notifications.queue
          durable: true
          exclusive: false
          autoDelete: false
        bindingVersion: "0.3.0"
    publish:
      operationId: publishEventCreatedNotification
      summary: Backend API публикует сообщение для отправки push-уведомления о создании события
      message:
        $ref: "#/components/messages/EventCreatedNotification"

  notifications.event.reminder:
    description: >
      Напоминание о событии календаря. Сообщение публикуется backend-планировщиком
      в момент наступления времени напоминания.
    bindings:
      amqp:
        is: routingKey
        exchange:
          name: notifications.exchange
          type: topic
          durable: true
          autoDelete: false
        queue:
          name: push.notifications.queue
          durable: true
          exclusive: false
          autoDelete: false
        bindingVersion: "0.3.0"
    publish:
      operationId: publishEventReminderNotification
      summary: Backend API публикует сообщение для отправки push-напоминания о событии
      message:
        $ref: "#/components/messages/EventReminderNotification"

components:
  messages:
    TaskAssignedNotification:
      messageId: taskAssignedNotification
      name: TaskAssignedNotification
      title: Уведомление о назначении задачи
      headers:
        $ref: "#/components/schemas/MessageHeaders"
      payload:
        $ref: "#/components/schemas/TaskAssignedNotificationPayload"
      examples:
        - headers:
            messageId: "f4c2d7a1-31c8-4b16-8f77-ef193c51e6fb"
            producedAt: "2026-04-22T10:15:00Z"
            idempotencyKey: "9db5e11e-0d52-4320-8ca2-f7f30915db5c"
          payload:
            notificationId: "3c91dce9-5d18-4f52-9aa8-1e7f0f1d1d8e"
            recipientUserId: "0e13492e-7307-4b14-ab41-5b763d5a26c1"
            spaceId: "4e8ec6f5-7c1c-4a34-a0e5-c12dbf7c9115"
            taskId: "2c34d421-1f27-430d-b930-47d2f7b0513d"
            title: "Новая задача"
            body: "Вам назначена задача «Помыть пол»."
            deeplink: "household://spaces/4e8ec6f5-7c1c-4a34-a0e5-c12dbf7c9115/tasks/2c34d421-1f27-430d-b930-47d2f7b0513d"
            createdAt: "2026-04-22T10:15:00Z"

    TaskDeadlineNotification:
      messageId: taskDeadlineNotification
      name: TaskDeadlineNotification
      title: Уведомление о дедлайне задачи
      headers:
        $ref: "#/components/schemas/MessageHeaders"
      payload:
        $ref: "#/components/schemas/TaskDeadlineNotificationPayload"
      examples:
        - headers:
            messageId: "2570e525-7562-4a1d-93e0-72f90c41cc2d"
            producedAt: "2026-04-22T11:00:00Z"
            idempotencyKey: "c018ab37-2fe0-45c6-8f85-42515773b9ef"
          payload:
            notificationId: "7c2ad1a8-49fc-4f0f-bcab-0c30fc44f923"
            recipientUserId: "0e13492e-7307-4b14-ab41-5b763d5a26c1"
            spaceId: "4e8ec6f5-7c1c-4a34-a0e5-c12dbf7c9115"
            taskId: "2c34d421-1f27-430d-b930-47d2f7b0513d"
            deadline: "2026-04-23T18:00:00Z"
            title: "Срок по задаче"
            body: "Задачу «Помыть пол» нужно выполнить до 23.04.2026 18:00."
            deeplink: "household://spaces/4e8ec6f5-7c1c-4a34-a0e5-c12dbf7c9115/tasks/2c34d421-1f27-430d-b930-47d2f7b0513d"
            createdAt: "2026-04-22T11:00:00Z"

    EventCreatedNotification:
      messageId: eventCreatedNotification
      name: EventCreatedNotification
      title: Уведомление о создании события календаря
      headers:
        $ref: "#/components/schemas/MessageHeaders"
      payload:
        $ref: "#/components/schemas/EventCreatedNotificationPayload"
      examples:
        - headers:
            messageId: "0dc57d3d-c1c8-437f-9d8c-e7d26a92503f"
            producedAt: "2026-04-22T12:00:00Z"
            idempotencyKey: "d0d60a0d-6d6d-437d-9632-64d17b652d18"
          payload:
            notificationId: "f52c4d06-ff97-45f2-bdc8-8e7f8cd8f2c4"
            recipientUserId: "8e1c5759-d59d-4511-8f73-6af1a7e88d70"
            spaceId: "4e8ec6f5-7c1c-4a34-a0e5-c12dbf7c9115"
            eventId: "1c2e52dd-f39d-4314-bf58-d7f1c98b8bf7"
            startsAt: "2026-04-25T10:00:00Z"
            title: "Новое событие"
            body: "В календаре создано событие «Генеральная уборка»."
            deeplink: "household://spaces/4e8ec6f5-7c1c-4a34-a0e5-c12dbf7c9115/calendar/1c2e52dd-f39d-4314-bf58-d7f1c98b8bf7"
            createdAt: "2026-04-22T12:00:00Z"

    EventReminderNotification:
      messageId: eventReminderNotification
      name: EventReminderNotification
      title: Напоминание о событии календаря
      headers:
        $ref: "#/components/schemas/MessageHeaders"
      payload:
        $ref: "#/components/schemas/EventReminderNotificationPayload"
      examples:
        - headers:
            messageId: "73b4a23f-d0c1-4be8-b4e2-ef43ad36d099"
            producedAt: "2026-04-25T09:00:00Z"
            idempotencyKey: "e33fb1d9-914c-460a-ab83-c7077dde05f1"
          payload:
            notificationId: "3023bd90-4d41-44b2-b0ea-5a21df9f9cae"
            recipientUserId: "8e1c5759-d59d-4511-8f73-6af1a7e88d70"
            spaceId: "4e8ec6f5-7c1c-4a34-a0e5-c12dbf7c9115"
            eventId: "1c2e52dd-f39d-4314-bf58-d7f1c98b8bf7"
            startsAt: "2026-04-25T10:00:00Z"
            title: "Напоминание о событии"
            body: "Событие «Генеральная уборка» начнётся через 1 час."
            deeplink: "household://spaces/4e8ec6f5-7c1c-4a34-a0e5-c12dbf7c9115/calendar/1c2e52dd-f39d-4314-bf58-d7f1c98b8bf7"
            createdAt: "2026-04-25T09:00:00Z"

  schemas:
    MessageHeaders:
      type: object
      additionalProperties: false
      required:
        - messageId
        - producedAt
        - idempotencyKey
      properties:
        messageId:
          type: string
          format: uuid
          description: Уникальный идентификатор экземпляра сообщения
        producedAt:
          type: string
          format: date-time
          description: Время публикации сообщения
        idempotencyKey:
          type: string
          format: uuid
          description: Ключ идемпотентности для защиты от дублей

    BaseNotificationPayload:
      type: object
      required:
        - notificationId
        - recipientUserId
        - spaceId
        - title
        - body
        - deeplink
        - createdAt
      properties:
        notificationId:
          type: string
          format: uuid
        recipientUserId:
          type: string
          format: uuid
        spaceId:
          type: string
          format: uuid
        title:
          type: string
          maxLength: 120
        body:
          type: string
          maxLength: 500
        deeplink:
          type: string
        createdAt:
          type: string
          format: date-time

    TaskAssignedNotificationPayload:
      allOf:
        - $ref: "#/components/schemas/BaseNotificationPayload"
        - type: object
          required:
            - taskId
          properties:
            taskId:
              type: string
              format: uuid

    TaskDeadlineNotificationPayload:
      allOf:
        - $ref: "#/components/schemas/BaseNotificationPayload"
        - type: object
          required:
            - taskId
            - deadline
          properties:
            taskId:
              type: string
              format: uuid
            deadline:
              type: string
              format: date-time

    EventCreatedNotificationPayload:
      allOf:
        - $ref: "#/components/schemas/BaseNotificationPayload"
        - type: object
          required:
            - eventId
            - startsAt
          properties:
            eventId:
              type: string
              format: uuid
            startsAt:
              type: string
              format: date-time

    EventReminderNotificationPayload:
      allOf:
        - $ref: "#/components/schemas/BaseNotificationPayload"
        - type: object
          required:
            - eventId
            - startsAt
          properties:
            eventId:
              type: string
              format: uuid
            startsAt:
              type: string
              format: date-time

```
</details>
