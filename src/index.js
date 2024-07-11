import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import { readFile, parser } from './parsers.js';
import diff from './differ.js';
import formatter from './formatters/index.js';

const normalizeFilepath = (filepath) => resolve(cwd(), filepath);
const getFileExtension = (filepath) => extname(filepath).slice(1);

const gendiff = (filepath1, filepath2, neededForm = 'stylish') => {
  const normalizedFilepath1 = normalizeFilepath(filepath1);
  const normalizedFilepath2 = normalizeFilepath(filepath2);

  const firstContent = readFile(normalizedFilepath1);
  const secContent = readFile(normalizedFilepath2);

  const firstExtension = getFileExtension(filepath1);
  const secExtension = getFileExtension(filepath2);

  const firstObj = parser(firstContent, firstExtension);
  const secObj = parser(secContent, secExtension);
  const difference = diff(firstObj, secObj);

  return formatter(difference, neededForm);
};

export default gendiff;
