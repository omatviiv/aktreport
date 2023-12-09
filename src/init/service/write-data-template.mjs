import { dump } from 'js-yaml';
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { generateDataTemplate } from './generate-data-template.mjs';
import { done, info, err, path, logInfo } from '../../style.mjs';
import { conf } from '../../index.mjs';

export const writeDataTemplate = async () => {
  const template = generateDataTemplate(new Date());
  const templateLocation = `${ conf.get('workingDirectory') }/data.yml`;

  try {
    logInfo('Try to create data template...');
    const templateYaml = dump(template);
    console.log(`${ done } Data template converted into yaml.`);

    try {
      if (existsSync(templateLocation)) {
        console.error(`${ err } Data template already exists: ${
          path(templateLocation)
        }`);
      }
      else {
        await writeFile(templateLocation, templateYaml);
        console.log(`${ done } Data template written: ${
          path(templateLocation)
        }`);
      }
    }
    catch (e) {
      console.error(`${ err } Coundn't write data tempate: `, e);
    }
  }
  catch (e) {
    console.error(`${ err } Coundn\'t convert template to yaml: `, e);
  }
};
