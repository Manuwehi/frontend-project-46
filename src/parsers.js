import { extname } from 'node:path';
import fs from 'fs';
import yaml from 'js-yaml';

const parser = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Wrong format ${format}`);
  }
};

const preparedFile = (fullFilepath) => {
  const getFileExtension = (filepath) => extname(filepath).slice(1);
  const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
  const firstContent = readFile(fullFilepath);
  const firstExtension = getFileExtension(fullFilepath);
  const arrOpt = [firstContent, firstExtension];
  return arrOpt;
};

const getObj = (fullFilepath) => {
  const arrOpt = preparedFile(fullFilepath);
  const obj = parser(arrOpt[0], arrOpt[1]);
  return obj;
};

export default getObj;
