import fs from 'fs';

export const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

export const parser = (data) => JSON.parse(data);
