import Link from 'next/link';

import withLayout from '../../components/hoc/withLayout';

const page = () => {
  return <div className="who-is-who">
    <section>
      <h1>Who is who</h1>
      <p>Salsa Mish is proud to present top DJ's and teachers</p>
      <div className="icon-links">
        <Link href="/who-is-who/salsa-bachata-djs">
          <a>
            <img src="/icons/Icon-DJ-Salsa.png" alt="salsa-bachata icon" />
            <h2>Salsa &amp; Bachata</h2>
          </a>
        </Link>
        <Link href="/who-is-who/kizomba">
          <a>
            <img src="/icons/Icon-DJ-Kizomba.png" alt="kizomba icon" />
            <h2>Kizomba</h2>
          </a>
        </Link>
        <Link href="/who-is-who/teachers">
          <a>
            <img src="/icons/Icon-Teachers.png" alt="teachers icon" />
            <h2>Teachers</h2>
          </a>
        </Link>
      </div>
    </section>
    <style global jsx>{`
      /* Overwrite background color for this page */
      body, #container {
        background-color: var(--salsa-dark-grey)
      }
    `}</style>
  </div>
}

export default withLayout(page)
