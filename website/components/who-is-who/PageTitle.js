import Link from 'next/link';

import styles from './PageTitle.module.css';

export default (props) => {
  const { title } = props;
  return <div className={`${styles.pageTitle} `}>
    <h1>{title}</h1>
    <div className={styles.headerImages}>
      <Link href="/who-is-who/salsa-bachata-djs">
        <a>
          <img src="/icons/Icon-DJ-Salsa.png" alt="salsa-bachata icon" />
        </a>
      </Link>
      <Link href="/who-is-who/kizomba">
        <a>
          <img src="/icons/Icon-DJ-Kizomba.png" alt="kizomba icon" />
        </a>
      </Link>
      <Link href="/who-is-who/teachers">
        <a>
          <img src="/icons/Icon-Teachers.png" alt="teachers icon" />
        </a>
      </Link>
    </div>
  </div>
}