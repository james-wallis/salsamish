import Container from './NavContainer';
import Links from './NavLinks';
import Info from './NavInfo';
import Footer from './NavFooter';

export default () => {
  return <>
    <Container>
      <Links />
      <Info />
      <Footer />
    </Container>
  </>
}