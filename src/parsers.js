import fs from 'fs';
import yaml from 'js-yaml';

export const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

export const parser = (data, format) => {
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
