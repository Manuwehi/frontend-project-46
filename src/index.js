import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import fs from 'fs';
import parser from './parsers.js';
import getDiff from './differ.js';
import getFormatted from './formatters/index.js';

const getFullFilepath = (filepath) => resolve(cwd(), filepath);
const getFileExtension = (filepath) => extname(filepath).slice(1);
const getFileContent = (filepath) => parser(fs.readFileSync(filepath, 'utf-8'), getFileExtension(filepath));

const gendiff = (filepath1, filepath2, neededForm = 'stylish') => {
  const fullFilepath1 = getFullFilepath(filepath1);
  const fullFilepath2 = getFullFilepath(filepath2);
  const firstObj = getFileContent(fullFilepath1);
  const secObj = getFileContent(fullFilepath2);
  const difference = getDiff(firstObj, secObj);

  return getFormatted(difference, neededForm);
};

export default gendiff;
