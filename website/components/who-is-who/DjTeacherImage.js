import Link from 'next/link';

import styles from './DjTeacherImage.module.css';

export default (props) => {
  const { array } = props;
  return <div className={styles.container}>
    {array.map(tile)}
  </div>
}

const tile = (name) => {
  return <div className={styles.outer}>
    <div className={styles.inner}>
      <p className={styles.name}>{name}</p>
    </div>
  </div>
}