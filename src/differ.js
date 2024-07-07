import _ from 'lodash';

const diff = (firstObj, secObj) => {
  const keys = _.sortBy(_.union(Object.keys(firstObj), Object.keys(secObj)));
  const result = keys.map((key) => {
    if (!Object.hasOwn(firstObj, key)) {
      return { key, type: 'added', value: secObj[key] };
    }
    if (!Object.hasOwn(secObj, key)) {
      return { key, type: 'deleted', value: firstObj[key] };
    }
    if (_.isObject(firstObj[key]) && _.isObject(secObj[key])) {
      return { key, type: 'nested', children: diff(firstObj[key], secObj[key]) };
    }
    if (firstObj[key] === secObj[key]) {
      return { key, type: 'unchanged', value: firstObj[key] };
    }
    return {
      key, type: 'changed', oldValue: firstObj[key], newValue: secObj[key],
    };
  });
  return result;
};

export default diff;
