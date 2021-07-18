import dayjs from 'dayjs';
import { Db, MongoClient, ObjectID } from 'mongodb'
import { IAgenda, IAgendaItem, IAgendaItemWithEmployees, IAgendaWithEmployees } from '../interfaces/IAgenda';
import IEmployee, { emptyEmployee } from '../interfaces/IEmployee';
import { IEvent, IEventWithEmployees } from '../interfaces/IEvent';

export const DB_NAME = 'salsamish';
export const EMPLOYEE_COLLECTION = 'employees';
export const EVENTS_COLLECTION = 'events';

export const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gdroi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// const dburl = (process.env.DB_HOSTNAME)
//   ? `mongodb://${process.env.DB_HOSTNAME}/salsamish`
//   : `mongodb://localhost/salsamish`;

const client = new MongoClient(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // auth: {
  //   user: 'salsa',
  //   password: 'example',
  // },
});

export const getClient = async (): Promise<MongoClient> => {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client;
}

export const getSalsaDb = (client: MongoClient) => client.db(DB_NAME);

export const getEmployee = (db: Db, employee: string): Promise<IEmployee> => {
  return db.collection(EMPLOYEE_COLLECTION).findOne({ _id: new ObjectID(employee) });
}

export const getDJs = (db: Db, type?: string): Promise<IEmployee[]> => {
  const dbQuery: { role: string, stylesOfMusic?: string } = { role: 'DJ' };

  // Can specify the type of DJ to return
  if (type && ['BACHATA', 'KIZOMBA'].includes(type.toUpperCase())) {
    dbQuery.stylesOfMusic = type.toUpperCase();
  }

  return db.collection(EMPLOYEE_COLLECTION).find(dbQuery).toArray();
}

export const getTeachers = (db: Db): Promise<IEmployee[]> => {
  const dbQuery = { role: 'TEACHER' };
  return db.collection(EMPLOYEE_COLLECTION).find(dbQuery).toArray();
}

export const getAllEvents = (db: Db): Promise<IEvent[]> => {
  return db.collection(EVENTS_COLLECTION).find().toArray();
}

export const getEventByDate = (db: Db, date: Date): Promise<IEvent> => {
  const nextDay = dayjs(date.toISOString()).add(1, 'day');

  const query = {
    "date.start": {
      $gte: date,
      $lt: nextDay.toDate()
    }
  }
  
  return db.collection(EVENTS_COLLECTION).findOne(query);
}

export const getNextEvent = async (db: Db, d?: Date): Promise<IEvent> => {
  const date = d || dayjs().toDate();
  
  const query = {
    "date.start": {
      $gte: date,
    }
  }

  const events: IEvent[] = await db.collection(EVENTS_COLLECTION).find(query).toArray();
  if (!events || events.length === 1) {
    return events[0] || null;
  }

  const [nextEvent] = events.sort((event1, event2) => {
    return dayjs(event1.date.start).isBefore(dayjs(event2.date.start)) ? -1 : 1;
  });

  return nextEvent;
}

export const getEventWithEmployees = async (db: Db, event: IEvent): Promise<IEventWithEmployees> => {
  if (!event) {
    throw new Error(`Incorrect format for event: ${event}`)
  }
  const agendaWithEmployees = await Promise.all(event.agenda.map((item) => (
    getEmployeeForAgendaItem(db, item)
  )));
  return {
    ...event,
    agenda: agendaWithEmployees,
  }
}

const getEmployeeForAgendaItem = async (db: Db, item: IAgendaItem) => {
  const employee = await getEmployee(db, item.employee)
  const itemWithEmployee: IAgendaItemWithEmployees = {
    ...item,
    employee: employee || emptyEmployee, // If employee not found, default to empty employee
  }
  return itemWithEmployee
}
