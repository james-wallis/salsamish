import Link from 'next/link';

import styles from './DjTeacherImage.module.css';

export default (props) => {
  const { array } = props;
  return <div className={styles.container}>
    {array.map(tile)}
  </div>
}

const tile = (dj) => {
  const { _id: id, name, urlSafeName, image } = dj;
  return <div key={id} className={styles.outer}>
    <Link href={`/who-is-who/${urlSafeName}`}>
      <a className={styles.inner}>
        <img className={styles.image} src={image} alt={`An image of ${name}`} />
        <p className={styles.name}>{name}</p>
      </a>
    </Link>
  </div>
}