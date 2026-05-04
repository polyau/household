---
title: BPMN - xml (FR-05/FR-06)
sidebar_position: 1
---
```XML
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:storm="http://storm.bpmn2.ru/ns" id="Definitions_HouseholdTaskProcess" targetNamespace="http://example.com/household/tasks">
  <bpmn:collaboration id="Collaboration_HouseholdTask">
    <bpmn:participant id="Participant_Main" name="Приложение совместного ведения быта" processRef="Process_HouseholdTask" />
    <bpmn:participant id="Participant_Push" name="Сервис push-уведомлений" />
    <bpmn:messageFlow id="MessageFlow_SendPush" name="Запрос на отправку push" sourceRef="Task_SendPush" targetRef="Participant_Push" />
    <bpmn:messageFlow id="Flow_0k88ipm" name="Запрос на отправку push" sourceRef="Activity_1bgwg9u" targetRef="Participant_Push" />
  </bpmn:collaboration>
  <bpmn:process id="Process_HouseholdTask" name="Создание и выполнение задачи по дому" isExecutable="true">
    <bpmn:laneSet id="LaneSet_1">
      <bpmn:lane id="Lane_User" name="Участник пространства" storm:FontColor="#000000">
        <bpmn:flowNodeRef>Gateway_1508ree</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1fnx52r</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_0z298eq</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_1b636be</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1i2t2h0</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_0dcd6hd</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_04j6j9k</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_0m9xica</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_0clwqeq</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_1snsvto</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_FillTaskForm</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>StartEvent_CreateTask</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_1kv0z19</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_MarkCompleted</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_System" name="Система" storm:FontColor="#000000">
        <bpmn:flowNodeRef>Task_ValidateTask</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_DataValid</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1gqyb7r</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_158z3u5</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_0r7u959</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_ShowValidationError</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_CreateTask</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_AddToCalendar</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_AddToCalendar</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_SendPushRequired</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_SendPush</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>EndEvent_Success</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_1ay59r3</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1bgwg9u</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_CheckPermissionDMN</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_LoadPermissionData</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_1s5xpvo</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_0uec7z1</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_1h3tdhj</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_CreateNextRepeat</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_Repeating</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_SetCompleted</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Gateway_PermissionGranted</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>EndEvent_NoChange</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_ShowNoRights</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_0u7rbrc</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_18sr6qm</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    <bpmn:sequenceFlow id="Flow_0z74quy" sourceRef="Gateway_1kv0z19" targetRef="Task_MarkCompleted" />
    <bpmn:sequenceFlow id="Flow_10eazu4" sourceRef="Activity_0u7rbrc" targetRef="Gateway_1kv0z19" />
    <bpmn:sequenceFlow id="Flow_0uvipyy" sourceRef="Event_18sr6qm" targetRef="Activity_0u7rbrc" />
    <bpmn:sequenceFlow id="Flow_19" sourceRef="Task_ShowNoRights" targetRef="EndEvent_NoChange" />
    <bpmn:sequenceFlow id="Flow_18" name="Нет" sourceRef="Gateway_PermissionGranted" targetRef="Task_ShowNoRights">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${!canComplete}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_17" name="Да" sourceRef="Gateway_PermissionGranted" targetRef="Task_SetCompleted">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${canComplete}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_20" sourceRef="Task_SetCompleted" targetRef="Gateway_Repeating" />
    <bpmn:sequenceFlow id="Flow_21" name="Да" sourceRef="Gateway_Repeating" targetRef="Task_CreateNextRepeat">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${isRepeating}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_1v2xrz4" sourceRef="Task_CreateNextRepeat" targetRef="Gateway_1h3tdhj" />
    <bpmn:sequenceFlow id="Flow_14" sourceRef="Task_MarkCompleted" targetRef="Task_LoadPermissionData" />
    <bpmn:sequenceFlow id="Flow_16" sourceRef="Task_CheckPermissionDMN" targetRef="Gateway_PermissionGranted" />
    <bpmn:sequenceFlow id="Flow_1aotrl3" sourceRef="Task_LoadPermissionData" targetRef="Task_CheckPermissionDMN" />
    <bpmn:sequenceFlow id="Flow_1i2lmps" sourceRef="Activity_1bgwg9u" targetRef="Gateway_0uec7z1" />
    <bpmn:sequenceFlow id="Flow_1uzgqwx" name="Нет" sourceRef="Gateway_1ay59r3" targetRef="Gateway_1kv0z19" />
    <bpmn:sequenceFlow id="Flow_0v6hnu9" name="Да" sourceRef="Gateway_1ay59r3" targetRef="Event_18sr6qm" />
    <bpmn:sequenceFlow id="Flow_1joaaz3" sourceRef="Gateway_0uec7z1" targetRef="Gateway_1ay59r3" />
    <bpmn:sequenceFlow id="Flow_22" name="Нет" sourceRef="Gateway_Repeating" targetRef="EndEvent_Success">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${!isRepeating}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_0voy9df" sourceRef="Task_SendPush" targetRef="Gateway_0uec7z1" />
    <bpmn:sequenceFlow id="Flow_1ouq3r4" name="Нет" sourceRef="Gateway_SendPushRequired" targetRef="Activity_1bgwg9u" />
    <bpmn:sequenceFlow id="Flow_1xyd97n" name="Да" sourceRef="Gateway_SendPushRequired" targetRef="Task_SendPush" />
    <bpmn:sequenceFlow id="Flow_1fovkoj" sourceRef="Gateway_1s5xpvo" targetRef="Gateway_SendPushRequired" />
    <bpmn:sequenceFlow id="Flow_10" sourceRef="Task_AddToCalendar" targetRef="Gateway_1s5xpvo" />
    <bpmn:sequenceFlow id="Flow_9" name="Нет" sourceRef="Gateway_AddToCalendar" targetRef="Gateway_1s5xpvo">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${!addToCalendar}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_8" name="Да" sourceRef="Gateway_AddToCalendar" targetRef="Task_AddToCalendar">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${addToCalendar}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_7" sourceRef="Task_CreateTask" targetRef="Gateway_AddToCalendar" />
    <bpmn:sequenceFlow id="Flow_0nsfno9" sourceRef="Gateway_1h3tdhj" targetRef="Task_CreateTask" />
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_CreateTask" targetRef="Task_FillTaskForm" />
    <bpmn:sequenceFlow id="Flow_07w008m" sourceRef="Task_FillTaskForm" targetRef="Gateway_1snsvto" />
    <bpmn:sequenceFlow id="Flow_1n5j0dp" sourceRef="Activity_0clwqeq" targetRef="Gateway_0m9xica" />
    <bpmn:sequenceFlow id="Flow_0hthyma" name="Да" sourceRef="Gateway_0r7u959" targetRef="Task_ShowValidationError" />
    <bpmn:sequenceFlow id="Flow_1o5x3th" sourceRef="Activity_158z3u5" targetRef="Gateway_0r7u959" />
    <bpmn:sequenceFlow id="Flow_1j25grt" name="Да" sourceRef="Gateway_0m9xica" targetRef="Activity_158z3u5" />
    <bpmn:sequenceFlow id="Flow_0c8njui" sourceRef="Activity_04j6j9k" targetRef="Activity_0dcd6hd" />
    <bpmn:sequenceFlow id="Flow_01308tz" sourceRef="Activity_0dcd6hd" targetRef="Activity_1i2t2h0" />
    <bpmn:sequenceFlow id="Flow_1lzuzen" sourceRef="Gateway_1b636be" targetRef="Activity_04j6j9k" />
    <bpmn:sequenceFlow id="Flow_1dn0r2d" name="Нет" sourceRef="Gateway_0m9xica" targetRef="Gateway_1b636be" />
    <bpmn:sequenceFlow id="Flow_0435itd" name="Нет" sourceRef="Gateway_0r7u959" targetRef="Gateway_1b636be" />
    <bpmn:sequenceFlow id="Flow_120zpt3" sourceRef="Activity_1gqyb7r" targetRef="Gateway_1snsvto" />
    <bpmn:sequenceFlow id="Flow_5" name="Да" sourceRef="Gateway_DataValid" targetRef="Gateway_1h3tdhj">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${dataValid}</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_10qcrro" name="Нет" sourceRef="Gateway_DataValid" targetRef="Activity_1gqyb7r" />
    <bpmn:sequenceFlow id="Flow_10ld94v" sourceRef="Task_ValidateTask" targetRef="Gateway_DataValid" />
    <bpmn:sequenceFlow id="Flow_1f1gl5v" sourceRef="Activity_1i2t2h0" targetRef="Task_ValidateTask" />
    <bpmn:sequenceFlow id="Flow_1w23qs8" sourceRef="Gateway_1snsvto" targetRef="Activity_0z298eq" />
    <bpmn:sequenceFlow id="Flow_1jvobrw" sourceRef="Activity_0z298eq" targetRef="Activity_1fnx52r" />
    <bpmn:sequenceFlow id="Flow_073mjlj" sourceRef="Gateway_1508ree" targetRef="Activity_0clwqeq" />
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Task_ShowValidationError" targetRef="Gateway_1508ree" />
    <bpmn:sequenceFlow id="Flow_138uwxb" sourceRef="Activity_1fnx52r" targetRef="Gateway_1508ree" />
    <bpmn:intermediateCatchEvent id="Event_18sr6qm" name="Дождаться срока напоминания о дедлайне" storm:LabelWidth="67" storm:LabelHeight="36">
      <bpmn:incoming>Flow_0v6hnu9</bpmn:incoming>
      <bpmn:outgoing>Flow_0uvipyy</bpmn:outgoing>
      <bpmn:timerEventDefinition id="TimerEventDefinition_18zs66f" />
    </bpmn:intermediateCatchEvent>
    <bpmn:userTask id="Task_MarkCompleted" name="Нажать &#34;Отметить выполненной&#34;">
      <bpmn:incoming>Flow_0z74quy</bpmn:incoming>
      <bpmn:outgoing>Flow_14</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_1kv0z19">
      <bpmn:incoming>Flow_10eazu4</bpmn:incoming>
      <bpmn:incoming>Flow_1uzgqwx</bpmn:incoming>
      <bpmn:outgoing>Flow_0z74quy</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Activity_0u7rbrc" name="Отправить push о дедлайне исполнителям">
      <bpmn:incoming>Flow_0uvipyy</bpmn:incoming>
      <bpmn:outgoing>Flow_10eazu4</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:serviceTask id="Task_ShowNoRights" name="Показать сообщение об отсутствии прав">
      <bpmn:incoming>Flow_18</bpmn:incoming>
      <bpmn:outgoing>Flow_19</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:endEvent id="EndEvent_NoChange" name="Статус не изменён">
      <bpmn:incoming>Flow_19</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:exclusiveGateway id="Gateway_PermissionGranted" name="Разрешено?">
      <bpmn:incoming>Flow_16</bpmn:incoming>
      <bpmn:outgoing>Flow_18</bpmn:outgoing>
      <bpmn:outgoing>Flow_17</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Task_SetCompleted" name="Перевести задачу в статус &#34;выполнено&#34;">
      <bpmn:incoming>Flow_17</bpmn:incoming>
      <bpmn:outgoing>Flow_20</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="Gateway_Repeating" name="Задача повторяющаяся?">
      <bpmn:incoming>Flow_20</bpmn:incoming>
      <bpmn:outgoing>Flow_21</bpmn:outgoing>
      <bpmn:outgoing>Flow_22</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Task_CreateNextRepeat" name="Создать следующее повторение задачи">
      <bpmn:incoming>Flow_21</bpmn:incoming>
      <bpmn:outgoing>Flow_1v2xrz4</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="Gateway_1h3tdhj">
      <bpmn:incoming>Flow_5</bpmn:incoming>
      <bpmn:incoming>Flow_1v2xrz4</bpmn:incoming>
      <bpmn:outgoing>Flow_0nsfno9</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:exclusiveGateway id="Gateway_0uec7z1">
      <bpmn:incoming>Flow_0voy9df</bpmn:incoming>
      <bpmn:incoming>Flow_1i2lmps</bpmn:incoming>
      <bpmn:outgoing>Flow_1joaaz3</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:exclusiveGateway id="Gateway_1s5xpvo">
      <bpmn:incoming>Flow_9</bpmn:incoming>
      <bpmn:incoming>Flow_10</bpmn:incoming>
      <bpmn:outgoing>Flow_1fovkoj</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Task_LoadPermissionData" name="Получить роль пользователя и данные задачи">
      <bpmn:incoming>Flow_14</bpmn:incoming>
      <bpmn:outgoing>Flow_1aotrl3</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:businessRuleTask id="Task_CheckPermissionDMN" name="Проверить право на изменение статуса (DMN)" camunda:decisionRef="task_completion_permission">
      <bpmn:incoming>Flow_1aotrl3</bpmn:incoming>
      <bpmn:outgoing>Flow_16</bpmn:outgoing>
    </bpmn:businessRuleTask>
    <bpmn:serviceTask id="Activity_1bgwg9u" name="Отправить&#10;push о назначении всем пользователям пространства">
      <bpmn:incoming>Flow_1ouq3r4</bpmn:incoming>
      <bpmn:outgoing>Flow_1i2lmps</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="Gateway_1ay59r3" name="Пользователь назначил дедлайн?">
      <bpmn:incoming>Flow_1joaaz3</bpmn:incoming>
      <bpmn:outgoing>Flow_0v6hnu9</bpmn:outgoing>
      <bpmn:outgoing>Flow_1uzgqwx</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:endEvent id="EndEvent_Success" name="Задача выполнена">
      <bpmn:incoming>Flow_22</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:serviceTask id="Task_SendPush" name="Отправить&#10;push о назначении исполнителю">
      <bpmn:incoming>Flow_1xyd97n</bpmn:incoming>
      <bpmn:outgoing>Flow_0voy9df</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="Gateway_SendPushRequired" name="Пользователь назначил исполнителя?">
      <bpmn:incoming>Flow_1fovkoj</bpmn:incoming>
      <bpmn:outgoing>Flow_1xyd97n</bpmn:outgoing>
      <bpmn:outgoing>Flow_1ouq3r4</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Task_AddToCalendar" name="Добавить задачу в календарь пространства">
      <bpmn:incoming>Flow_8</bpmn:incoming>
      <bpmn:outgoing>Flow_10</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="Gateway_AddToCalendar" name="Пользователь добавил задачу в календарь?">
      <bpmn:incoming>Flow_7</bpmn:incoming>
      <bpmn:outgoing>Flow_8</bpmn:outgoing>
      <bpmn:outgoing>Flow_9</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Task_CreateTask" name="Создать задачу со статусом &#34;активна&#34;">
      <bpmn:incoming>Flow_0nsfno9</bpmn:incoming>
      <bpmn:outgoing>Flow_7</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:startEvent id="StartEvent_CreateTask" name="Пользователь решил создать задачу">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="Task_FillTaskForm" name="Нажать&#10;&#34;Создать задачу&#34; в разделе &#34;Задачи&#34; пространства">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_07w008m</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_1snsvto">
      <bpmn:incoming>Flow_07w008m</bpmn:incoming>
      <bpmn:incoming>Flow_120zpt3</bpmn:incoming>
      <bpmn:outgoing>Flow_1w23qs8</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:userTask id="Activity_0clwqeq" name="Указать дедлайн (опционально)">
      <bpmn:incoming>Flow_073mjlj</bpmn:incoming>
      <bpmn:outgoing>Flow_1n5j0dp</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_0m9xica" name="Дедлайн задан?">
      <bpmn:incoming>Flow_1n5j0dp</bpmn:incoming>
      <bpmn:outgoing>Flow_1j25grt</bpmn:outgoing>
      <bpmn:outgoing>Flow_1dn0r2d</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Task_ShowValidationError" name="Отметить поле ввода дедлайна красным цветом">
      <bpmn:incoming>Flow_0hthyma</bpmn:incoming>
      <bpmn:outgoing>Flow_4</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="Gateway_0r7u959" name="Дедлайн в прошлом?">
      <bpmn:incoming>Flow_1o5x3th</bpmn:incoming>
      <bpmn:outgoing>Flow_0435itd</bpmn:outgoing>
      <bpmn:outgoing>Flow_0hthyma</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Activity_158z3u5" name="Проверить дедлайн">
      <bpmn:incoming>Flow_1j25grt</bpmn:incoming>
      <bpmn:outgoing>Flow_1o5x3th</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:userTask id="Activity_04j6j9k" name="Указать повторяемость (опционально)">
      <bpmn:incoming>Flow_1lzuzen</bpmn:incoming>
      <bpmn:outgoing>Flow_0c8njui</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Activity_0dcd6hd" name="Добавить в календарь (опционально)">
      <bpmn:incoming>Flow_0c8njui</bpmn:incoming>
      <bpmn:outgoing>Flow_01308tz</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Activity_1i2t2h0" name="Сохранить задачу">
      <bpmn:incoming>Flow_01308tz</bpmn:incoming>
      <bpmn:outgoing>Flow_1f1gl5v</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_1b636be">
      <bpmn:incoming>Flow_1dn0r2d</bpmn:incoming>
      <bpmn:incoming>Flow_0435itd</bpmn:incoming>
      <bpmn:outgoing>Flow_1lzuzen</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Activity_1gqyb7r" name="Отобразить сообщение об ошибке и попросить задать название задачи">
      <bpmn:incoming>Flow_10qcrro</bpmn:incoming>
      <bpmn:outgoing>Flow_120zpt3</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:exclusiveGateway id="Gateway_DataValid" name="Название задано?">
      <bpmn:incoming>Flow_10ld94v</bpmn:incoming>
      <bpmn:outgoing>Flow_5</bpmn:outgoing>
      <bpmn:outgoing>Flow_10qcrro</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:serviceTask id="Task_ValidateTask" name="Проверить название">
      <bpmn:incoming>Flow_1f1gl5v</bpmn:incoming>
      <bpmn:outgoing>Flow_10ld94v</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:userTask id="Activity_0z298eq" name="Задать название задачи">
      <bpmn:incoming>Flow_1w23qs8</bpmn:incoming>
      <bpmn:outgoing>Flow_1jvobrw</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Activity_1fnx52r" name="Выбрать исполнителя">
      <bpmn:incoming>Flow_1jvobrw</bpmn:incoming>
      <bpmn:outgoing>Flow_138uwxb</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:exclusiveGateway id="Gateway_1508ree">
      <bpmn:incoming>Flow_138uwxb</bpmn:incoming>
      <bpmn:incoming>Flow_4</bpmn:incoming>
      <bpmn:outgoing>Flow_073mjlj</bpmn:outgoing>
    </bpmn:exclusiveGateway>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_HouseholdTask">
    <bpmndi:BPMNPlane id="BPMNPlane_HouseholdTask" bpmnElement="Collaboration_HouseholdTask">
      <bpmndi:BPMNShape id="Participant_Main_di" bpmnElement="Participant_Main" isHorizontal="true">
        <dc:Bounds x="-70" y="120" width="3760" height="508" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_System_di" bpmnElement="Lane_System" isHorizontal="true">
        <dc:Bounds x="-40" y="330" width="3730" height="298" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_User_di" bpmnElement="Lane_User" isHorizontal="true">
        <dc:Bounds x="-40" y="120" width="3730" height="210" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1508ree_di" bpmnElement="Gateway_1508ree" isMarkerVisible="true">
        <dc:Bounds x="605" y="168" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0ir9rt4" bpmnElement="Activity_1fnx52r">
        <dc:Bounds x="462" y="150" width="115" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_1lf2zy1" bpmnElement="Activity_0z298eq">
        <dc:Bounds x="318" y="150" width="118" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_ValidateTask_di" bpmnElement="Task_ValidateTask">
        <dc:Bounds x="1441" y="395" width="118" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_DataValid_di" bpmnElement="Gateway_DataValid" isMarkerVisible="true">
        <dc:Bounds x="1575" y="413" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1575" y="376" width="50" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0kvyr0g" bpmnElement="Activity_1gqyb7r">
        <dc:Bounds x="1401" y="520" width="118" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1b636be_di" bpmnElement="Gateway_1b636be" isMarkerVisible="true">
        <dc:Bounds x="925" y="168" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_1qksgrg" bpmnElement="Activity_1i2t2h0">
        <dc:Bounds x="1288" y="150" width="118" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_107po14" bpmnElement="Activity_0dcd6hd">
        <dc:Bounds x="1148" y="150" width="118" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_02d89wl" bpmnElement="Activity_04j6j9k">
        <dc:Bounds x="1012" y="150" width="115" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0lftysr_di" bpmnElement="Activity_158z3u5">
        <dc:Bounds x="880" y="395" width="140" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0r7u959_di" bpmnElement="Gateway_0r7u959" isMarkerVisible="true">
        <dc:Bounds x="1045" y="413" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1043" y="470" width="54" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_ShowValidationError_di" bpmnElement="Task_ShowValidationError">
        <dc:Bounds x="1120" y="395" width="120" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0m9xica_di" bpmnElement="Gateway_0m9xica" isMarkerVisible="true">
        <dc:Bounds x="835" y="168" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="818" y="144" width="84" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_08716be" bpmnElement="Activity_0clwqeq">
        <dc:Bounds x="675" y="150" width="125" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1snsvto_di" bpmnElement="Gateway_1snsvto" isMarkerVisible="true">
        <dc:Bounds x="245" y="168" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_FillTaskForm_di" bpmnElement="Task_FillTaskForm">
        <dc:Bounds x="90" y="150" width="132" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="StartEvent_CreateTask_di" bpmnElement="StartEvent_CreateTask">
        <dc:Bounds x="22" y="175" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2" y="220" width="77" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_CreateTask_di" bpmnElement="Task_CreateTask">
        <dc:Bounds x="1749" y="395" width="122" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_AddToCalendar_di" bpmnElement="Gateway_AddToCalendar" isMarkerVisible="true">
        <dc:Bounds x="1895" y="413" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1880" y="369" width="81" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_AddToCalendar_di" bpmnElement="Task_AddToCalendar">
        <dc:Bounds x="1972" y="395" width="115" height="86" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_SendPushRequired_di" bpmnElement="Gateway_SendPushRequired" isMarkerVisible="true">
        <dc:Bounds x="2195" y="413" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2184" y="369" width="72" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_SendPush_di" bpmnElement="Task_SendPush">
        <dc:Bounds x="2295" y="395" width="130" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_Success_di" bpmnElement="EndEvent_Success">
        <dc:Bounds x="3522" y="545" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="3512" y="586" width="57" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0ij5zrs" bpmnElement="Gateway_1ay59r3" isMarkerVisible="true">
        <dc:Bounds x="2555" y="413" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2544" y="473" width="72" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0s7cpmu" bpmnElement="Activity_1bgwg9u">
        <dc:Bounds x="2414" y="497" width="132" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_CheckPermissionDMN_di" bpmnElement="Task_CheckPermissionDMN">
        <dc:Bounds x="3040" y="395" width="120" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_LoadPermissionData_di" bpmnElement="Task_LoadPermissionData">
        <dc:Bounds x="2904" y="395" width="112" height="86" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_1gl6o0w" bpmnElement="Gateway_1s5xpvo" isMarkerVisible="true">
        <dc:Bounds x="2115" y="413" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1864" y="321" width="72" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0uec7z1_di" bpmnElement="Gateway_0uec7z1" isMarkerVisible="true">
        <dc:Bounds x="2465" y="413" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1h3tdhj_di" bpmnElement="Gateway_1h3tdhj" isMarkerVisible="true">
        <dc:Bounds x="1665" y="413" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_CreateNextRepeat_di" bpmnElement="Task_CreateNextRepeat">
        <dc:Bounds x="3535" y="395" width="130" height="86" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Repeating_di" bpmnElement="Gateway_Repeating" isMarkerVisible="true">
        <dc:Bounds x="3445" y="413" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="3426" y="386" width="88" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_SetCompleted_di" bpmnElement="Task_SetCompleted">
        <dc:Bounds x="3265" y="395" width="150" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_PermissionGranted_di" bpmnElement="Gateway_PermissionGranted" isMarkerVisible="true">
        <dc:Bounds x="3185" y="413" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="3178" y="393" width="64" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_NoChange_di" bpmnElement="EndEvent_NoChange">
        <dc:Bounds x="3402" y="545" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="3395" y="586" width="51" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_ShowNoRights_di" bpmnElement="Task_ShowNoRights">
        <dc:Bounds x="3230" y="520" width="140" height="86" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_00sh625" bpmnElement="Activity_0u7rbrc">
        <dc:Bounds x="2732" y="395" width="115" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1kv0z19_di" bpmnElement="Gateway_1kv0z19" isMarkerVisible="true">
        <dc:Bounds x="2675" y="218" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_MarkCompleted_di" bpmnElement="Task_MarkCompleted">
        <dc:Bounds x="2746" y="200" width="127" height="86" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_01qjzdj_di" bpmnElement="Event_18sr6qm">
        <dc:Bounds x="2662" y="420" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2638" y="463" width="88" height="40" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_138uwxb_di" bpmnElement="Flow_138uwxb">
        <di:waypoint x="577" y="193" />
        <di:waypoint x="605" y="193" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1jvobrw_di" bpmnElement="Flow_1jvobrw">
        <di:waypoint x="436" y="193" />
        <di:waypoint x="462" y="193" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_07w008m_di" bpmnElement="Flow_07w008m">
        <di:waypoint x="222" y="193" />
        <di:waypoint x="245" y="193" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10ld94v_di" bpmnElement="Flow_10ld94v">
        <di:waypoint x="1559" y="438" />
        <di:waypoint x="1575" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_120zpt3_di" bpmnElement="Flow_120zpt3">
        <di:waypoint x="1401" y="563" />
        <di:waypoint x="270" y="563" />
        <di:waypoint x="270" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10qcrro_di" bpmnElement="Flow_10qcrro">
        <di:waypoint x="1600" y="463" />
        <di:waypoint x="1600" y="563" />
        <di:waypoint x="1520" y="563" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1610" y="472" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
        <di:waypoint x="1625" y="438" />
        <di:waypoint x="1665" y="438" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1640" y="413" width="14" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1f1gl5v_di" bpmnElement="Flow_1f1gl5v">
        <di:waypoint x="1406" y="193" />
        <di:waypoint x="1424" y="193" />
        <di:waypoint x="1424" y="438" />
        <di:waypoint x="1441" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_01308tz_di" bpmnElement="Flow_01308tz">
        <di:waypoint x="1266" y="193" />
        <di:waypoint x="1288" y="193" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0c8njui_di" bpmnElement="Flow_0c8njui">
        <di:waypoint x="1127" y="193" />
        <di:waypoint x="1148" y="193" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1lzuzen_di" bpmnElement="Flow_1lzuzen">
        <di:waypoint x="975" y="193" />
        <di:waypoint x="1012" y="193" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0435itd_di" bpmnElement="Flow_0435itd">
        <di:waypoint x="1070" y="413" />
        <di:waypoint x="1070" y="300" />
        <di:waypoint x="950" y="300" />
        <di:waypoint x="950" y="218" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1040" y="393" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1o5x3th_di" bpmnElement="Flow_1o5x3th">
        <di:waypoint x="1020" y="438" />
        <di:waypoint x="1045" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <di:waypoint x="1180" y="481" />
        <di:waypoint x="1180" y="510" />
        <di:waypoint x="630" y="510" />
        <di:waypoint x="630" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0hthyma_di" bpmnElement="Flow_0hthyma">
        <di:waypoint x="1095" y="438" />
        <di:waypoint x="1120" y="438" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1093" y="413" width="14" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1dn0r2d_di" bpmnElement="Flow_1dn0r2d">
        <di:waypoint x="885" y="193" />
        <di:waypoint x="925" y="193" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="890" y="203" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1j25grt_di" bpmnElement="Flow_1j25grt">
        <di:waypoint x="860" y="218" />
        <di:waypoint x="860" y="438" />
        <di:waypoint x="880" y="438" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="843" y="224" width="14" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1n5j0dp_di" bpmnElement="Flow_1n5j0dp">
        <di:waypoint x="800" y="193" />
        <di:waypoint x="835" y="193" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_073mjlj_di" bpmnElement="Flow_073mjlj">
        <di:waypoint x="655" y="193" />
        <di:waypoint x="675" y="193" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="58" y="193" />
        <di:waypoint x="90" y="193" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1w23qs8_di" bpmnElement="Flow_1w23qs8">
        <di:waypoint x="295" y="193" />
        <di:waypoint x="318" y="193" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1v2xrz4_di" bpmnElement="Flow_1v2xrz4">
        <di:waypoint x="3600" y="395" />
        <di:waypoint x="3600" y="150" />
        <di:waypoint x="1690" y="150" />
        <di:waypoint x="1690" y="413" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_7_di" bpmnElement="Flow_7">
        <di:waypoint x="1871" y="438" />
        <di:waypoint x="1895" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_8_di" bpmnElement="Flow_8">
        <di:waypoint x="1945" y="438" />
        <di:waypoint x="1972" y="438" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1952" y="443" width="14" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_9_di" bpmnElement="Flow_9">
        <di:waypoint x="1920" y="463" />
        <di:waypoint x="1920" y="540" />
        <di:waypoint x="2140" y="540" />
        <di:waypoint x="2140" y="463" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1895" y="470" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10_di" bpmnElement="Flow_10">
        <di:waypoint x="2087" y="438" />
        <di:waypoint x="2115" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1fovkoj_di" bpmnElement="Flow_1fovkoj">
        <di:waypoint x="2165" y="438" />
        <di:waypoint x="2195" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1xyd97n_di" bpmnElement="Flow_1xyd97n">
        <di:waypoint x="2245" y="438" />
        <di:waypoint x="2295" y="438" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2253" y="420" width="14" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ouq3r4_di" bpmnElement="Flow_1ouq3r4">
        <di:waypoint x="2220" y="463" />
        <di:waypoint x="2220" y="540" />
        <di:waypoint x="2414" y="540" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2230" y="470" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0voy9df_di" bpmnElement="Flow_0voy9df">
        <di:waypoint x="2425" y="438" />
        <di:waypoint x="2465" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0z74quy_di" bpmnElement="Flow_0z74quy">
        <di:waypoint x="2725" y="243" />
        <di:waypoint x="2746" y="243" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_14_di" bpmnElement="Flow_14">
        <di:waypoint x="2873" y="243" />
        <di:waypoint x="2880" y="243" />
        <di:waypoint x="2880" y="438" />
        <di:waypoint x="2900" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_18_di" bpmnElement="Flow_18">
        <di:waypoint x="3210" y="463" />
        <di:waypoint x="3210" y="563" />
        <di:waypoint x="3230" y="563" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="3219" y="477" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_19_di" bpmnElement="Flow_19">
        <di:waypoint x="3370" y="563" />
        <di:waypoint x="3402" y="563" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_17_di" bpmnElement="Flow_17">
        <di:waypoint x="3235" y="438" />
        <di:waypoint x="3265" y="438" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="3243" y="413" width="14" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_20_di" bpmnElement="Flow_20">
        <di:waypoint x="3415" y="438" />
        <di:waypoint x="3445" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_21_di" bpmnElement="Flow_21">
        <di:waypoint x="3495" y="438" />
        <di:waypoint x="3535" y="438" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="3508" y="413" width="14" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_22_di" bpmnElement="Flow_22">
        <di:waypoint x="3470" y="463" />
        <di:waypoint x="3470" y="563" />
        <di:waypoint x="3522" y="563" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="3480" y="477" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0v6hnu9_di" bpmnElement="Flow_0v6hnu9">
        <di:waypoint x="2605" y="438" />
        <di:waypoint x="2662" y="438" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2613" y="420" width="14" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_10eazu4_di" bpmnElement="Flow_10eazu4">
        <di:waypoint x="2790" y="395" />
        <di:waypoint x="2790" y="360" />
        <di:waypoint x="2700" y="360" />
        <di:waypoint x="2700" y="268" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1joaaz3_di" bpmnElement="Flow_1joaaz3">
        <di:waypoint x="2515" y="438" />
        <di:waypoint x="2555" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1uzgqwx_di" bpmnElement="Flow_1uzgqwx">
        <di:waypoint x="2580" y="413" />
        <di:waypoint x="2580" y="243" />
        <di:waypoint x="2675" y="243" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2585" y="264" width="19" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1i2lmps_di" bpmnElement="Flow_1i2lmps">
        <di:waypoint x="2490" y="497" />
        <di:waypoint x="2490" y="463" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_16_di" bpmnElement="Flow_16">
        <di:waypoint x="3160" y="438" />
        <di:waypoint x="3185" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1aotrl3_di" bpmnElement="Flow_1aotrl3">
        <di:waypoint x="3016" y="438" />
        <di:waypoint x="3040" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0nsfno9_di" bpmnElement="Flow_0nsfno9">
        <di:waypoint x="1715" y="438" />
        <di:waypoint x="1749" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0uvipyy_di" bpmnElement="Flow_0uvipyy">
        <di:waypoint x="2698" y="438" />
        <di:waypoint x="2732" y="438" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Participant_Push_di" bpmnElement="Participant_Push" isHorizontal="true">
        <dc:Bounds x="-70" y="680" width="3760" height="70" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="MessageFlow_SendPush_di" bpmnElement="MessageFlow_SendPush">
        <di:waypoint x="2330" y="481" />
        <di:waypoint x="2330" y="680" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2333" y="586" width="73" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0k88ipm_di" bpmnElement="Flow_0k88ipm">
        <di:waypoint x="2480" y="583" />
        <di:waypoint x="2480" y="680" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="2483" y="596" width="73" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>

```

