import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import { readFile, parser } from './src/parser.js';
import diff from './src/differ.js';
import formatter from './src/style.js';

export const normalizeFilepath = (filepath) => resolve(cwd(), filepath);
export const getFileExtension = (filepath) => extname(filepath).substring(1);

export const gendiff = (filepath1, filepath2) => {
  const normalizedFilepath1 = normalizeFilepath(filepath1);
  const normalizedFilepath2 = normalizeFilepath(filepath2);

  const firstContent = readFile(normalizedFilepath1);
  const secContent = readFile(normalizedFilepath2);

  const firstObj = parser(firstContent);
  const secObj = parser(secContent);
  const difference = diff(firstObj, secObj);

  return formatter(difference);
};
