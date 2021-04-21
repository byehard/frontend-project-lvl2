import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('genDiff - #1 (json) 2 json files', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  const expected = readFile('result-json.txt');
  expect(genDiff(json1, json2)).toBe(expected);
});

test('genDiff - #2 (json) 2 empty files', () => {
  const json1 = getFixturePath('empty1.json');
  const json2 = getFixturePath('empty2.json');
  expect(genDiff(json1, json2)).toEqual('empty keys');
});

test('genDiff - #3 (json) first empty file', () => {
  const json1 = getFixturePath('empty1.json');
  const json2 = getFixturePath('123.json');
  const expected = readFile('result-json-3.txt');
  expect(genDiff(json1, json2)).toBe(expected);
});

test('genDiff - #4 (json) second empty file', () => {
  const json1 = getFixturePath('123.json');
  const json2 = getFixturePath('empty1.json');
  const expected = readFile('result-json-4.txt');
  expect(genDiff(json1, json2)).toBe(expected);
});

test('genDiff - #5 (yml) 2 yml files', () => {
  const yml1 = getFixturePath('file1.yml');
  const yml2 = getFixturePath('file2.yml');
  const expected = readFile('result-yml.txt');
  expect(genDiff(yml1, yml2)).toBe(expected);
});

test('genDiff - #6 (yml) 2 empty files', () => {
  const yml1 = getFixturePath('empty1.yml');
  const yml2 = getFixturePath('empty2.yml');
  expect(genDiff(yml1, yml2)).toEqual('empty keys');
});

test('genDiff - #7 (yml) first empty file', () => {
  const yml1 = getFixturePath('empty1.yml');
  const yml2 = getFixturePath('123.yml');
  const expected = readFile('result-yml-3.txt');
  expect(genDiff(yml1, yml2)).toBe(expected);
});

test('genDiff - #8 (yml) second empty file', () => {
  const yml1 = getFixturePath('123.yml');
  const yml2 = getFixturePath('empty1.yml');
  const expected = readFile('result-yml-4.txt');
  expect(genDiff(yml1, yml2)).toBe(expected);
});
