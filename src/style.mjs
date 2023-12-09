const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const MAGENTA = '\x1b[35m';
const CYAN = '\x1b[36m';
const WHITE = '\x1b[37m';
const RESET = '\x1b[0m';

const red = s => `${ RED }${ s }${ RESET }`;
const green = s => `${ GREEN }${ s }${ RESET }`;
const yellow = s => `${ YELLOW }${ s }${ RESET }`;
const blue = s => `${ BLUE }${ s }${ RESET }`;
const magenta = s => `${ MAGENTA }${ s }${ RESET }`;
const cyan = s => `${ CYAN }${ s }${ RESET }`;
const white = s => `${ WHITE }${ s }${ RESET }`;

export const done = green('\u2713');
export const info = yellow('\u270F');
export const err = red('\u2718');

export const path = s => blue(s);
export const code = s => yellow(s);

export const logInfo = s => console.info(`${ CYAN }${ s }${ RESET }`);
