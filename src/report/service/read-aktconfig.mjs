import yaml from 'js-yaml';
import {existsSync} from 'fs';
import {readFile} from 'node:fs/promises';
import {err} from '../../style.mjs';
import {conf} from '../../index.mjs';

export const readAktconfig = async () => {
  const workingDirectory = conf.get('workingDirectory');
  const dataPath = `${ workingDirectory }/aktconfig.yml`;

  if (existsSync(dataPath)) {
    try {
      const aktconfig = yaml.load(await readFile(dataPath));
      if (!aktconfig.amount) {
        throw new Error('aktconfig.yml doesn\'t contain: amount');
      }
      if (!aktconfig.customer) {
        throw new Error('aktconfig.yml doesn\'t contain: customer');
      }
      if (!aktconfig.contractor) {
        throw new Error('aktconfig.yml doesn\'t contain: contractor');
      }
      if (!aktconfig.contract) {
        throw new Error('aktconfig.yml doesn\'t contain: contract');
      }

      return aktconfig;
    }
    catch (e) {
      console.error(`${err} Could not read the aktconfig.yml file: `, e);
      return '';
    }
  }
  else {
    console.error(`${err} aktconfig.yml file ${dataPath} doesn't exist.`);
    return '';
  }
};
