import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('genDiff - #1 2 json files', () => {
  const json1 = readFile('file1.json');
  const json2 = readFile('file2.json');
  const expected = readFile('result.txt');
  expect(genDiff(json1, json2)).toBe(expected);
});

test('genDiff - #2 2 empty files', () => {
  const actual = genDiff('{}', '{}');
  expect(actual).toEqual('empty keys');
});

test('genDiff - #3 first empty file', () => {
  const actual = genDiff('{}', '{ "first": 1, "second": 2, "third": 3 }');
  const expected = `{
  + first: 1
  + second: 2
  + third: 3
}`;
  expect(actual).toEqual(expected);
});

test('genDiff - #4 second empty file', () => {
  const actual = genDiff('{ "first": 1, "second": 2, "third": 3 }', '{}');
  const expected = `{
  - first: 1
  - second: 2
  - third: 3
}`;
  expect(actual).toEqual(expected);
});
