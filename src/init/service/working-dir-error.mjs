import { info, code, path, err } from '../../style.mjs';

export const workingDirCreateError = (
  exists, // boolean
  workingDirLocation, // string
) => {
  if (exists && workingDirLocation) {
    return `${ err } Working dir exists: ${
      path(workingDirLocation)
    } remove it or use ${
      code('aktreport init -p <new_location>')
    }`;
  }
  if (!exists && !workingDirLocation) {
    console.log(`${ info } Save working dir location in config.`);
    console.log(`${ info } Working directory doesn\'t exist - creating ...`);
    return '';
  }
  if (!exists && workingDirLocation) {
    console.log(`${ info } Working directory doesn\'t exist - creating ...`);
    return '';
  }
  if (exists && !workingDirLocation) {
    console.log(`${ info } Working directory doesn\'t exist - creating ...`);
    return `${ err } Working dir location is not defined.`;
  }

  return `${ err } Something went wrong.`;
};
