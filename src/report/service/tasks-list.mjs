export const getTasksList = (
  data, // json with tasks info and statuses
) => {
  const errors = [];

  if (data) {
    const tasks = Object.keys(data)
      // if input object prop is not an array we simply ignore it
      // because this prop may be some additional report meta data
      // like for example 'month' prop
      // in this step we mix all task array into one big array
      .reduce((prev, currKey) => Array.isArray(data[currKey]) ? [
        ...prev,
        ...data[currKey],
      ] : prev, [])
      .filter(t => {
        if (!t) {
          errors.push('There are undefined tasks.');
        }
        if (t && !t.id) {
          errors.push('There are tasks without id property.');
        }
        if (t && !t.status) {
          errors.push(`Task ${ t.id } has no status property.`);
        }
        if (t && !t.title) {
          errors.push(`Task ${ t.id } has no title property.`);
        }

        return t?.status === 'done';
      })
      .filter((task, index, array) => {
        const taskIndex = array.findIndex(
          tsk => tsk.id === task.id
        );
        const isAlreadyInTheArray = taskIndex > -1 && taskIndex !== index;

        return !isAlreadyInTheArray;
      });

    return errors.length > 0
      ? errors.join(' ')
      : tasks.reduce((prev, currTask, currIndex) => `${ prev }
1.${
          currIndex + 1
        }. завдання ${
          currTask.id
        } ${
          currTask.title
        }`, '');
  }
  else {
    return 'Wrong input data: input data not defined';
  }
};
