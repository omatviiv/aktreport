import { path, code, err } from '../../style.mjs';
import { workingDirCreateError } from './working-dir-error.mjs';

describe('workingDirCreateError returns', () => {
  describe('specific error which is blocking working dir creation', () => {
    it('working dir does exist and config has its location', () => {
      expect(workingDirCreateError(
        true, '~/akt/',
      )).toBe(`${ err } Working dir exists: ${
        path('~/akt/')
      } remove it or use ${
        code('aktreport init -p <new_location>')
      }`);
    });
    it('working dir does exist and no value in config for it', () => {
      expect(workingDirCreateError(
        true, '',
      )).toBe(`${ err } Working dir location is not defined.`);
    });
  });
  describe('empty string if working directory can be safely created', () => {
    it('working dir doesn\'t exist and no value in config for it', () => {
      expect(workingDirCreateError(
        false, '',
      )).toBe('');
    });
    it('working dir doesn\'t exist and config has its location', () => {
      expect(workingDirCreateError(
        false, '~/akt/',
      )).toBe('');
    });
  });
});
