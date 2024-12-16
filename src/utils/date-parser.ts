import moment from 'moment'

export const dateParser = (date: string): Date => {
  const parsedDate = moment(date, 'DD-MM-YYYY', true).toDate();

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date format. Use DD-MM-YYYY format.');
  }
  return parsedDate
}