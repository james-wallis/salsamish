import fetch from 'isomorphic-unfetch';

import withLayout from '../../components/hoc/withLayout';
import PageTitle from '../../components/who-is-who/PageTitle';

const Page = ({ employee }) => {
  console.log(employee);
  const { name, role, image, description, stylesOfMusic, typesOfDance } = employee;
  const formattedRole = formatRole(role, stylesOfMusic, typesOfDance);
  return <div className="who-is-who-individuals">
    <PageTitle />
    <section>
      <p className="role">{formattedRole}</p>
      <h2>{name}</h2>
      <div className="description">
        <p>{description}</p>
      </div>
      <img className="image" src={image} alt={name} />
    </section>
    <div className="next-date">
      <p>The next date I'm at Salsa Mish...</p>
    </div>
    <style global jsx>{`
      /* Overwrite background color for this page */
      body, #container {
        background-color: var(--salsa-dark-grey);
      }
    `}</style>
  </div>
};

Page.getInitialProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:4000/api/employees/${id}`);
  const json = await res.json();
  return { employee: json };
}

const formatRole = (role, stylesOfMusic, typesOfDance) => {
  if (role === 'DJ') {
    if (stylesOfMusic === 'KIZOMBA') {
      return 'Kizomba DJ';
    } else {
      return 'Salsa & Bachata DJ';
    }
  } else if (role === 'TEACHER') {
    const types = typesOfDance.slice(0, -1).join(', ') + ' & ' + typesOfDance.slice(-1);
    return types;
  } else {
    return 'Unknown role';
  }
}

export default withLayout(Page)