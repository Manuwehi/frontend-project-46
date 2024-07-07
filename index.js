import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import { readFile, parser } from './src/parsers.js';
import diff from './src/differ.js';
import formatter from './src/stylish.js';

export const normalizeFilepath = (filepath) => resolve(cwd(), filepath);
export const getFileExtension = (filepath) => extname(filepath).slice(1);

export const gendiff = (filepath1, filepath2) => {
  const normalizedFilepath1 = normalizeFilepath(filepath1);
  const normalizedFilepath2 = normalizeFilepath(filepath2);

  const firstContent = readFile(normalizedFilepath1);
  const secContent = readFile(normalizedFilepath2);

  const firstExtension = getFileExtension(filepath1);
  const secExtension = getFileExtension(filepath2);

  const firstObj = parser(firstContent, firstExtension);
  const secObj = parser(secContent, secExtension);
  const difference = diff(firstObj, secObj);

  return formatter(difference);
};
