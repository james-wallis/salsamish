import fetch from 'isomorphic-unfetch';

import withLayout from '../../components/hoc/withLayout';
import PageTitle from '../../components/who-is-who/PageTitle';
import DjTeacherImage from '../../components/who-is-who/DjTeacherImage';

const Page = ({ djs }) => {
  return <div className="who-is-who-djs-teachers">
    <PageTitle title="Salsa &amp; Bachata DJ's" />
    <section>
      <DjTeacherImage array={djs} />
    </section>
  </div>
};

Page.getInitialProps = async () => {
  const res = await fetch('http://localhost:4000/api/employees/djs?type=kizomba');
  const json = await res.json();

  return { djs: json };
}

export default withLayout(Page)