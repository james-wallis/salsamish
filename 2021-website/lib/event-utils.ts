import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat)

// Returns a date string into the format "Friday 23rd July 2021"
export const formatDate = (date: string) => dayjs(date).format('dddd Do MMMM YYYY')