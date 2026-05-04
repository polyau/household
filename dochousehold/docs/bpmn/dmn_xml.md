---
title: DMN - xml (FR-05/FR-06)
sidebar_position: 2
---
```XML
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:biodi="http://bpmn.io/schema/dmn/biodi/2.0" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC/" xmlns:camunda="http://camunda.org/schema/1.0/dmn" id="Definitions_TaskCompletionPermission" name="task_completion_permission" namespace="http://example.com/household/tasks/dmn" exporter="dmn-js (https://demo.bpmn.io/dmn)" exporterVersion="17.7.0">
  <decision id="task_completion_permission" name="Проверка права на изменение статуса задачи">
    <decisionTable id="DecisionTable_TaskCompletionPermission" hitPolicy="FIRST">
      <input id="Input_hasAssignee" label="Назначен исполнитель?">
        <inputExpression id="InputExpression_hasAssignee" typeRef="boolean">
          <text>hasAssignee</text>
        </inputExpression>
      </input>
      <input id="Input_actorRole" label="Роль пользователя">
        <inputExpression id="InputExpression_actorRole" typeRef="string">
          <text>actorRole</text>
        </inputExpression>
      </input>
      <input id="Input_actorIsAssignee" label="Пользователь является исполнителем?">
        <inputExpression id="InputExpression_actorIsAssignee" typeRef="boolean">
          <text>actorIsAssignee</text>
        </inputExpression>
      </input>
      <output id="Output_canComplete" label="Можно завершить?" name="canComplete" typeRef="boolean" />
      <output id="Output_reason" label="Причина" name="reason" typeRef="string" biodi:width="401.9930725097656" />
      <rule id="Rule_1">
        <inputEntry id="Rule_1_Input_1">
          <text>true</text>
        </inputEntry>
        <inputEntry id="Rule_1_Input_2">
          <text>"admin"</text>
        </inputEntry>
        <inputEntry id="Rule_1_Input_3">
          <text>-</text>
        </inputEntry>
        <outputEntry id="Rule_1_Output_1">
          <text>true</text>
        </outputEntry>
        <outputEntry id="Rule_1_Output_2">
          <text>"Администратор может изменять статус назначенной задачи"</text>
        </outputEntry>
      </rule>
      <rule id="Rule_2">
        <inputEntry id="Rule_2_Input_1">
          <text>true</text>
        </inputEntry>
        <inputEntry id="Rule_2_Input_2">
          <text>"participant"</text>
        </inputEntry>
        <inputEntry id="Rule_2_Input_3">
          <text>true</text>
        </inputEntry>
        <outputEntry id="Rule_2_Output_1">
          <text>true</text>
        </outputEntry>
        <outputEntry id="Rule_2_Output_2">
          <text>"Исполнитель может изменять статус своей задачи"</text>
        </outputEntry>
      </rule>
      <rule id="Rule_3">
        <inputEntry id="Rule_3_Input_1">
          <text>true</text>
        </inputEntry>
        <inputEntry id="Rule_3_Input_2">
          <text>"participant"</text>
        </inputEntry>
        <inputEntry id="Rule_3_Input_3">
          <text>false</text>
        </inputEntry>
        <outputEntry id="Rule_3_Output_1">
          <text>false</text>
        </outputEntry>
        <outputEntry id="Rule_3_Output_2">
          <text>"При назначенном исполнителе завершить задачу может только исполнитель или администратор"</text>
        </outputEntry>
      </rule>
      <rule id="Rule_4">
        <inputEntry id="Rule_4_Input_1">
          <text>false</text>
        </inputEntry>
        <inputEntry id="Rule_4_Input_2">
          <text>"admin"</text>
        </inputEntry>
        <inputEntry id="Rule_4_Input_3">
          <text>-</text>
        </inputEntry>
        <outputEntry id="Rule_4_Output_1">
          <text>true</text>
        </outputEntry>
        <outputEntry id="Rule_4_Output_2">
          <text>"Если исполнитель не назначен, статус может изменить любой участник пространства"</text>
        </outputEntry>
      </rule>
      <rule id="Rule_5">
        <inputEntry id="Rule_5_Input_1">
          <text>false</text>
        </inputEntry>
        <inputEntry id="Rule_5_Input_2">
          <text>"participant"</text>
        </inputEntry>
        <inputEntry id="Rule_5_Input_3">
          <text>-</text>
        </inputEntry>
        <outputEntry id="Rule_5_Output_1">
          <text>true</text>
        </outputEntry>
        <outputEntry id="Rule_5_Output_2">
          <text>"Если исполнитель не назначен, статус может изменить любой участник пространства"</text>
        </outputEntry>
      </rule>
      <rule id="Rule_6">
        <inputEntry id="Rule_6_Input_1">
          <text>-</text>
        </inputEntry>
        <inputEntry id="Rule_6_Input_2">
          <text>-</text>
        </inputEntry>
        <inputEntry id="Rule_6_Input_3">
          <text>-</text>
        </inputEntry>
        <outputEntry id="Rule_6_Output_1">
          <text>false</text>
        </outputEntry>
        <outputEntry id="Rule_6_Output_2">
          <text>"Недостаточно прав на изменение задачи"</text>
        </outputEntry>
      </rule>
    </decisionTable>
  </decision>
</definitions>

```

