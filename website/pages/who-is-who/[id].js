import fetch from 'isomorphic-unfetch';

import withLayout from '../../components/hoc/withLayout';
import PageTitle from '../../components/who-is-who/PageTitle';

const Page = ({ employee }) => {
  console.log(employee);
  const { name } = employee;


  return <div className="who-is-who-djs-teachers">
    {/* <PageTitle title="Salsa &amp; Bachata DJ's" /> */}
    <section>
      <h2>{name}</h2>
    </section>
  </div>
};

Page.getInitialProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:4000/api/employees/${id}`);
  const json = await res.json();
  return { employee: json };
}

export default withLayout(Page)