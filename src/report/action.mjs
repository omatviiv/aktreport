import {readData} from './service/read-data.mjs';
import {readAktconfig} from './service/read-aktconfig.mjs';
import {getTasksList} from './service/tasks-list.mjs';
import {generateReport} from './service/generate-report.mjs';
import {conf} from '../index.mjs';

export const reportAction = async (opts) => {
  const data = await readData();
  const aktconfig = await readAktconfig();

  if (opts.listOnly) {
    console.log(getTasksList(data));
    return;
  }

  if (opts.config) {
    console.log('App configuration:');
    for (const configItem of conf) {
      if (configItem && configItem[0] && configItem[1]) {
        console.log(`  ${ configItem[0] }: ${ configItem[1] }`);
      }
      else {
        console.error('  Error: couldn\'t transform config item:', configItem);
      }
    }
    return;
  }

  generateReport(data, aktconfig);
};
