const employeeTemplate = {
  _id: '',
  name: '',
  urlSafeName: '',
  role: '',
  image: '',
  description: '',
  stylesOfMusic: [],
  typesOfDance: [],
}

const agendaItemTemplate = {
  _id: '1',
  name: '',
  description: '',
  type: '',
  lesson_level: '',
  start: '',
  end: '',
  employee: employeeTemplate
}

const event = {
  _id: 's',
  name: 's',
  type: 's',
  date: {
    start: '',
    end: '',
  },
  description: 'd',
  facebook: 'f',
  agenda: [
    {
      ...agendaItemTemplate,
      name: 'Salsa',
      employee: {
        ...employeeTemplate,
        name: 'Charlotte',
        image: '/charlotte-cropped.png',
      }
    },
    {
      ...agendaItemTemplate,
      name: 'Bachata',
      employee: {
        ...employeeTemplate,
        name: 'Mish',
        image: '/mish-cropped.png',
      }
    },
    {
      ...agendaItemTemplate,
      name: 'Salsa & Bachata',
      employee: {
        ...employeeTemplate,
        name: 'Julian the Duke',
        image: '/julian-cropped.png',
      }
    },
    {
      ...agendaItemTemplate,
      name: 'Kizomba',
      employee: {
        ...employeeTemplate,
        name: 'Salima',
        image: '/salima-cropped.png',
      }
    },
    {
      ...agendaItemTemplate,
      name: 'Kizomba',
      type: 'DJET',
      employee: {
        ...employeeTemplate,
        name: 'Merville',
        image: '/merv-cropped.png',
      }
    }
  ],
}

export default event;