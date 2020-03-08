import moment from 'moment';

import withLayout from '../components/hoc/withLayout';

const START_OF_YEAR = moment('2020-01-01');
const END_OF_YEAR = moment('2021-02-06');
const FRIDAY = 5; // Integer value of Friday in moment.js

const CLOSED_DAYS = [
  '2020-12-25',
  '2021-01-01',
]

// Make API call to server to get all events
//  For Fridays just display normal square
//  For Special events display the special box + name if exists
//  For Special events that are not on a Friday display the weekday on square

const page = () => {
  const eventDays = getEventDays([]);
  return <div className="calendar">
    <div className="page-title">
      <h1>2020 Salsa Mish Dates</h1>
    </div>
    <section className='calendar-dates'>
      {eventDays.map(dateTile)}
    </section>
  </div>
}

const dateTile = (date) => {
  const day = moment(date);
  if (CLOSED_DAYS.includes(date)) {
    return <div className='date-tile'>
      <div className='date-tile-inner closed'>
        <span>{day.format('D')}</span>
        <span>{day.format('MMM')}</span>
        <div className='closed-banner'>
          <span>closed</span>
        </div>
      </div>
    </div>
  }
  return <div className='date-tile'>
    <div className='date-tile-inner'>
      <a>
        <span>{day.format('D')}</span>
        <span>{day.format('MMM')}</span>
      </a>
    </div>
  </div>
}

const getAllDaysInYear = () => {
  const allDays = [];
  for (let m = moment(START_OF_YEAR); m.isBefore(END_OF_YEAR); m.add(1, 'days')) {
    allDays.push(m.format('YYYY-MM-DD'));
  }
  return allDays;
}

const getEventDays = (eventDays) => {
  const allDays = getAllDaysInYear();
  return allDays.filter(day => eventDays.includes(day) || moment(day).day() === FRIDAY);
}

export default withLayout(page)
