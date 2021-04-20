import _ from 'lodash';

const genDiff = (data1, data2) => {
  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedResultingKeys = _.sortBy(keys);

  if (sortedResultingKeys.length === 0) {
    return 'empty keys';
  }
  const resultStr = sortedResultingKeys
    .reduce((acc, key) => {
      if (!_.has(obj1, key)) {
        return acc.concat('\n', `  + ${key}: ${obj2[key]}`);
      }
      if (!_.has(obj2, key)) {
        return acc.concat('\n', `  - ${key}: ${obj1[key]}`);
      }
      if (obj1[key] !== obj2[key]) {
        return acc.concat('\n', `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`);
      }
      return acc.concat('\n', `    ${key}: ${obj1[key]}`);
    }, '');

  return `{${resultStr}\n}`;
};

export default genDiff;
