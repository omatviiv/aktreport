#! /usr/bin/env node
import path from 'path';
import os from 'os';
import { Command } from 'commander';
import Conf from 'conf';
import version from './version.cjs';
import { reportAction } from './report/action.mjs';
import { initAction } from './init/action.mjs';

export const conf = new Conf();
conf.set('workingDirectoryDefault', `${ os.homedir() }/akt`);
conf.set('font', `${ path.resolve(
  path.resolve(),
  'src/assets/fonts/no-name-37-font/no_name_37_Light.otf',
) }`);
conf.set('font-bold', `${ path.resolve(
  path.resolve(),
  'src/assets/fonts/no-name-37-font/no_name_37_Regular.otf',
) }`);

const program = new Command();

program
  .name('aktreport')
  .description('generate monthly activity report')
  .version(version)
  .option('-l, --list-only', 'use to generate tasks list only')
  .option('-c, --config', 'list app configuration')
  .action(reportAction);

program.command('init')
  .description('setup working directory and generate data template')
  .option(
    '-p, --path <value>',
    'speficy location for the wrokding directory',
    '',
  )
  .action(initAction);

program.parse();
