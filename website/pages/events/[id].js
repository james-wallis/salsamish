import fetch from 'isomorphic-unfetch';
import moment from 'moment';

import withLayout from '../../components/hoc/withLayout';

const Page = ({ event }) => {
  console.log(event);
  const { name, date: { start, end } } = event;
  const formattedStart = moment(start).format('dddd, MM YYYY');
  const formattedEnd = moment(end).format('dddd, MMMM YYYY');
  return <div>
    <p>{name}</p>
    <p>{formattedStart} - {formattedEnd}</p>
  </div>
};

Page.getInitialProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:4000/api/events/${id}`);
  const json = await res.json();
  return { event: json };
}

export default withLayout(Page)