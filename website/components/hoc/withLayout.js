import Header from '../general/Header';
import IconBar from '../general/IconBar';
import Navigation from '../general/Navigation';
import styles from './withLayout.module.css';

export default Page => {
  const Layout = (props) => {
    return <div id="container" className={styles.container}>
      <Header />
      <div id="content" className={styles.content}>
        <Navigation />
        <main>
          <Page {...props} />
        </main>
      </div>
      <IconBar />
    </div>
  }

  // Call the pages getInitialProps function
  if (Page.getInitialProps) {
    Layout.getInitialProps = Page.getInitialProps;
  }

  return Layout;
}