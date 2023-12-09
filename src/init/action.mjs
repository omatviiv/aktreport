import os from 'os';
import {access, constants, mkdir} from 'node:fs/promises';
import {done, err, logInfo, path} from '../style.mjs';
import {conf} from '../index.mjs';
import {workingDirCreateError} from './service/working-dir-error.mjs';
import {writeDataTemplate} from './service/write-data-template.mjs';

export const initAction = async (opts) => {
  const pth = opts.path;
  const workingDirectory = conf.get('workingDirectory');
  const workingDirectoryDefault = conf.get('workingDirectoryDefault');
  const wdLocation = pth || workingDirectory || workingDirectoryDefault;

  // save new working directory paath if user specified it
  if (pth) {
    conf.set('workingDirectory', pth);
  }

  try {
    logInfo('Try to create working directory...');
    await access(
      wdLocation,
      constants.R_OK | constants.W_OK
    );

    console.log(workingDirCreateError(
      true, // working dir exists
      wdLocation,
    ));
  }
  catch (e) {
    const createWorkingDirError = workingDirCreateError(
      false, // working dir doesn't exist
      wdLocation,
    );

    if (createWorkingDirError) {
      console.log(createWorkingDirError);
    }
    else {
      try {
        const createDir = await mkdir(wdLocation, { recursive: true });
        console.log(`${ done } Working directory created: ${
          path(createDir)
        }`);
      }
      catch (e) {
        console.error(`${ err } Coundn\'t create working dir: `, e);
      }
    }
  }
  finally {
    writeDataTemplate();
  }
};
