import yaml from 'js-yaml';
import {existsSync} from 'fs';
import {readFile} from 'node:fs/promises';
import {err} from '../../style.mjs';
import {conf} from '../../index.mjs';

export const readData = async () => {
  const workingDirectory = conf.get('workingDirectory');
  const dataPath = `${ workingDirectory }/data.yml`;

  if (existsSync(dataPath)) {
    try {
      const data = yaml.load(await readFile(dataPath));

      return data;
    }
    catch (e) {
      console.error(`${err} Could not read the akt data file: `, e);
      return '';
    }
  }
  else {
    console.error(`${err} Akt data file ${dataPath} doesn't exist.`);
    return '';
  }
};
