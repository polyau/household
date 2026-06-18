import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Общие пространства',
    Svg: require('@site/static/img/common_spaces_dino.svg').default,
    description: (
      <>
        Создавайте пространства для семьи, пары или соседей и приглашайте участников. 
        Ведите общие бытовые дела и смотрите актуальную информацию по делам участников.
      </>
    ),
  },
  {
    title: 'Задачи и покупки',
    Svg: require('@site/static/img/tasks_shopping_dino.svg').default,
    description: (
      <>
        Фиксируйте задачи по дому, назначайте исполнителей, отмечайте выполнение и ведите общий список покупок. 
        Это позволяет не держать обязанности в голове и вести их совместно.
      </>
    ),
  },
  {
    title: 'Календарь и уведомления',
    Svg: require('@site/static/img/calendar_notifications_dino.svg').default,
    description: (
      <>
        Добавляйте общие события в календарь пространства и настраивайте напоминания. 
        Уведомления помогают узнавать о назначенных задачах, дедлайнах и приближающихся событиях.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
