import Header from '../general/Header';
import IconBar from '../general/IconBar';

export default Page => {
    return () => (
      <div>
        <Header />
        <Page />
        <IconBar />
      </div>
    )
  }
