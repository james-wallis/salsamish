import moment from 'moment';

export default (d) => {
  const date = (d) ? moment(d) : null;
  return [
    {
      name: 'Salsa',
      description: '',
      type: 'LESSON',
      lesson_level: 'BEGINNERS',
      start: formatTime(date, 8, 50),
      end: formatTime(date, 9, 45),
      employee: null
    },
    {
      name: 'Salsa',
      description: '',
      type: 'LESSON',
      lesson_level: 'INTERMEDIATES',
      start: formatTime(date, 8, 0),
      end: formatTime(date, 8, 50),
      employee: null
    },
    {
      name: 'Kizomba',
      description: '',
      type: 'LESSON',
      lesson_level: 'BEGINNERS',
      start: formatTime(date, 8, 0),
      end: formatTime(date, 8, 50),
      employee: null
    },
    {
      name: 'Kizomba',
      description: '',
      type: 'LESSON',
      lesson_level: 'INTERMEDIATES',
      start: formatTime(date, 8, 50),
      end: formatTime(date, 9, 45),
      employee: null
    },
    {
      name: 'Bachata',
      description: '',
      type: 'LESSON',
      lesson_level: 'BEGINNERS',
      start: formatTime(date, 7, 30),
      end: formatTime(date, 8, 0),
      employee: null
    },
    {
      name: 'Bachata',
      description: '',
      type: 'LESSON',
      lesson_level: 'INTERMEDIATES',
      start: formatTime(date, 9, 15),
      end: formatTime(date, 9, 45),
      employee: null
    },
    {
      name: 'Salsa & Bachata',
      description: '',
      type: 'DJSET',
      lesson_level: null,
      start: formatTime(date, 9, 45),
      end: formatTime(date, 1, 0, true),
      employee: null
    },
    {
      name: 'Kizomba',
      description: '',
      type: 'DJSET',
      lesson_level: null,
      start: formatTime(date, 9, 45),
      end: formatTime(date, 1, 0, true),
      employee: null
    }
  ]
}

const formatTime = (date, hours, minutes, nextDay) => {
  if (!date || date === '') return null;
  const clone = date.clone();
  if (nextDay) clone.add(1, 'days');
  return clone.hours(hours).minutes(minutes).seconds(0).toISOString();
}