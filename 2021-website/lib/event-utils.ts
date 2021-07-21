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

  // Crudely randomise the order
  const randomisedArr = headlineEmployees.sort(() => .5 - Math.random() );

  const midIndex = Math.round(randomisedArr.length / 2) - 1;

  // move Kizomba DJ to the end
  const kizombaDJIndex = randomisedArr.findIndex(({ type }) => type === 'Kizomba DJ');  
  if (kizombaDJIndex && kizombaDJIndex !== randomisedArr.length - 1) {
    const kizombaDJ = randomisedArr[kizombaDJIndex];
    randomisedArr.splice(kizombaDJIndex, 1);
    randomisedArr.push(kizombaDJ);
  }

    // move Salsa & Bachata Dj to the middle
    const salsaAndBachataDJIndex = randomisedArr.findIndex(({ type }) => type === 'Salsa & Bachata DJ');    
    if (salsaAndBachataDJIndex && salsaAndBachataDJIndex !== midIndex) {
      const salsaAndBachataDJ = randomisedArr[salsaAndBachataDJIndex];
      randomisedArr.splice(salsaAndBachataDJIndex, 1);
      randomisedArr.splice(midIndex, 0, salsaAndBachataDJ);
    }

  return randomisedArr;
}