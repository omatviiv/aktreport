import { getTasksList } from './tasks-list.mjs';
import {
  DATA,
  DATA_WITH_DONE_DUPLICATES,
} from './tasks-list-data.mjs';

describe('getTasksList() returns', () => {
  it('list of tasks ready for report', () => {
    expect(getTasksList(DATA)).toEqual(`
1.1. завдання 6486 show permanent toast for errors during charge calculations
1.2. завдання 6427 payment indicators should show payment state while loading not jumping statuses
1.3. завдання 6529 don't show error when PMM parcel is not found
1.4. завдання 6539 fix indefinite loading state on parcel details page
1.5. завдання 6559 discuss user not the owner of the parcel page view with Octavian
1.6. завдання 6560 parcel details - show text to let user know we can't get more info about the parcel if he is not the owner
1.7. завдання 6574 hide unconfirmed email warning when user updates email field
1.8. завдання 6573 fix edit email url on email confirmation page
1.9. завдання 6495 make the phone input to grow when we have more space available
1.10. завдання 6494 country code selector has very big gap from the number
1.11. завдання 6722 visual fixes & improvements
1.12. завдання 6736 review drawers feature`);
  });
  it('list of tasks without duplicates', () => {
    expect(getTasksList(DATA_WITH_DONE_DUPLICATES)).toEqual(`
1.1. завдання 6486 show permanent toast for errors during charge calculations
1.2. завдання 6427 payment indicators should show payment state while loading not jumping statuses
1.3. завдання 6529 don't show error when PMM parcel is not found
1.4. завдання 6539 fix indefinite loading state on parcel details page
1.5. завдання 6559 discuss user not the owner of the parcel page view with Octavian
1.6. завдання 6560 parcel details - show text to let user know we can't get more info about the parcel if he is not the owner
1.7. завдання 6574 hide unconfirmed email warning when user updates email field
1.8. завдання 6573 fix edit email url on email confirmation page
1.9. завдання 6495 make the phone input to grow when we have more space available
1.10. завдання 6494 country code selector has very big gap from the number
1.11. завдання 6722 visual fixes & improvements
1.12. завдання 6736 review drawers feature`);
  });
  describe('textual error message if input data are incorrect', () => {
    it('in case input data is not an array', () => {
      expect(getTasksList(undefined))
        .toEqual('Wrong input data: input data not defined');
      expect(getTasksList(null))
        .toEqual('Wrong input data: input data not defined');
    });
    it('in case input data is not an array', () => {
      expect(getTasksList(undefined))
        .toEqual('Wrong input data: input data not defined');
      expect(getTasksList(null))
        .toEqual('Wrong input data: input data not defined');
    });
    it('in case input data contains undefined tasks', () => {
      expect(getTasksList({
        day01mon: [undefined],
      }))
        .toEqual('There are undefined tasks.');
    });
    it('in case input data contains tasks without required properties', () => {
      expect(getTasksList({
        day01mon: [{
          title: 'test task without id',
          link: 'http://task.without.id',
          status: 'done',
        }],
      })).toEqual('There are tasks without id property.');

      expect(getTasksList({
        day01mon: [{
          id: 5435,
          title: 'test task without status',
          link: 'http://task.without.status',
        }],
      })).toEqual('Task 5435 has no status property.');

      expect(getTasksList({
        day01mon: [{
          id: 5436,
          link: 'http://task.without.title',
          status: 'not done or in progress',
        }],
      })).toEqual('Task 5436 has no title property.');
    });
    it('if there are multiple errors they stack', () => {
      expect(getTasksList({
        day01mon: [
          {
            title: 'test task without id',
            link: 'http://task.without.id',
            status: 'done',
          },
          {
            id: 5435,
            title: 'test task without status',
            link: 'http://task.without.status',
          },
          {
            id: 5436,
            link: 'http://task.without.title',
            status: 'not done or in progress',
          },
        ],
      })).toEqual('There are tasks without id property. Task 5435 has no status property. Task 5436 has no title property.');
    });
  });
});
