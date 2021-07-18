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
        image: '/test/charlotte.png',
      }
    },
    {
      ...agendaItemTemplate,
      name: 'Bachata',
      employee: {
        ...employeeTemplate,
        name: 'Mish',
        image: '/test/mish.png',
      }
    },
    {
      ...agendaItemTemplate,
      name: 'Salsa & Bachata',
      employee: {
        ...employeeTemplate,
        type: 'DJSET',
        name: 'Julian the Duke',
        image: '/test/julian-the-duke.png',
      }
    },
    {
      ...agendaItemTemplate,
      name: 'Kizomba',
      employee: {
        ...employeeTemplate,
        name: 'Salima',
        image: '/test/salima.png',
      }
    },
    {
      ...agendaItemTemplate,
      name: 'Kizomba',
      type: 'DJSET',
      employee: {
        ...employeeTemplate,
        name: 'Merv',
        image: '/test/merv.png',
      }
    }
  ],
}

export default event;