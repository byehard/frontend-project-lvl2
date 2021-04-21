import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parse = (absolutePath) => {
  const fileFormat = path.extname(absolutePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  if (fileFormat === '.json') {
    return JSON.parse(data);
  }
  if (fileFormat === '.yml') {
    return yaml.load(data);
  }
  throw new Error('Error format');
};

export default parse;
