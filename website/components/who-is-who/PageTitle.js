import Link from 'next/link';

import styles from './PageTitle.module.css';

export default (props) => {
  const { title } = props;
  // Only add background and border shadow if title exists
  const styleOverrides = {
    backgroundColor: 'var(--salsa-dark-grey)',
    borderShadow: '0px 0px 10px 6px rgba(0,0,0,0.75)'
  }
  return <div className={styles.pageTitle} style={(title) ? styleOverrides : null }>
    { (title) ? <h1>{title}</h1> : null }
    <div className={styles.headerImages} >
      <Link href="/who-is-who/salsa-bachata-djs">
        <a>
          <img src="/icons/Icon-DJ-Salsa.png" alt="salsa-bachata icon" />
        </a>
      </Link>
      <Link href="/who-is-who/kizomba-djs">
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