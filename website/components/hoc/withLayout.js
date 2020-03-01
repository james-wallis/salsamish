import Header from '../general/Header';
import IconBar from '../general/IconBar';
import Navigation from '../general/Navigation';
import styles from './withLayout.module.css';

export default Page => {
  return () => (
    <div className={styles.container}>
      <Header />
      <div id="content" className={styles.content}>
        <Navigation />
        <main>
          <Page />
        </main>
      </div>
      <IconBar />
    </div>
  )
}
