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

const getFinalPath = (path, target) => (path ? `${path}.${target}` : target);

const plainFormatter = (diff, path = '') => {
  const result = diff.map((node) => {
    const finalPath = getFinalPath(path, node.key);
    switch (node.type) {
      case 'added':
        return `Property '${finalPath}' was added with value: ${getPreparedValue(node.value)}`;
      case 'deleted':
        return `Property '${finalPath}' was removed`;
      case 'changed':
        return `Property '${finalPath}' was updated. From ${getPreparedValue(node.oldValue)} to ${getPreparedValue(node.newValue)}`;
      case 'nested':
        return plainFormatter(node.children, finalPath);
      case 'unchanged':
        return null;
      default:
        throw new Error(`smth is wrong path ${path}`);
    }
  });
  const clearedResult = result.filter((line) => line !== null).join('\n');
  return clearedResult;
};

export default plainFormatter;
