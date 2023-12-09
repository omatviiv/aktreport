import { generateDataTemplate } from './generate-data-template.mjs';

describe('generateDataTemplate() returns', () => {
  it('data template', () => {
    expect(generateDataTemplate('2022-07-02T12:20:00.000Z')).toEqual({
      month: '07-2022',
      day01fri: '',
      day02sat: '',
      day03sun: '',
      day04mon: '',
      day05tue: '',
      day06wed: '',
      day07thu: '',
      day08fri: '',
      day09sat: '',
      day10sun: '',
      day11mon: '',
      day12tue: '',
      day13wed: '',
      day14thu: '',
      day15fri: '',
      day16sat: '',
      day17sun: '',
      day18mon: '',
      day19tue: '',
      day20wed: '',
      day21thu: '',
      day22fri: '',
      day23sat: '',
      day24sun: '',
      day25mon: '',
      day26tue: '',
      day27wed: '',
      day28thu: '',
      day29fri: '',
      day30sat: '',
      day31sun: '',
    });
  });
});
