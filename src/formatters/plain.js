import _ from 'lodash';

const getPreparedValue = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const getFinalNode = (path, target) => (path ? `${path}.${target}` : target);

const getPlainFormat = (diff, path = '') => {
  const result = diff.map((node) => {
    const finalNode = getFinalNode(path, node.key);
    switch (node.type) {
      case 'added':
        return `Property '${finalNode}' was added with value: ${getPreparedValue(node.value)}`;
      case 'deleted':
        return `Property '${finalNode}' was removed`;
      case 'changed':
        return `Property '${finalNode}' was updated. From ${getPreparedValue(node.oldValue)} to ${getPreparedValue(node.newValue)}`;
      case 'nested':
        return getPlainFormat(node.children, finalNode);
      case 'unchanged':
        return null;
      default:
        throw new Error(`smth is wrong path ${path}`);
    }
  });
  const clearedResult = result.filter((line) => line !== null).join('\n');
  return clearedResult;
};

export default getPlainFormat;
