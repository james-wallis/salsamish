import fetch from 'isomorphic-unfetch';

import withLayout from '../../components/hoc/withLayout';
import PageTitle from '../../components/who-is-who/PageTitle';
import DjTeacherImage from '../../components/who-is-who/DjTeacherImage';

const Page = ({ teachers }) => {
  return <div className="who-is-who-djs-teachers">
    <PageTitle title="Teachers" />
    <section>
      <DjTeacherImage array={teachers} />
    </section>
    <style global jsx>{`
      /* Overwrite background color for this page */
      body, #container {
        background-color: white;
      }
    `}</style>
  </div>
};

Page.getInitialProps = async () => {
  const res = await fetch('http://localhost:4000/api/employees/teachers');
  const json = await res.json();

  return { teachers: json };
}

export default withLayout(Page)
