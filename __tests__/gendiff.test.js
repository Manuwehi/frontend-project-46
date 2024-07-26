import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each(['json', 'yaml'])('Testing differ & form', (ext) => {
  expect(gendiff(getFixturePath(`file1.${ext}`), getFixturePath(`file2.${ext}`))).toStrictEqual(readFile('expectedStylish.txt'));
  expect(gendiff(getFixturePath(`file1.${ext}`), getFixturePath(`file2.${ext}`), 'stylish')).toStrictEqual(readFile('expectedStylish.txt'));
  expect(gendiff(getFixturePath(`file1.${ext}`), getFixturePath(`file2.${ext}`), 'plain')).toStrictEqual(readFile('expectedPlain.txt'));
  expect(gendiff(getFixturePath(`file1.${ext}`), getFixturePath(`file2.${ext}`), 'json')).toStrictEqual(readFile('expectedJson.txt'));
});
