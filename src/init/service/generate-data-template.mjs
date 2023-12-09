import format from 'date-fns/format/index.js';
import getDaysInMonth from 'date-fns/getDaysInMonth/index.js';
import getYear from 'date-fns/getYear/index.js'
import getMonth from 'date-fns/getMonth/index.js'

export const generateDataTemplate = (
  date/*: Date in ISO*/,
)/*: TemplateData*/ => {
  const d = new Date(date);
  const daysInMonth = getDaysInMonth(d);
  const month = getMonth(d);
  const year = getYear(d);
  const monthYear = format(d, 'MM-yyyy');

  const days = Object.fromEntries(
    Array(daysInMonth).fill(0).map((currentDay, idx) => {
      const currentDate = new Date(year, month, idx + 1);
      const day = `day${
        format(currentDate, 'dd')
      }${
        format(currentDate, 'EEE').toLowerCase()
      }`;

      return [day, ''];
    }),
  );

  return {
    month: monthYear,
    ...days,
  };
};
