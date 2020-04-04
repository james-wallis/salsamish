import moment from 'moment';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

import withLayout from '../components/hoc/withLayout';

const START_OF_YEAR = moment('2020-01-01');
const END_OF_YEAR = moment('2021-02-06');
const FRIDAY = 5; // Integer value of Friday in moment.js

const CLOSED_DAYS = [
  '2020-12-25',
  '2021-01-01',
]

const Page = ({ events }) => {
  const eventDays = getEventDays(events);
  return <div className="calendar">
    <div className="page-title">
      <h1>2020 Salsa Mish Dates</h1>
    </div>
    <section className='calendar-dates'>
      <div className='calendar-dates-container'>
        {eventDays.map(dateTile)}
      </div>
    </section>
  </div>
}

Page.getInitialProps = async () => {
  const res = await fetch('http://localhost:4000/api/events');
  const json = await res.json();
  return { events: json };
}

const dateTile = (event) => {
  const { date, url } = event;

  const dateHasPassed = moment().isAfter(date, 'day');
  const datePassedClassName = (dateHasPassed) ? 'past-date' : '';

  const isNextFriday = getNextFriday().isSame(date, 'day');
  const nextFridayClassName = (isNextFriday) ? 'next-friday' : '';

  const additionalCSSClasses = `${datePassedClassName} ${nextFridayClassName}`;

  if (CLOSED_DAYS.includes(date)) {
    return closedTile(event, additionalCSSClasses);
  } else if (!url) {
    return comingSoonTile(event, additionalCSSClasses);
  }
  return defaultTile(event, additionalCSSClasses);
}

const defaultTile = (event, additionalCSSClasses) => {
  const { date, url } = event;
  const day = moment(date);
  return <div key={date} className={`date-tile ${additionalCSSClasses}`}>
    <Link href={url}>
      <a className={`date-tile-inner ${additionalCSSClasses}`}>
        <span>{day.format('D')}</span>
        <span>{day.format('MMM')}</span>
      </a>
    </Link>
  </div>
}

const closedTile = (event, additionalCSSClasses) => {
  const { date } = event;
  const day = moment(date);
  return <div key={date} className={`date-tile ${additionalCSSClasses}`}>
    <div className={`date-tile-inner closed ${additionalCSSClasses}`}>
      <span>{day.format('D')}</span>
      <span>{day.format('MMM')}</span>
      <div className='closed-banner'>
        <span>closed</span>
      </div>
    </div>
  </div>
}

const comingSoonTile = (event, additionalCSSClasses) => {
  const { date } = event;
  const day = moment(date);
  return <div key={date} className={`date-tile ${additionalCSSClasses}`}>
    <div className={`date-tile-inner coming-soon ${additionalCSSClasses}`}>
      <span>{day.format('D')}</span>
      <span>{day.format('MMM')}</span>
      <div className='coming-soon-banner'>
        <span>info soon</span>
      </div>
    </div>
  </div>
}

const getNextFriday = () => {
  const today = moment().isoWeekday();
  if (today <= FRIDAY) {
    return moment().isoWeekday(FRIDAY);
  } else {
    return moment().add(1, 'weeks').isoWeekday(FRIDAY);
  }
}

const getAllDaysInYear = () => {
  const allDays = [];
  for (let m = moment(START_OF_YEAR); m.isBefore(END_OF_YEAR); m.add(1, 'days')) {
    allDays.push({ date: m.format('YYYY-MM-DD') });
  }
  return allDays;
}

const getEventDays = (eventsFromServer) => {
  const allDays = getAllDaysInYear();

  const populatedEventDates = allDays.map(singleDay => {
    const { date } = singleDay;
    const event = eventsFromServer.find(({ date: { start } }) => start && moment(start).isSame(date, 'day'));
    if (event) {
      const { type } = event;
      const url = `/events/${date}`;
      return {
        ...singleDay,
        type,
        url,
      }
    }
    // If event from database does not match a day return the orignal object ({ date })
    return singleDay;
  });

  // Remove non-friday dates that do not exist on the server
  return populatedEventDates.filter(({ date, url }) => url || moment(date).day() === FRIDAY);
}

export default withLayout(Page)
