import { cwd } from 'node:process';
import { resolve } from 'node:path';
import getObj from './parsers.js';
import diff from './differ.js';
import getFormatted from './formatters/index.js';

const getFullFilepath = (filepath) => resolve(cwd(), filepath);

const gendiff = (filepath1, filepath2, neededForm = 'stylish') => {
  const fullFilepath1 = getFullFilepath(filepath1);
  const fullFilepath2 = getFullFilepath(filepath2);

  const firstObj = getObj(fullFilepath1);
  const secObj = getObj(fullFilepath2);
  const difference = diff(firstObj, secObj);

  return getFormatted(difference, neededForm);
};

export default gendiff;
