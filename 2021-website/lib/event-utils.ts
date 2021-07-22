import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { IAgendaWithEmployees } from '../interfaces/IAgenda';
import { IEventWithEmployees } from '../interfaces/IEvent';
import IHeadlineEmployee from '../interfaces/IHeadlineEmployee';

dayjs.extend(advancedFormat)

// Returns a date string into the format "Friday 23rd July 2021"
export const formatDate = (date: string) => dayjs(date).format('dddd Do MMMM YYYY')

export const convertEventToHeadlineEmployees = ({ agenda }: IEventWithEmployees): IHeadlineEmployee[] => {
  const filteredAgenda: IAgendaWithEmployees = agenda.filter((item, i, arr)=> (
    arr.findIndex(t => (t.name === item.name && t.type === item.type)) === i
  ));

  const headlineEmployees: IHeadlineEmployee[] = filteredAgenda.map(({ name: itemName, type, employee: { name, image } }) => ({
    name,
    image,
    type: (type === 'DJSET') ? `${itemName} DJ` : itemName,
    role: type,
  }));

  // Sort employees in the order given below
  const order = ['bachata', 'salsa & bachata dj', 'salsa', 'kizomba dj'];
  const orderedArr: IHeadlineEmployee[] = [];

  for (let i = 0; i < order.length; i++) {
    const index = headlineEmployees.findIndex(({ type }) => type.toLowerCase() === order[i]);
    if (index > -1) {
      orderedArr.push(headlineEmployees[index]);
      headlineEmployees.splice(index, 1);
    }
  }

  // Add any employees not in the array to the start
  orderedArr.unshift(...headlineEmployees);
  return orderedArr;
}