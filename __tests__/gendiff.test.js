import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expStylish = readFile('expectedStylish.txt');
const expPlain = readFile('expectedPlain.txt');
const expJson = readFile('expectedJson.txt');

test.each(['json', 'yaml'])('Testing differ & form', (ext) => {
  const firstFilePath = getFixturePath(`file1.${ext}`);
  const secFilePath = getFixturePath(`file2.${ext}`);
  expect(gendiff(firstFilePath, secFilePath)).toStrictEqual(expStylish);
  expect(gendiff(firstFilePath, secFilePath, 'stylish')).toStrictEqual(expStylish);
  expect(gendiff(firstFilePath, secFilePath, 'plain')).toStrictEqual(expPlain);
  expect(gendiff(firstFilePath, secFilePath, 'json')).toStrictEqual(expJson);
});
