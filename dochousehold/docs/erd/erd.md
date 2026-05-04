---
title: ERD
sidebar_position: 12
description: Раздел с ERD.
---
import Drawio from '@theme/Drawio';
import conceptDiagram from '!!raw-loader!./concept.drawio';
import logicDiagram from '!!raw-loader!./logic.drawio';
import physicalDiagram from '!!raw-loader!./physical.drawio';

**Концептуальная модель:**
<Drawio content={conceptDiagram} />


**Логическая модель:**

<Drawio content={logicDiagram} />

Связи М:М раскрыты через промежуточные сущности: Space_Member для связи пользователей и пространств, Event_Member для участников событий.

Invite_Code вынесен в отдельную сущность, потому что код приглашения имеет собственное состояние активности и может обновляться. Для пространства допускается только один активный код приглашения.

Shopping_Category вынесен в отдельную сущность: пользователь может создавать свои категории, а удаление категории реализуется как скрытие из выбора через is_active.

**Физическая модель:**

<Drawio content={physicalDiagram} />

task_status_enum = active / done

reminder_offset_enum = none / hour / day / week / month

